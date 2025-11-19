# 狭窄检测使用示例 (Stenosis Detection Usage Examples)

## 📚 目录 (Table of Contents)

1. [基础使用 (Basic Usage)](#基础使用-basic-usage)
2. [高级用法 (Advanced Usage)](#高级用法-advanced-usage)
3. [批量处理 (Batch Processing)](#批量处理-batch-processing)
4. [结果保存 (Saving Results)](#结果保存-saving-results)
5. [参数调优 (Parameter Tuning)](#参数调优-parameter-tuning)

---

## 基础使用 (Basic Usage)

### 示例 1: 使用命令行指定图像

**Linux/Mac:**
```bash
cd /path/to/SAM-VMNet
./run_stenosis_detection.sh data/example.jpg data/example_mask.png
```

**Windows/跨平台:**
```bash
cd C:\path\to\SAM-VMNet
python run_stenosis_detection.py data/example.jpg data/example_mask.png
```

### 示例 2: 使用默认配置

**第一步：配置图像路径**

编辑 `stenosis_detection/maskjiance1016.m`:
```matlab
Im = imread("data/my_vessel.jpg");
im = imread("data/my_vessel_mask.png");
```

**第二步：运行**
```bash
./run_stenosis_detection.sh
```

---

## 高级用法 (Advanced Usage)

### 示例 3: 在 MATLAB 中调试

```matlab
% 启动 MATLAB
cd stenosis_detection

% 逐步运行以查看中间结果
clc; clear all; close all;

% 加载图像
Im = imread("../data/test.jpg");
Im = imresize(Im, [800 600]);
im = imread("../data/test_mask.png");
im = imresize(im, [800 600]);

% 初始化
if size(im, 3) == 3
    im = rgb2gray(im);
end

% 骨架提取
BW = bwmorph(im, 'thin', inf);
[m, n] = find(BW == 1);

% 可视化骨架
figure; imshow(im); hold on;
plot(n, m, 'r.', 'MarkerSize', 2);
title('Centerline Extraction');

% ... 继续运行其他部分
```

### 示例 4: 调整图像尺寸

```matlab
% 在 maskjiance1016.m 中修改第5行和第8行
Im = imresize(Im, [1024 768]);  % 更高分辨率
im = imresize(im, [1024 768]);
```

---

## 批量处理 (Batch Processing)

### 示例 5: Bash 批量处理脚本

创建 `batch_stenosis_detection.sh`:

```bash
#!/bin/bash

# 批量处理多个图像
for img in data/images/*.jpg; do
    # 获取基础文件名
    basename=$(basename "$img" .jpg)
    mask="data/masks/${basename}_mask.png"
    
    echo "Processing: $basename"
    
    # 运行狭窄检测
    ./run_stenosis_detection.sh "$img" "$mask"
    
    # 暂停以查看结果
    read -p "按Enter继续下一个图像..."
done

echo "批量处理完成！"
```

运行：
```bash
chmod +x batch_stenosis_detection.sh
./batch_stenosis_detection.sh
```

### 示例 6: Python 批量处理脚本

创建 `batch_process.py`:

```python
#!/usr/bin/env python3
import os
import subprocess
from pathlib import Path

# 配置路径
image_dir = Path("data/images")
mask_dir = Path("data/masks")
output_dir = Path("results")
output_dir.mkdir(exist_ok=True)

# 获取所有图像文件
image_files = list(image_dir.glob("*.jpg"))

for img_path in image_files:
    # 构造对应的掩码路径
    mask_path = mask_dir / f"{img_path.stem}_mask.png"
    
    if not mask_path.exists():
        print(f"⚠️  掩码不存在: {mask_path}")
        continue
    
    print(f"📊 处理: {img_path.name}")
    
    # 运行狭窄检测
    cmd = [
        "python", "run_stenosis_detection.py",
        str(img_path), str(mask_path)
    ]
    
    try:
        subprocess.run(cmd, check=True)
        print(f"✅ 完成: {img_path.name}\n")
    except subprocess.CalledProcessError as e:
        print(f"❌ 失败: {img_path.name} - {e}\n")

print("🎉 批量处理完成！")
```

运行：
```bash
python batch_process.py
```

---

## 结果保存 (Saving Results)

### 示例 7: 在 MATLAB 中保存结果图

在 `maskjiance1016.m` 的最后添加：

```matlab
% 保存图1：中心线
figure(1);
saveas(gcf, 'result_centerline.png');

% 保存图2：分段点
figure(2);
saveas(gcf, 'result_segmentation.png');

% 保存图3：狭窄检测
figure(3);
saveas(gcf, 'result_stenosis.png');

% 保存狭窄数据到文件
results = struct();
results.stenosisPoints = allStenosisPoints;
results.stenosisDegrees = allStenosisDegrees;
save('stenosis_results.mat', 'results');

% 导出为CSV格式
csvData = [allStenosisPoints, allStenosisDegrees];
csvwrite('stenosis_results.csv', csvData);
```

### 示例 8: 自动保存到指定目录

```matlab
% 在 maskjiance1016.m 开头添加
outputDir = '../results/';
if ~exist(outputDir, 'dir')
    mkdir(outputDir);
end

% 生成唯一的输出文件名
timestamp = datestr(now, 'yyyymmdd_HHMMSS');
outputPrefix = [outputDir, 'stenosis_', timestamp];

% 在最后保存结果
figure(3);
saveas(gcf, [outputPrefix, '_result.png']);
save([outputPrefix, '_data.mat'], 'allStenosisPoints', 'allStenosisDegrees');
```

---

## 参数调优 (Parameter Tuning)

### 示例 9: 针对不同血管类型调整参数

**细小血管（Small Vessels）：**
```matlab
% maskjiance1016.m 参数设置
r = 80;                    % 减小检索半径（第43行）
if nn > 0.20 && average_R > 2  % 降低阈值（第115行）
```

**粗大血管（Large Vessels）：**
```matlab
r = 150;                   % 增大检索半径
if nn > 0.30 && average_R > 6  % 提高阈值
```

**高噪声图像（Noisy Images）：**
```matlab
if distMatrix(i, j) < 12   % 增大分段点距离阈值（第76行）
if abs(allStenosisPoints(i, 1) - allStenosisPoints(i+1, 1)) < 15  % 第131行
```

### 示例 10: 创建参数配置文件

创建 `stenosis_detection/config.m`:

```matlab
function config = get_config(vessel_type)
    % 狭窄检测参数配置
    % vessel_type: 'small', 'medium', 'large'
    
    switch vessel_type
        case 'small'
            config.searchRadius = 80;
            config.stenosisThreshold = 0.20;
            config.avgRadiusThreshold = 2;
            config.segPointDistance = 6;
            config.stenosisPointDistance = 8;
            
        case 'medium'
            config.searchRadius = 110;
            config.stenosisThreshold = 0.25;
            config.avgRadiusThreshold = 4;
            config.segPointDistance = 8;
            config.stenosisPointDistance = 10;
            
        case 'large'
            config.searchRadius = 150;
            config.stenosisThreshold = 0.30;
            config.avgRadiusThreshold = 6;
            config.segPointDistance = 10;
            config.stenosisPointDistance = 15;
            
        otherwise
            error('Unknown vessel type. Use: small, medium, or large');
    end
end
```

在 `maskjiance1016.m` 中使用：

```matlab
% 在开头添加
config = get_config('medium');  % 或 'small', 'large'

% 使用配置参数
r = config.searchRadius;  % 第43行
if distMatrix(i, j) < config.segPointDistance  % 第76行
if nn > config.stenosisThreshold && average_R > config.avgRadiusThreshold  % 第115行
```

---

## 📊 实际案例 (Real-World Examples)

### 案例 1: 处理 SAM-VMNet 分割结果

```bash
# 1. 使用 SAM-VMNet 进行分割
python test.py --model samvmnet --input data/test/images

# 2. 对分割结果进行狭窄检测
for img in data/test/images/*.png; do
    basename=$(basename "$img" .png)
    mask="results/pred_masks/${basename}_pred.png"
    ./run_stenosis_detection.sh "$img" "$mask"
done
```

### 案例 2: 与深度学习 Pipeline 集成

```python
# integration_example.py
import torch
from models.samvmnet import SAMVMNet
import subprocess

# 1. 加载模型
model = SAMVMNet()
model.load_state_dict(torch.load('weights/best_model.pth'))

# 2. 进行分割
image = load_image('data/test.jpg')
mask = model.predict(image)
save_mask(mask, 'temp_mask.png')

# 3. 运行狭窄检测
subprocess.run([
    'python', 'run_stenosis_detection.py',
    'data/test.jpg', 'temp_mask.png'
])
```

---

## 🔍 故障排查示例 (Troubleshooting Examples)

### 问题 1: 未检测到分段点

**解决方案：**
```matlab
% 在第56-61行添加调试代码
segmentationPoints = [];
debugCount = 0;
for i = 1:length(m)
    neighbors = check_neighbors(BW, m(i), n(i));
    neighborCount = length(neighbors);
    if neighborCount == 3
        segmentationPoints = [segmentationPoints; [n(i), m(i)]];
    end
    % 调试：统计邻居数量分布
    if neighborCount >= 3
        debugCount = debugCount + 1;
    end
end
fprintf('检测到 %d 个潜在分段点\n', debugCount);
```

### 问题 2: 内存不足

**解决方案：**
```matlab
% 在开头添加
clear all; close all; clc;

% 处理大图像时分块处理
blockSize = 200;  % 块大小
% ... 实现分块处理逻辑
```

---

## 💾 输出示例 (Output Examples)

### CSV 输出格式
```csv
X,Y,StenosisDegree
245,312,0.45
389,256,0.68
512,445,0.82
```

### MATLAB 数据格式
```matlab
>> load('stenosis_results.mat')
>> results
results = 
    stenosisPoints: [3×2 double]
    stenosisDegrees: [3×1 double]
```

---

## 📖 更多资源 (More Resources)

- **详细文档**: `README_stenosis.md`
- **快速开始**: `../QUICK_START_STENOSIS.md`
- **更新日志**: `../CHANGELOG_STENOSIS.md`
- **主项目文档**: `../README.md`

---

**需要更多帮助？在 GitHub 上提交 Issue！**
