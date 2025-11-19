# 狭窄检测快速开始指南 (Stenosis Detection Quick Start Guide)

## 🚀 5分钟快速开始 (5-Minute Quick Start)

### 前置要求 (Prerequisites)

1. **安装 MATLAB**
   - MATLAB R2016b 或更高版本
   - 需要 Image Processing Toolbox

2. **准备图像**
   - 原始血管造影图像（如：`test.jpg`）
   - 分割后的掩码图像（如：`test_mask.png`）

---

## 方法一：一键启动（推荐）

### Linux/Mac 用户

```bash
# 1. 赋予脚本执行权限（仅第一次需要）
chmod +x run_stenosis_detection.sh

# 2. 运行狭窄检测
./run_stenosis_detection.sh path/to/image.jpg path/to/mask.png
```

### Windows 用户 或 跨平台

```bash
# 使用 Python 脚本
python run_stenosis_detection.py path/to/image.jpg path/to/mask.png
```

### 示例

```bash
# 假设你的图像在 data 目录下
./run_stenosis_detection.sh data/vessel.jpg data/vessel_mask.png

# 或使用 Python
python run_stenosis_detection.py data/vessel.jpg data/vessel_mask.png
```

---

## 方法二：手动运行

### 步骤 1: 编辑配置

编辑 `stenosis_detection/maskjiance1016.m` 文件的第 4 和 7 行：

```matlab
Im = imread("path/to/your_image.jpg");     % 第4行：原始图像路径
im = imread("path/to/your_mask.png");       % 第7行：掩码图像路径
```

### 步骤 2: 在 MATLAB 中运行

```matlab
cd stenosis_detection
maskjiance1016
```

---

## 📊 结果解读 (Understanding Results)

运行后会自动弹出三个窗口：

### 图1：中心线提取
- 显示血管骨架（红色点）
- 验证中心线提取是否正确

### 图2：分段点检测
- 红色点：血管中心线
- 紫色圆圈：分叉点
- 验证分段点识别是否准确

### 图3：狭窄检测结果 ⭐
**这是最重要的结果图！**

颜色编码表示狭窄严重程度：
- 🔴 **红色圆圈**：严重狭窄 (>75%)
- 🟢 **绿色圆圈**：中度狭窄 (50-75%)
- 🔵 **蓝色圆圈**：轻度狭窄 (25-50%)

---

## ⚙️ 常见问题 (FAQ)

### Q1: 提示找不到 MATLAB？
**A:** 确保 MATLAB 已添加到系统 PATH：

**Linux/Mac:**
```bash
export PATH="/path/to/MATLAB/bin:$PATH"
```

**Windows:**
在系统环境变量中添加 MATLAB 的 bin 目录

### Q2: 图像路径包含空格怎么办？
**A:** 使用引号包裹路径：
```bash
./run_stenosis_detection.sh "path/with spaces/image.jpg" "path/with spaces/mask.png"
```

### Q3: 如何调整检测灵敏度？
**A:** 编辑 `stenosis_detection/maskjiance1016.m`：

```matlab
% 第43行：检索半径（越大检测范围越广）
r = 110;

% 第76行：分段点距离阈值
if distMatrix(i, j) < 8  % 改为更大值：分段点过滤更严格

% 第115行：狭窄检测阈值
if nn > 0.25 && average_R > 4  % 调整这两个值
```

### Q4: 没有检测到狭窄点？
**可能原因：**
1. 掩码质量不好 → 使用更高质量的分割结果
2. 阈值太严格 → 降低第115行的 `0.25` 值（如改为 `0.20`）
3. 血管半径太小 → 降低 `average_R > 4` 的阈值

### Q5: 检测到太多误报？
**解决方案：**
1. 提高阈值 → 增大第115行的 `0.25` 值（如改为 `0.30`）
2. 增加半径过滤 → 增大 `average_R > 4` 的阈值

---

## 📁 文件说明 (File Description)

### 根目录脚本
- `run_stenosis_detection.sh` - Bash启动脚本（Linux/Mac）
- `run_stenosis_detection.py` - Python启动脚本（跨平台）

### stenosis_detection/ 目录
- `maskjiance1016.m` - 主程序
- `MoMforSeg1.m` - 半径计算
- `check_neighbors.m` - 邻居检查
- `findpath2.m` - 路径查找
- `getRadius.m` - 半径获取
- `duilie.m` - 队列处理
- `getNeighbors.m` - 邻居获取
- `README_stenosis.md` - 详细文档

---

## 🔗 相关链接 (Related Links)

- 📖 **完整文档**: `stenosis_detection/README_stenosis.md`
- 📝 **更新日志**: `CHANGELOG_STENOSIS.md`
- 🏠 **项目主页**: `README.md`

---

## 💡 使用技巧 (Tips)

1. **批量处理**: 可以写一个循环脚本调用启动脚本处理多张图像
2. **结果保存**: 在 MATLAB 窗口中使用 `saveas(gcf, 'result.png')` 保存图像
3. **性能优化**: 调整第43行的检索半径 `r` 可以在速度和精度间平衡
4. **调试模式**: 在 MATLAB 中逐步运行 `maskjiance1016.m` 可以查看中间结果

---

## 📞 获取帮助 (Get Help)

如果遇到问题：
1. 查看 `stenosis_detection/README_stenosis.md` 详细文档
2. 检查 MATLAB 命令窗口的错误信息
3. 在 GitHub 上提交 Issue
4. 确认图像格式正确（支持 .jpg, .png 等常见格式）

---

## ✅ 快速检查清单 (Quick Checklist)

运行前确认：
- [ ] MATLAB 已安装并可用
- [ ] Image Processing Toolbox 已安装
- [ ] 原始图像文件存在
- [ ] 掩码图像文件存在
- [ ] 启动脚本有执行权限（Linux/Mac）

---

**祝您使用愉快！ Good luck with your stenosis detection! 🎉**
