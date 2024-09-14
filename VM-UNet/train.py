import torch
from torch.utils.data import DataLoader
import timm
import time
import os
import sys

# 获取当前文件的绝对路径
current_file_path = os.path.abspath(__file__)

# 获取当前文件所在的目录
current_directory = os.path.dirname(current_file_path)

# 获取上一级目录
parent_directory = os.path.dirname(current_directory)


sys.path.append(f"{parent_directory}/MedSAM-main")
from datasets.dataset_point import NPY_datasets
from tensorboardX import SummaryWriter
from models.vmunet.vmunet import VMUNet_point
from train_point import train_point
from engine_point import *

import matplotlib.pyplot as plt

from medsam import *
from medsam_point import *
from utils import *
from configs.config_setting import setting_config,setting_config_point
import shutil

import warnings

warnings.filterwarnings("ignore")


def main(config):
    total_start_time = time.time()  # 记录总训练开始时间

    clear_folder(train_output_dir)  # 在处理前清空输出文件夹
    clear_folder(val_output_dir)  # 在处理前清空输出文件夹
    print("开始纯VM-UNet")
    train_point(config1)
    print("开始SAM-UNet")
    # 处理训练数据
    process_images(train_mask_dir, train_image_dir, train_output_dir, model_path)

    # 处理验证数据
    process_images(val_mask_dir, val_image_dir, val_output_dir, model_path)
    # 注意，在调回纯vmunet的时候train、utils的profile均发生改变

    print('#----------Creating logger----------#')
    sys.path.append(config.work_dir + '/')
    log_dir = os.path.join(config.work_dir, 'log')
    checkpoint_dir = os.path.join(config.work_dir, 'checkpoints')
    # resume_model = os.path.join(checkpoint_dir, 'latest.pth')
    resume_model = config.model_config['resume_ckpt']
    outputs = os.path.join(config.work_dir, 'outputs')
    if not os.path.exists(checkpoint_dir):
        os.makedirs(checkpoint_dir)
    if not os.path.exists(outputs):
        os.makedirs(outputs)

    global logger
    logger = get_logger('train', log_dir)
    global writer
    writer = SummaryWriter(config.work_dir + 'summary')

    log_config_info(config, logger)

    print('#----------GPU init----------#')
    os.environ["CUDA_VISIBLE_DEVICES"] = config.gpu_id
    set_seed(config.seed)
    torch.cuda.empty_cache()

    print('#----------Preparing dataset----------#')
    train_dataset = NPY_datasets(config.data_path, train_output_dir, config, train=True)
    train_loader = DataLoader(train_dataset,
                              batch_size=config.batch_size,
                              shuffle=True,
                              pin_memory=True,
                              num_workers=config.num_workers)
    val_dataset = NPY_datasets(config.data_path, val_output_dir, config, train=False)
    val_loader = DataLoader(val_dataset,
                            batch_size=1,
                            shuffle=False,
                            pin_memory=True,
                            num_workers=config.num_workers,
                            drop_last=True)

    print('#----------Prepareing Model----------#')
    model_cfg = config.model_config
    if config.network == 'vmunet':
        model = VMUNet_point(
            num_classes=model_cfg['num_classes'],
            input_channels=model_cfg['input_channels'],
            depths=model_cfg['depths'],
            depths_decoder=model_cfg['depths_decoder'],
            drop_path_rate=model_cfg['drop_path_rate'],
            load_ckpt_path=model_cfg['load_ckpt_path'],
        )
        model.load_from()

    else:
        raise Exception('network in not right!')
    model = model.cuda()

    cal_params_flops_point(model, 256, logger)

    print('#----------Prepareing loss, opt, sch and amp----------#')
    criterion = config.criterion
    optimizer = get_optimizer(config, model)
    scheduler = get_scheduler(config, optimizer)

    print('#----------Set other params----------#')
    min_loss = 999
    start_epoch = 1
    min_epoch = 1

    if os.path.exists(resume_model):
        print('#----------Resume Model and Other params----------#')
        checkpoint = torch.load(resume_model, map_location=torch.device('cpu'))
        model.load_state_dict(checkpoint['model_state_dict'])
        optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
        scheduler.load_state_dict(checkpoint['scheduler_state_dict'])
        saved_epoch = checkpoint['epoch']
        start_epoch += saved_epoch
        min_loss, min_epoch, loss = checkpoint['min_loss'], checkpoint['min_epoch'], checkpoint['loss']

        log_info = f'resuming model from {resume_model}. resume_epoch: {saved_epoch}, min_loss: {min_loss:.4f}, min_epoch: {min_epoch}, loss: {loss:.4f}'
        logger.info(log_info)

    step = 0
    train_losses = []
    val_losses = []
    print('#----------Training----------#')
    for epoch in range(start_epoch, config.epochs + 1):

        torch.cuda.empty_cache()

        step,train_loss = train_one_epoch(
            train_loader,
            model,
            criterion,
            optimizer,
            scheduler,
            epoch,
            step,
            logger,
            config,
            writer
        )
        train_losses.append(train_loss)
        loss = val_one_epoch(
            val_loader,
            model,
            criterion,
            epoch,
            logger,
            config
        )
        val_losses.append(loss)
        if loss < min_loss:
            torch.save(model.state_dict(), os.path.join(checkpoint_dir, 'best.pth'))
            min_loss = loss
            min_epoch = epoch

        torch.save(
            {
                'epoch': epoch,
                'min_loss': min_loss,
                'min_epoch': min_epoch,
                'loss': loss,
                'model_state_dict': model.state_dict(),
                'optimizer_state_dict': optimizer.state_dict(),
                'scheduler_state_dict': scheduler.state_dict(),
            }, os.path.join(checkpoint_dir, 'latest.pth'))

    if os.path.exists(os.path.join(checkpoint_dir, 'best.pth')):
        print('#----------Testing----------#')
        best_weight = torch.load(config.work_dir + 'checkpoints/best.pth', map_location=torch.device('cpu'))
        model.load_state_dict(best_weight)
        loss = test_one_epoch(
            val_loader,
            model,
            criterion,
            logger,
            config,
        )
        os.rename(
            os.path.join(checkpoint_dir, 'best.pth'),
            os.path.join(checkpoint_dir, f'best-epoch{min_epoch}-loss{min_loss:.4f}.pth')
        )
        total_end_time = time.time()  # 记录总训练结束时间
        total_training_time = total_end_time - total_start_time
        logger.info(f"Total training time: {total_training_time:.2f} seconds.")
    return train_losses, val_losses


def clear_folder(folder_path):
    """清空文件夹并重新创建同名空文件夹。"""
    if os.path.exists(folder_path):
        shutil.rmtree(folder_path)
    os.makedirs(folder_path)


def process_images(mask_dir, image_dir, output_dir, model_path):
    """处理图像和掩码文件，保存处理结果。"""
    mask_files = sorted(os.listdir(mask_dir))
    image_files = sorted(os.listdir(image_dir))
    for i, (mask_file, image_file) in enumerate(zip(mask_files, image_files)):
        mask_path = os.path.join(mask_dir, mask_file)
        image_path = os.path.join(image_dir, image_file)
        medsam_result = medsam_point(image_path, mask_path, model_path)
        torch.save(medsam_result, os.path.join(output_dir, f"{i}.pt"))
        print(f"保存{i}.pt文件完成")


if __name__ == '__main__':
    print("当前文件的绝对路径:", current_file_path)
    print("当前文件所在的目录:", current_directory)
    print("上一级目录:", parent_directory)
    config = setting_config
    config1 = setting_config_point
    # 定义路径
    train_mask_dir = f'{current_directory}/train_raw_mask'
    train_image_dir = config.data_path + 'train/images'
    train_output_dir = f"{parent_directory}/MedSAM-main/train_tezhengxiangliang"
    model_path = f"{parent_directory}/MedSAM-main/work_dir/MedSAM/medsam_vit_b.pth"

    val_mask_dir = f'{current_directory}/val_raw_mask'
    val_image_dir = config.data_path + 'val/images'
    val_output_dir = f"{parent_directory}/MedSAM-main/val_tezhengxiangliang"
    # 图片保存路径
    output_folder = current_directory
    os.makedirs(train_mask_dir, exist_ok=True)
    os.makedirs(train_output_dir, exist_ok=True)
    os.makedirs(val_mask_dir, exist_ok=True)
    os.makedirs(val_output_dir, exist_ok=True)
    train_losses, val_losses = main(config)
    # 设置绘图
    plt.figure(figsize=(10, 5))
    epochs = range(1, len(train_losses) + 1)  # 生成一个epoch列表，从1开始
    plt.plot(epochs, train_losses, 'r', label='Training Loss')  # 使用红色圆点连线显示训练损失
    plt.plot(epochs, val_losses, 'b', label='Validation Loss')  # 使用蓝色圆点连线显示验证损失
    plt.title('Training and Validation Loss')
    plt.xlabel('Epochs')
    plt.ylabel('Loss')
    plt.legend()
    plt.grid(True)
    output_file_path = os.path.join(output_folder, 'learning_curve.png')
    plt.savefig(output_file_path)  # 保存为PNG文件到指定路径