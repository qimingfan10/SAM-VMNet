#!/bin/bash
################################################################################
# 狭窄检测环境验证脚本 (Stenosis Detection Environment Verification Script)
#
# 此脚本检查狭窄检测模块所需的所有组件是否正确安装和配置
# This script verifies all components required by the stenosis detection module
################################################################################

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "========================================================================"
echo "    狭窄检测环境验证 (Stenosis Detection Environment Verification)    "
echo "========================================================================"
echo ""

# 检查计数器
PASS=0
FAIL=0
WARN=0

# 1. 检查 MATLAB
echo -n "检查 MATLAB 安装...                "
if command -v matlab &> /dev/null; then
    echo -e "${GREEN}✓ 通过${NC}"
    PASS=$((PASS + 1))
else
    echo -e "${RED}✗ 未找到${NC}"
    echo "  提示: 请安装 MATLAB 并添加到系统 PATH"
    FAIL=$((FAIL + 1))
fi

# 2. 检查 Python
echo -n "检查 Python 安装...                "
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version 2>&1 | grep -oP '\d+\.\d+')
    echo -e "${GREEN}✓ 通过${NC} (版本: $PYTHON_VERSION)"
    PASS=$((PASS + 1))
else
    echo -e "${YELLOW}⚠ 未找到${NC}"
    echo "  提示: Python 脚本需要 Python 3"
    WARN=$((WARN + 1))
fi

# 3. 检查启动脚本
echo -n "检查 Bash 启动脚本...              "
if [ -f "run_stenosis_detection.sh" ]; then
    if [ -x "run_stenosis_detection.sh" ]; then
        echo -e "${GREEN}✓ 通过${NC} (可执行)"
        PASS=$((PASS + 1))
    else
        echo -e "${YELLOW}⚠ 存在但不可执行${NC}"
        echo "  运行: chmod +x run_stenosis_detection.sh"
        WARN=$((WARN + 1))
    fi
else
    echo -e "${RED}✗ 未找到${NC}"
    FAIL=$((FAIL + 1))
fi

echo -n "检查 Python 启动脚本...            "
if [ -f "run_stenosis_detection.py" ]; then
    if python3 -m py_compile run_stenosis_detection.py 2>/dev/null; then
        echo -e "${GREEN}✓ 通过${NC} (语法正确)"
        PASS=$((PASS + 1))
    else
        echo -e "${RED}✗ 语法错误${NC}"
        FAIL=$((FAIL + 1))
    fi
else
    echo -e "${RED}✗ 未找到${NC}"
    FAIL=$((FAIL + 1))
fi

# 4. 检查模块目录
echo -n "检查 stenosis_detection 目录...    "
if [ -d "stenosis_detection" ]; then
    echo -e "${GREEN}✓ 通过${NC}"
    PASS=$((PASS + 1))
else
    echo -e "${RED}✗ 未找到${NC}"
    FAIL=$((FAIL + 1))
fi

# 5. 检查 MATLAB 文件
MATLAB_FILES=(
    "stenosis_detection/maskjiance1016.m"
    "stenosis_detection/MoMforSeg1.m"
    "stenosis_detection/check_neighbors.m"
    "stenosis_detection/findpath2.m"
    "stenosis_detection/getRadius.m"
    "stenosis_detection/duilie.m"
    "stenosis_detection/getNeighbors.m"
)

echo -n "检查 MATLAB 文件...                "
MISSING_FILES=0
for file in "${MATLAB_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        MISSING_FILES=$((MISSING_FILES + 1))
    fi
done

if [ $MISSING_FILES -eq 0 ]; then
    echo -e "${GREEN}✓ 通过${NC} (${#MATLAB_FILES[@]}/7 个文件)"
    PASS=$((PASS + 1))
else
    echo -e "${RED}✗ 缺少 $MISSING_FILES 个文件${NC}"
    FAIL=$((FAIL + 1))
fi

# 6. 检查文档
echo -n "检查文档文件...                    "
DOC_COUNT=0
[ -f "QUICK_START_STENOSIS.md" ] && DOC_COUNT=$((DOC_COUNT + 1))
[ -f "CHANGELOG_STENOSIS.md" ] && DOC_COUNT=$((DOC_COUNT + 1))
[ -f "stenosis_detection/README_stenosis.md" ] && DOC_COUNT=$((DOC_COUNT + 1))

if [ $DOC_COUNT -ge 2 ]; then
    echo -e "${GREEN}✓ 通过${NC} ($DOC_COUNT 个文档)"
    PASS=$((PASS + 1))
else
    echo -e "${YELLOW}⚠ 不完整${NC} ($DOC_COUNT 个文档)"
    WARN=$((WARN + 1))
fi

# 7. 检查示例数据目录
echo -n "检查数据目录...                    "
if [ -d "data" ]; then
    echo -e "${GREEN}✓ 通过${NC}"
    PASS=$((PASS + 1))
else
    echo -e "${YELLOW}⚠ 未找到${NC}"
    echo "  提示: 您可能需要创建 data 目录存放图像"
    WARN=$((WARN + 1))
fi

echo ""
echo "========================================================================"
echo "验证结果汇总 (Verification Summary)"
echo "========================================================================"
echo -e "${GREEN}通过 (Pass):    $PASS${NC}"
echo -e "${YELLOW}警告 (Warning): $WARN${NC}"
echo -e "${RED}失败 (Failed):  $FAIL${NC}"
echo ""

# 总体评估
TOTAL=$((PASS + WARN + FAIL))
if [ $FAIL -eq 0 ] && [ $WARN -eq 0 ]; then
    echo -e "${GREEN}🎉 所有检查通过！您可以开始使用狭窄检测模块。${NC}"
    echo ""
    echo "快速开始:"
    echo "  ./run_stenosis_detection.sh image.jpg mask.png"
    echo ""
    echo "或查看快速开始指南:"
    echo "  cat QUICK_START_STENOSIS.md"
    EXIT_CODE=0
elif [ $FAIL -eq 0 ]; then
    echo -e "${YELLOW}⚠️  环境基本正常，但有一些警告项需要注意。${NC}"
    echo ""
    echo "您仍然可以使用狭窄检测模块，但建议查看上述警告。"
    EXIT_CODE=0
else
    echo -e "${RED}❌ 环境检查失败！请修复上述问题后再使用。${NC}"
    echo ""
    echo "常见问题解决方案:"
    echo "  1. MATLAB 未安装: 访问 https://www.mathworks.com/"
    echo "  2. 文件缺失: 重新克隆仓库或检查文件完整性"
    echo "  3. 权限问题: 运行 chmod +x *.sh"
    EXIT_CODE=1
fi

echo "========================================================================"

exit $EXIT_CODE
