# -*- coding: utf-8 -*-
# %% load environment
import numpy as np
import matplotlib.pyplot as plt
import os
import cv2

join = os.path.join
import torch
import sys
from skimage import io, transform
import torch.nn.functional as F

# 添加当前目录（med_sam）到Python路径
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)
from segment_anything.predictor import SamPredictor
from segment_anything.build_sam import sam_model_registry


def medsam_point(imagepath, maskpath, checkpoint_path, device="cuda:0"):
    """
    使用MedSAM生成特征向量

    Args:
        imagepath: 输入图像路径
        maskpath: 掩码图像路径
        checkpoint_path: MedSAM模型权重路径
        device: 设备类型 (默认: "cuda:0")

    Returns:
        tezhengxiangliang: 特征向量
    """
    # 读取图像
    image = cv2.imread(imagepath)
    if image is None:
        raise ValueError(f"无法读取图像: {imagepath}")
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # 设置设备
    device = torch.device(device if torch.cuda.is_available() else "cpu")

    # 加载模型
    medsam_model = sam_model_registry["vit_b"](checkpoint=checkpoint_path)
    medsam_model = medsam_model.to(device)
    medsam_model.eval()
    predictor = SamPredictor(medsam_model)
    predictor.set_image(image)

    # 读取和处理掩码
    mask_image = cv2.imread(maskpath)
    if mask_image is None:
        raise ValueError(f"无法读取掩码: {maskpath}")

    # 转换为灰度图像
    gray_image = cv2.cvtColor(mask_image, cv2.COLOR_BGR2GRAY)

    # 进行二值化，假设阈值是127
    _, binary_image = cv2.threshold(gray_image, 127, 255, cv2.THRESH_BINARY)

    # 使用np.where找到所有白色区域的坐标
    y_coords, x_coords = np.where(binary_image == 255)

    # 检查是否找到白色区域
    if len(x_coords) == 0:
        raise ValueError(f"在掩码 {maskpath} 中未找到白色区域")

    # 将坐标组合成一个numpy数组，每个坐标是一个[x, y]格式的列表
    points = np.array(list(zip(x_coords, y_coords)))

    # 计算列表的长度
    total_points = len(points)

    # 计算需要跳过的间隔，确保至少取1个点，最多取10个点
    if total_points > 0:
        n_points = min(10, total_points)
        skip_interval = max(1, total_points // n_points)
        # 使用列表切片按等间隔取点
        sampled_points = points[::skip_interval][:n_points]
    else:
        sampled_points = np.array([])

    input_point = sampled_points
    input_label = np.ones(len(input_point))

    # 预测
    masks, _, _ = predictor.predict(
        point_coords=input_point,
        point_labels=input_label,
        multimask_output=False,
    )

    tezhengxiangliang = predictor.Returnfeatures()
    return tezhengxiangliang