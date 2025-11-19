#!/usr/bin/env python3
"""
狭窄检测一键启动脚本 (Stenosis Detection Startup Script)

使用方法 (Usage):
    python run_stenosis_detection.py [image_path] [mask_path]

参数 (Parameters):
    image_path: 原始血管造影图像路径 (Optional, path to original vessel image)
    mask_path:  分割掩码图像路径 (Optional, path to segmented mask image)

示例 (Example):
    python run_stenosis_detection.py data/test.jpg data/test_mask.png
"""

import os
import sys
import subprocess
import platform
import shutil
from pathlib import Path


class Colors:
    """ANSI color codes for terminal output"""
    BLUE = '\033[0;34m'
    GREEN = '\033[0;32m'
    YELLOW = '\033[1;33m'
    RED = '\033[0;31m'
    NC = '\033[0m'  # No Color


def print_info(message):
    """Print info message"""
    print(f"{Colors.BLUE}[INFO]{Colors.NC} {message}")


def print_success(message):
    """Print success message"""
    print(f"{Colors.GREEN}[SUCCESS]{Colors.NC} {message}")


def print_warning(message):
    """Print warning message"""
    print(f"{Colors.YELLOW}[WARNING]{Colors.NC} {message}")


def print_error(message):
    """Print error message"""
    print(f"{Colors.RED}[ERROR]{Colors.NC} {message}")


def check_matlab():
    """Check if MATLAB is installed and accessible"""
    matlab_cmd = 'matlab' if platform.system() != 'Windows' else 'matlab.exe'
    
    if shutil.which(matlab_cmd):
        return True
    
    # Check common installation paths on Windows
    if platform.system() == 'Windows':
        common_paths = [
            r"C:\Program Files\MATLAB",
            r"C:\Program Files (x86)\MATLAB",
        ]
        for base_path in common_paths:
            if os.path.exists(base_path):
                for version_dir in os.listdir(base_path):
                    matlab_path = os.path.join(base_path, version_dir, 'bin', 'matlab.exe')
                    if os.path.exists(matlab_path):
                        return True
    
    return False


def run_matlab_script(script_path, stenosis_dir):
    """Run MATLAB script"""
    # Get absolute paths
    script_path = os.path.abspath(script_path)
    stenosis_dir = os.path.abspath(stenosis_dir)
    
    # Change to stenosis detection directory
    original_dir = os.getcwd()
    os.chdir(stenosis_dir)
    
    try:
        if platform.system() == 'Windows':
            # Windows command
            cmd = f'matlab -nosplash -nodesktop -r "try; run(\'{script_path}\'); catch ME; disp(getReport(ME)); end; pause(10); exit;"'
        else:
            # Unix/Linux/Mac command
            cmd = f'matlab -nosplash -nodesktop -r "try; run(\'{script_path}\'); catch ME; disp(getReport(ME)); end; pause(10); exit;"'
        
        subprocess.run(cmd, shell=True, check=True)
    finally:
        os.chdir(original_dir)


def create_temp_script(image_path, mask_path, stenosis_dir):
    """Create temporary MATLAB script with specified image paths"""
    temp_script = os.path.join(stenosis_dir, 'temp_run.m')
    
    # Convert paths to absolute and use forward slashes for MATLAB
    image_path = os.path.abspath(image_path).replace('\\', '/')
    mask_path = os.path.abspath(mask_path).replace('\\', '/')
    
    script_content = f"""% 临时运行脚本 - 使用命令行参数指定的图像
clc; clear all; close all;

% 读取图像
Im = imread('{image_path}');
Im = imresize(Im, [800 600]);

im = imread('{mask_path}');
im = imresize(im, [800 600]);
if size(im, 3) == 3
    im = rgb2gray(im);
end

% 初始化数据结构和变量
pointData = struct('x', {{}}, 'y', {{}}, 'radius', {{}});
IM(:, :, 1) = im2double(im);
IM(:, :, 2) = im2double(im);
IM(:, :, 3) = im2double(im);

S = Im;
BW = bwmorph(im, 'thin', inf);

% 运行狭窄检测（复制主脚本的核心代码）
[m, n] = find(BW == 1);
for i = 1:length(m)
    S(m(i), n(i), 1) = 0;
    S(m(i), n(i), 2) = 0; 
    S(m(i), n(i), 3) = 0;
end

figure('NumberTitle', 'off', 'Name', '中心线');
imshow(im);
hold on;
plot(n, m, 'r.', 'MarkerSize', 2);

[y_l, x_l] = find(BW == 1);
R_segmented = zeros(1, length(m));

for j = 1:length(x_l)
    x0 = round(y_l(j));
    y0 = x_l(j);
    r = 110;
    
    R_segmented(j) = MoMforSeg1(x0, y0, r, im);
    radius = MoMforSeg1(x0, y0, r, im);
    pointData(j).x = x0;
    pointData(j).y = y0;
    pointData(j).radius = radius;
end

segmentationPoints = [];
for i = 1:length(m)
    neighbors = check_neighbors(BW, m(i), n(i));
    if length(neighbors) == 3
        segmentationPoints = [segmentationPoints; [n(i), m(i)]];
    end
end

figure('NumberTitle', 'off', 'Name', '分段点');
imshow(im);
hold on;
plot(n, m, 'r.', 'MarkerSize', 2);
plot(segmentationPoints(:, 1), segmentationPoints(:, 2), 'mo', 'MarkerFaceColor', 'magenta', 'MarkerSize', 5);
hold off;

distMatrix = pdist2(segmentationPoints, segmentationPoints);
keepPoints = true(size(segmentationPoints, 1), 1);
for i = 1:size(segmentationPoints, 1)
    for j = i+1:size(segmentationPoints, 1)
        if distMatrix(i, j) < 8
            keepPoints(j) = false;
        end
    end
end
finalSegmentationPoints = segmentationPoints(keepPoints, :);

allStenosisPoints = [];
allStenosisDegrees = [];

for i = 1:(size(finalSegmentationPoints, 1) - 1)
    startPoint = finalSegmentationPoints(i, :);
    endPoint = finalSegmentationPoints(i + 1, :);
    
    try
        [shortestPath, shortestPathLength] = findpath2(BW, startPoint, endPoint);
    catch
        warning('未找到从起点到目标点的路径: (%d, %d) 到 (%d, %d)', startPoint(1), startPoint(2), endPoint(1), endPoint(2));
        continue;
    end
    
    average_R = 0;
    for k = 1:shortestPathLength
        currentPoint = shortestPath(k, :);
        currentRadius = getRadius(pointData, currentPoint);
        average_R = average_R + currentRadius;
    end
    average_R = average_R / shortestPathLength;
    
    queue = [];
    queue = duilie(1, shortestPath, queue, pointData);
    middlePoints = [];
    xiazhaichengdu = [];
    for ii = 2:3:size(queue, 1) - 1
        n = 2 * getRadius(pointData, queue(ii, :)) / (getRadius(pointData, queue(ii+1, :)) + getRadius(pointData, queue(ii-1, :)));
        nn = 1 - n;
        if nn > 0.25 && average_R > 4
            xiazhaichengdu = [xiazhaichengdu; nn];
            middlePoints = [middlePoints; queue(ii, :)];
        end
    end
    
    allStenosisPoints = [allStenosisPoints; middlePoints];
    allStenosisDegrees = [allStenosisDegrees; xiazhaichengdu];
end

allStenosisPoints = fliplr(allStenosisPoints);
allStenosisPoints = sortrows(allStenosisPoints);

keepIndices = true(size(allStenosisPoints, 1), 1);
for i = 1:size(allStenosisPoints, 1) - 1
    if abs(allStenosisPoints(i, 1) - allStenosisPoints(i+1, 1)) < 10
        if allStenosisPoints(i, 1) < allStenosisPoints(i+1, 1)
            keepIndices(i+1) = false;
        else
            keepIndices(i) = false;
        end
    end
end

allStenosisPoints = allStenosisPoints(keepIndices, :);
allStenosisDegrees = allStenosisDegrees(keepIndices);

figure('NumberTitle', 'off', 'Name', '狭窄检测结果');
imshow(im);
hold on;

h_blue = plot(NaN, NaN, 'bo', 'MarkerSize', 12);
h_green = plot(NaN, NaN, 'go', 'MarkerSize', 12);
h_red = plot(NaN, NaN, 'ro', 'MarkerSize', 12);

for i = 1:size(allStenosisPoints, 1)
    stenosisX = allStenosisPoints(i, 1);
    stenosisY = allStenosisPoints(i, 2);
    stenosisDegree = allStenosisDegrees(i);
    
    if stenosisDegree > 0.75
        color = 'r';
    elseif stenosisDegree > 0.5
        color = 'g';
    else
        color = 'b';
    end
    
    plot(stenosisX, stenosisY, 'o', 'MarkerEdgeColor', color, 'MarkerSize', 11,'LineWidth',2);
end

hold off;
xlabel('X Coordinate');
ylabel('Y Coordinate');
"""
    
    with open(temp_script, 'w', encoding='utf-8') as f:
        f.write(script_content)
    
    return temp_script


def main():
    """Main function"""
    print()
    print("=" * 72)
    print("    冠状动脉狭窄检测系统 (Coronary Stenosis Detection System)         ")
    print("=" * 72)
    print()
    
    # Check MATLAB
    print_info("检查 MATLAB 环境...")
    if not check_matlab():
        print_error("未找到 MATLAB！请确保 MATLAB 已安装并添加到系统 PATH。")
        print_info("MATLAB 下载地址: https://www.mathworks.com/products/matlab.html")
        sys.exit(1)
    print_success("MATLAB 环境检查通过")
    
    # Check stenosis detection directory
    stenosis_dir = "stenosis_detection"
    if not os.path.isdir(stenosis_dir):
        print_error(f"未找到狭窄检测目录: {stenosis_dir}")
        sys.exit(1)
    
    # Check main script
    main_script = os.path.join(stenosis_dir, "maskjiance1016.m")
    if not os.path.isfile(main_script):
        print_error(f"未找到主脚本文件: {main_script}")
        sys.exit(1)
    
    # Parse arguments
    if len(sys.argv) == 3:
        image_path = sys.argv[1]
        mask_path = sys.argv[2]
        
        # Check if files exist
        if not os.path.isfile(image_path):
            print_error(f"原始图像文件不存在: {image_path}")
            sys.exit(1)
        
        if not os.path.isfile(mask_path):
            print_error(f"掩码图像文件不存在: {mask_path}")
            sys.exit(1)
        
        print_info("使用指定的图像:")
        print_info(f"  原始图像: {image_path}")
        print_info(f"  掩码图像: {mask_path}")
        
        # Create temporary script
        run_script = create_temp_script(image_path, mask_path, stenosis_dir)
        
    elif len(sys.argv) == 1:
        print_warning("未指定图像路径，将使用主脚本中预设的路径")
        print_info(f"提示: 请确保在 {main_script} 中设置了正确的图像路径")
        print_info(f"或使用: python {sys.argv[0]} <image_path> <mask_path> 指定图像")
        print()
        
        response = input("是否继续? (y/n): ").strip().lower()
        if response not in ['y', 'yes']:
            print_info("已取消运行")
            sys.exit(0)
        
        run_script = "maskjiance1016.m"
    else:
        print_error("参数错误！")
        print(f"用法: python {sys.argv[0]} [image_path mask_path]")
        sys.exit(1)
    
    # Run MATLAB
    print_info("启动狭窄检测...")
    print()
    
    try:
        run_matlab_script(run_script, stenosis_dir)
        
        # Clean up temporary script
        if len(sys.argv) == 3:
            temp_script = os.path.join(stenosis_dir, 'temp_run.m')
            if os.path.exists(temp_script):
                os.remove(temp_script)
        
        print()
        print_success("狭窄检测完成！")
        print()
        print_info("结果说明:")
        print("  - 图1: 中心线提取结果")
        print("  - 图2: 分段点检测结果")
        print("  - 图3: 狭窄检测结果")
        print()
        print_info("狭窄程度标识:")
        print("  - 红色圆圈: 严重狭窄 (>75%)")
        print("  - 绿色圆圈: 中度狭窄 (50-75%)")
        print("  - 蓝色圆圈: 轻度狭窄 (25-50%)")
        print()
        print("=" * 72)
        
    except Exception as e:
        print_error(f"运行失败: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    main()
