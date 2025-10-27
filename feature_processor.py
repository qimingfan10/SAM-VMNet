# feature_processor.py
import os
import torch
import cv2
import numpy as np
from skimage import transform
from tqdm import tqdm
import matplotlib.pyplot as plt
from med_sam.medsam_point import medsam_point
from configs.config_setting import setting_config
import os
import torch
import cv2
import numpy as np
from skimage import transform
from tqdm import tqdm
import matplotlib.pyplot as plt
from med_sam.medsam_point import medsam_point
from configs.config_setting import setting_config


def process_images(data_path, model_path):
    splits = ['train', 'val', 'test']

    for split in splits:
        if split == 'test':
            mask_subdir = 'pred_masks'
        else:
            mask_subdir = 'masks'

        image_dir = os.path.join(data_path, split, 'images')
        mask_dir = os.path.join(data_path, split, mask_subdir)
        output_dir = os.path.join(data_path, split, 'feature')

        os.makedirs(output_dir, exist_ok=True)

        image_files = sorted(os.listdir(image_dir))
        mask_files = sorted(os.listdir(mask_dir))

        print(f"Processing {split} Dataset...")

        existing_files = set(os.listdir(output_dir))
        expected_files = {f"{i}.pt" for i in range(len(image_files))}

        if len(existing_files) >= len(image_files) and expected_files.issubset(existing_files):
            print(f"{split} feature files already exist, skipping...")
            continue

        for i, (mask_file, image_file) in enumerate(tqdm(zip(mask_files, image_files), total=len(image_files))):

            output_file = os.path.join(output_dir, f"{i}.pt")
            if os.path.exists(output_file):
                continue

            mask_path = os.path.join(mask_dir, mask_file)
            image_path = os.path.join(image_dir, image_file)

            medsam_result = medsam_point(image_path, mask_path, model_path)
            torch.save(medsam_result, output_file)