import torch
from torch.utils.data import DataLoader
import timm
from datasets.dataset import NPY_datasets
from tensorboardX import SummaryWriter
from models.vmunet.vmunet import VMUNet

from engine import *
import os
import sys

from utils import *
from configs.config_setting import setting_config

import warnings
import shutil
import os
warnings.filterwarnings("ignore")


def main(config):

    # 目标目录列表
    path = os.path.dirname(os.path.abspath(__file__))
    target_dirs = [
        f'{path}/data/one',
        f'{path}/predict_one',
        f'{path}/data/one/train/images',
        f'{path}/data/one/train/masks',
        f'{path}/data/one/val/images',
        f'{path}/data/one/val/masks',
    ]

    # 确保目标目录存在
    for target_dir in target_dirs:
        os.makedirs(target_dir, exist_ok=True)
        clear_folder(target_dir)

    # 将文件复制到每个目标目录
    for target_dir in target_dirs:
        shutil.copy(source_file, target_dir)

    print('#----------Creating logger----------#')
    sys.path.append(config.work_dir + '/')
    log_dir = os.path.join(config.work_dir, 'log')
    checkpoint_dir = os.path.join(config.work_dir, 'checkpoints')
    resume_model = os.path.join(checkpoint_dir, 'latest.pth')
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
    datapath = f"{path}/data/one/"
    print('#----------Preparing dataset----------#')
    val_dataset = NPY_datasets(datapath, config, train=False)
    val_loader = DataLoader(val_dataset,
                            batch_size=1,
                            shuffle=False,
                            pin_memory=True,
                            num_workers=config.num_workers,
                            drop_last=True)

    print('#----------Prepareing Model----------#')
    model_cfg = config.model_config
    if config.network == 'vmunet':
        model = VMUNet(
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

    cal_params_flops(model, 256, logger)

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
    if os.path.exists(weight_path):
        print('#----------Testing----------#')
        best_weight = torch.load(weight_path,map_location=torch.device('cpu'))
        model.load_state_dict(best_weight,strict=False)
        clear_folder(f"{path}/predict_one")  # 在处理前清空输出文件夹

        loss = test_one_epoch_point3(
            val_loader,
            model,
            criterion,
            logger,
            config,
        )


def clear_folder(folder_path):
    """清空文件夹并重新创建同名空文件夹。"""
    if os.path.exists(folder_path):
        shutil.rmtree(folder_path)
    os.makedirs(folder_path)


if __name__ == '__main__':
    current_directory = os.path.dirname(os.path.abspath(__file__))
    print(current_directory)
    source_file = f'{current_directory}/34_key_frame_3_5.jpg'
    #weight_path = f'{current_directory}/pre_trained_weights/best-epoch142-loss0.3488.pth'
    weight_path = "/root/autodl-tmp/VM-UNet/results/vmunet_isic17_Wednesday_17_July_2024_22h_05m_46s/checkpoints/best-epoch197-loss0.5826.pth"
    # 注意，输出图像的文件夹为/root/autodl-tmp/mamba+sam/VM-UNet/predict_one
    config = setting_config
    main(config)
    #predict_one和one文件夹都没有