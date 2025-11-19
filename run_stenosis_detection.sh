#!/bin/bash
################################################################################
# 狭窄检测一键启动脚本 (Stenosis Detection Startup Script)
#
# 使用方法 (Usage):
#   ./run_stenosis_detection.sh [image_path] [mask_path]
#
# 参数 (Parameters):
#   image_path: 原始血管造影图像路径 (Optional, path to original vessel image)
#   mask_path:  分割掩码图像路径 (Optional, path to segmented mask image)
#
# 示例 (Example):
#   ./run_stenosis_detection.sh data/test.jpg data/test_mask.png
#
################################################################################

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 打印欢迎信息
echo ""
echo "========================================================================"
echo "    冠状动脉狭窄检测系统 (Coronary Stenosis Detection System)         "
echo "========================================================================"
echo ""

# 检查 MATLAB 是否安装
print_info "检查 MATLAB 环境..."
if ! command -v matlab &> /dev/null; then
    print_error "未找到 MATLAB！请确保 MATLAB 已安装并添加到系统 PATH。"
    print_info "MATLAB 下载地址: https://www.mathworks.com/products/matlab.html"
    exit 1
fi
print_success "MATLAB 环境检查通过"

# 检查狭窄检测目录
STENOSIS_DIR="stenosis_detection"
if [ ! -d "$STENOSIS_DIR" ]; then
    print_error "未找到狭窄检测目录: $STENOSIS_DIR"
    exit 1
fi

# 检查主脚本文件
MAIN_SCRIPT="$STENOSIS_DIR/maskjiance1016.m"
if [ ! -f "$MAIN_SCRIPT" ]; then
    print_error "未找到主脚本文件: $MAIN_SCRIPT"
    exit 1
fi

# 获取图像路径参数
IMAGE_PATH=""
MASK_PATH=""

if [ $# -eq 2 ]; then
    IMAGE_PATH="$1"
    MASK_PATH="$2"
    
    # 检查文件是否存在
    if [ ! -f "$IMAGE_PATH" ]; then
        print_error "原始图像文件不存在: $IMAGE_PATH"
        exit 1
    fi
    
    if [ ! -f "$MASK_PATH" ]; then
        print_error "掩码图像文件不存在: $MASK_PATH"
        exit 1
    fi
    
    print_info "使用指定的图像:"
    print_info "  原始图像: $IMAGE_PATH"
    print_info "  掩码图像: $MASK_PATH"
    
    # 创建临时 MATLAB 脚本
    TEMP_SCRIPT="$STENOSIS_DIR/temp_run.m"
    cat > "$TEMP_SCRIPT" << EOF
% 临时运行脚本 - 使用命令行参数指定的图像
clc; clear all; close all;

% 读取图像
Im = imread('$IMAGE_PATH');
Im = imresize(Im, [800 600]);

im = imread('$MASK_PATH');
im = imresize(im, [800 600]);
if size(im, 3) == 3
    im = rgb2gray(im);
end

% 运行狭窄检测
run('maskjiance1016_core.m');
EOF

    # 创建核心检测脚本（不包含图像读取部分）
    CORE_SCRIPT="$STENOSIS_DIR/maskjiance1016_core.m"
    tail -n +8 "$MAIN_SCRIPT" > "$CORE_SCRIPT"
    
    RUN_SCRIPT="$TEMP_SCRIPT"
elif [ $# -eq 0 ]; then
    print_warning "未指定图像路径，将使用主脚本中预设的路径"
    print_info "提示: 请确保在 $MAIN_SCRIPT 中设置了正确的图像路径"
    print_info "或使用: $0 <image_path> <mask_path> 指定图像"
    echo ""
    read -p "是否继续? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "已取消运行"
        exit 0
    fi
    RUN_SCRIPT="maskjiance1016.m"
else
    print_error "参数错误！"
    echo "用法: $0 [image_path mask_path]"
    exit 1
fi

# 切换到狭窄检测目录并运行 MATLAB
print_info "启动狭窄检测..."
echo ""

cd "$STENOSIS_DIR" || exit 1

# 运行 MATLAB
matlab -nosplash -nodesktop -r "try; run('$RUN_SCRIPT'); catch ME; disp(getReport(ME)); end; pause(10); exit;"

# 清理临时文件
if [ -f "$TEMP_SCRIPT" ]; then
    rm "$TEMP_SCRIPT"
fi
if [ -f "$CORE_SCRIPT" ]; then
    rm "$CORE_SCRIPT"
fi

cd ..

echo ""
print_success "狭窄检测完成！"
echo ""
print_info "结果说明:"
echo "  - 图1: 中心线提取结果"
echo "  - 图2: 分段点检测结果"
echo "  - 图3: 狭窄检测结果"
echo ""
print_info "狭窄程度标识:"
echo "  - 红色圆圈: 严重狭窄 (>75%)"
echo "  - 绿色圆圈: 中度狭窄 (50-75%)"
echo "  - 蓝色圆圈: 轻度狭窄 (25-50%)"
echo ""
echo "========================================================================"
