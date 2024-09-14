import torch
from torch.utils.data import DataLoader
import timm
from datasets.dataset import NPY_datasets
from tensorboardX import SummaryWriter
from models.vmunet.vmunet import VMUNet

from engine import *
import os
import sys
os.environ["CUDA_VISIBLE_DEVICES"] = "1"
os.environ['CUDA_LAUNCH_BLOCKING'] = '1'
torch.cuda.device_count()

from utils import *
from configs.config_setting import setting_config_predict

import warnings

warnings.filterwarnings("ignore")


def main(config):
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

    print('#----------Preparing dataset----------#')
    train_dataset = NPY_datasets(config.data_path, config, train=True)
    train_loader = DataLoader(train_dataset,
                              batch_size=1,
                              shuffle=False,
                              pin_memory=True,
                              num_workers=config.num_workers)
    val_dataset = NPY_datasets(config.data_path, config, train=False)
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

    #weight_path = f'{path}/pre_trained_weights/best-epoch142-loss0.3488.pth'

    # weight_path = "/root/results/vmunet_isic17_Tuesday_14_May_2024_13h_19m_00s/checkpoints/best-epoch155-loss0.3109.pth"
    if os.path.exists(weight_path):
        print('#----------Testing----------#')
        best_weight = torch.load(weight_path,map_location=torch.device('cpu'))
        model.load_state_dict(best_weight,strict=False)
        os.makedirs(f"{path}/train_raw_mask", exist_ok=True)
        clear_folder(f"{path}/train_raw_mask")  # 在处理前清空输出文件夹
        os.makedirs(f"{path}/val_raw_mask", exist_ok=True)
        clear_folder(f"{path}/val_raw_mask")  # 在处理前清空输出文件夹

        loss = test_one_epoch_point5(
            train_loader,
            model,
            criterion,
            logger,
            config,
        )
        loss = test_one_epoch_point4(
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
    config = setting_config_predict
    current_directory = os.path.dirname(os.path.abspath(__file__))
    # print(current_directory)
    # source_file = f'{current_directory}/34_key_frame_3_5.jpg'
    # weight_path = f'{current_directory}/pre_trained_weights/best-epoch142-loss0.3488.pth'
    weight_path = "/root/autodl-tmp/VM-UNet/results/vmunet_isic17_Wednesday_17_July_2024_22h_05m_46s/checkpoints/best-epoch197-loss0.5826.pth"
    config.data_path = "/root/autodl-tmp/VM-UNet/data/47/"
    #注：既可以在这里改，也可以去config的predict_config修改
    main(config)