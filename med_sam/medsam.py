# -*- coding: utf-8 -*-
# %% load environment
import numpy as np
import matplotlib.pyplot as plt
import os
import cv2
join = os.path.join
import torch
from segment_anything import sam_model_registry, SamPredictor
from skimage import io, transform
import torch.nn.functional as F
import argparse


def medsam(imagepath,quanzhong):
    # %% load model and image
    parser = argparse.ArgumentParser(
        description="run inference on testing set based on MedSAM"
    )
    parser.add_argument(
        "-i",
        "--data_path",
        type=str,
        default="/assets/img_demo.png",
        help="path to the data folder",
    )
    parser.add_argument(
        "-o",
        "--seg_path",
        type=str,
        default="/assets/",
        help="path to the segmentation folder",
    )
    parser.add_argument(
        "--box",
        type=list,
        default=[95, 255, 190, 350],
        help="bounding box of the segmentation target",
    )
    parser.add_argument("--device", type=str, default="cuda:0", help="device")
    parser.add_argument(
        "-chk",
        "--checkpoint",
        type=str,
        default=quanzhong,
        help="path to the trained model",
    )
    args = parser.parse_args()
    image = cv2.imread(imagepath)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    medsam_model = sam_model_registry["vit_b"](checkpoint=args.checkpoint)
    medsam_model = medsam_model.to(device)
    medsam_model.eval()
    predictor = SamPredictor(medsam_model)
    predictor.set_image(image)
    tezhengxiangliang = predictor.Returnfeatures()
    return tezhengxiangliang
