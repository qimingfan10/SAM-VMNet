import torch
from torch.utils.data import DataLoader
from dataset import Branch1_datasets
from models.vmunet.vmunet import VMUNet
from engine_branch1 import test_one_epoch
import os
import sys
from utils import *
from configs.config_setting import setting_config
import warnings
import argparse

warnings.filterwarnings("ignore")


def parse_args():
    parser = argparse.ArgumentParser(description='Test VMUNet with pretrained weights')
    parser.add_argument('--data_path', type=str, required=True, help='Path to test data')
    parser.add_argument('--pretrained_weight', type=str, required=True, help='Path to pretrained weights')
    parser.add_argument('--device', type=str, default='cuda:0', help='Device to use (e.g., cuda:0, cuda:1, cpu)')
    parser.add_argument('--output_dir', type=str, default='./test_results', help='Output directory for predictions')
    return parser.parse_args()

def test_with_pretrained():
    args = parse_args()

    data_path = args.data_path
    pretrained_weight = args.pretrained_weight
    device = torch.device(args.device if torch.cuda.is_available() and 'cuda' in args.device else "cpu")
    output_dir = args.output_dir

    print(f'#----------Loading pretrained weights from {pretrained_weight}----------#')
    print(f'#----------Using device: {device}----------#')
    print(f'#----------Output directory: {output_dir}----------#')

    test_dataset = Branch1_datasets(data_path, setting_config, train=False, test=True)
    test_loader = DataLoader(test_dataset, batch_size=1, shuffle=False)

    model_cfg = setting_config.model_config
    model = VMUNet(
        num_classes=model_cfg['num_classes'],
        input_channels=model_cfg['input_channels'],
        depths=model_cfg['depths'],
        depths_decoder=model_cfg['depths_decoder'],
        drop_path_rate=model_cfg['drop_path_rate'],
        load_ckpt_path=model_cfg['load_ckpt_path'],
    )

    model.load_from()
    model = model.to(device)

    checkpoint = torch.load(pretrained_weight, map_location="cpu")
    filtered_state_dict = {}
    for key, value in checkpoint.items():
        if 'total_ops' not in key and 'total_params' not in key:
            filtered_state_dict[key] = value

    model.load_state_dict(filtered_state_dict, strict=False)
    model.eval()

    print("Model loaded successfully!")

    setting_config.work_dir = output_dir
    os.makedirs(output_dir, exist_ok=True)

    criterion = setting_config.criterion
    loss = test_one_epoch(
        test_loader,
        model,
        criterion,
        None,
        setting_config,
        device
    )

    print(f"Test completed with loss: {loss:.4f}")


if __name__ == '__main__':
    test_with_pretrained()