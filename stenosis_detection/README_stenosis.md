# 狭窄检测模块 (Stenosis Detection Module)

## 简介 (Overview)

该模块用于冠状动脉血管的定量狭窄检测。通过分析分割后的血管图像，自动识别并量化血管狭窄位置及程度。

This module is designed for quantitative stenosis detection in coronary arteries. It analyzes segmented vessel images to automatically identify and quantify stenosis locations and severity.

## 文件说明 (File Description)

### 主文件 (Main File)
- **maskjiance1016.m** - 狭窄检测主脚本 (Main stenosis detection script)

### 支持函数 (Supporting Functions)
- **MoMforSeg1.m** - 使用矩量法计算半径 (Radius calculation using Method of Moments)
- **check_neighbors.m** - 骨架点邻居检查 (Neighbor checking for skeleton points)
- **findpath2.m** - 骨架图上的最短路径查找 (Shortest path finding on skeleton graph)
- **getRadius.m** - 半径获取函数 (Radius retrieval function)
- **duilie.m** - 狭窄检测的队列处理 (Queue processing for stenosis detection)
- **getNeighbors.m** - 8连通邻居获取 (8-connected neighbor retrieval)

## 功能特性 (Features)

1. **中心线提取** - 使用骨架化算法提取血管中心线
2. **半径计算** - 基于矩量法计算每个中心线点的半径
3. **分段点检测** - 自动识别血管分叉点
4. **路径查找** - 在分段点之间查找最短路径
5. **狭窄检测** - 计算狭窄程度并可视化结果

## 使用方法 (Usage)

### 1. 准备输入图像 (Prepare Input Images)

需要两张图像：
- 原始血管造影图像
- 分割后的二值掩码图像（来自 SAM-VMNet 或其他分割方法）

You need two images:
- Original vessel angiographic image
- Segmented binary mask image (from SAM-VMNet or other segmentation methods)

### 2. 修改图像路径 (Modify Image Paths)

编辑 `maskjiance1016.m` 文件，设置图像路径：

```matlab
Im = imread("path/to/your_original_image.jpg");
im = imread("path/to/your_segmented_mask.png");
```

### 3. 运行检测 (Run Detection)

在 MATLAB 中运行：

```matlab
cd stenosis_detection
maskjiance1016
```

或者使用根目录下的一键启动脚本：

```bash
./run_stenosis_detection.sh
```

### 4. 查看结果 (View Results)

程序会自动生成三个可视化窗口：

1. **图1：中心线提取结果** - 显示提取的血管中心线
2. **图2：分段点检测结果** - 显示检测到的血管分叉点
3. **图3：狭窄检测结果** - 显示狭窄位置及程度

The program generates three visualization windows:

1. **Figure 1: Centerline Extraction** - Shows extracted vessel centerline
2. **Figure 2: Segmentation Points** - Shows detected bifurcation points
3. **Figure 3: Stenosis Detection Results** - Shows stenosis locations and severity

## 输出结果 (Output)

### 狭窄程度分级 (Stenosis Severity Classification)

- **红色圆圈 (Red)**: 严重狭窄 (>75%)
- **绿色圆圈 (Green)**: 中度狭窄 (50-75%)
- **蓝色圆圈 (Blue)**: 轻度狭窄 (25-50%)

### 数据输出 (Data Output)

- **allStenosisPoints**: 狭窄点坐标
- **allStenosisDegrees**: 狭窄程度（0-1范围）

## 参数调整 (Parameter Tuning)

可以在 `maskjiance1016.m` 中调整以下参数：

```matlab
r = 110;              % 半径检索范围 (Radius search range)
distThreshold = 8;     % 分段点距离阈值 (Segmentation point distance threshold)
stenosisThreshold = 0.25;  % 狭窄检测阈值 (Stenosis detection threshold)
averageRThreshold = 4;     % 平均半径阈值 (Average radius threshold)
```

## 系统要求 (System Requirements)

- MATLAB R2016b 或更高版本
- Image Processing Toolbox

## 算法流程 (Algorithm Workflow)

1. 图像预处理和骨架化
2. 使用矩量法计算每个骨架点的半径
3. 检测分叉点（3个邻居的骨架点）
4. 过滤距离过近的分叉点
5. 在分叉点之间寻找路径
6. 对每条路径进行狭窄检测
7. 可视化结果

## 注意事项 (Notes)

1. 输入的掩码图像必须是二值图像（0和255）
2. 图像会自动调整为 800x600 的尺寸
3. 狭窄检测阈值可根据实际需求调整
4. 建议使用高质量的分割掩码以获得更准确的结果

## 引用 (Citation)

如果您在研究中使用此代码，请引用我们的论文：

```bibtex
@article{https://doi.org/10.1002/mp.17970,
author = {Huang, Baixiang and Luo, Yu and Wei, Guangyu and He, Songyan and Shao, Yushuang and Zeng, Xueying and Zhang, Qing},
title = {Deep learning model for coronary artery segmentation and quantitative stenosis detection in angiographic images},
journal = {Medical Physics},
volume = {52},
number = {7},
pages = {e17970},
doi = {https://doi.org/10.1002/mp.17970},
year = {2025}
}
```

## 技术支持 (Support)

如有问题，请在 GitHub 上提交 issue。

For questions or issues, please open an issue on GitHub.
