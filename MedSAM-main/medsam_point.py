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
import cv2
import numpy as np

def medsam_point(imagepath,maskpath,quanzhong):
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



    image = cv2.imread(maskpath)
    # 假设image是您的原始彩色图像，我们将其转换为灰度图像
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # 进行二值化，假设阈值是127
    _, binary_image = cv2.threshold(gray_image, 127, 255, cv2.THRESH_BINARY)

    # 使用np.where找到所有白色区域的坐标
    y_coords, x_coords = np.where(binary_image == 255)

    # 将坐标组合成一个numpy数组，每个坐标是一个[x, y]格式的列表
    points = np.array(list(zip(x_coords, y_coords)))
    # 计算列表的长度
    total_points = len(points)

    # 计算需要跳过的间隔
    skip_interval = total_points // 10

    # 使用列表切片按等间隔取点
    points = points[::skip_interval]
    input_point = points
    input_label = np.ones(len(input_point))
    masks, _, _ = predictor.predict(
        point_coords=input_point,
        point_labels=input_label,
        multimask_output=False,
    )
    tezhengxiangliang = predictor.Returnfeatures()
    return tezhengxiangliang