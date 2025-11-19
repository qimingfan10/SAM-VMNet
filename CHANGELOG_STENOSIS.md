# 狭窄检测模块重构日志 (Stenosis Detection Module Refactoring Changelog)

## 2024-11-19 - 代码重构与优化 (Code Refactoring and Optimization)

### 📁 代码组织 (Code Organization)

#### 新增目录 (New Directory)
- **`stenosis_detection/`** - 狭窄检测模块专用文件夹
  - 将所有狭窄检测相关的 MATLAB 代码集中管理
  - 提供独立的模块化结构，便于维护和使用

#### 移动文件 (Moved Files)
以下文件从根目录移动到 `stenosis_detection/` 目录：

1. **主脚本 (Main Script)**
   - `maskjiance1016.m` - 狭窄检测主程序

2. **支持函数 (Supporting Functions)**
   - `MoMforSeg1.m` - 矩量法半径计算
   - `check_neighbors.m` - 邻居点检查
   - `findpath2.m` - 路径查找算法
   - `getRadius.m` - 半径获取函数
   - `duilie.m` - 队列处理
   - `getNeighbors.m` - 8连通邻居获取

### 📝 新增文档 (New Documentation)

#### 模块文档
- **`stenosis_detection/README_stenosis.md`**
  - 详细的中英文使用说明
  - 功能特性介绍
  - 完整的使用流程
  - 参数调整指南
  - 系统要求说明

### 🚀 一键启动脚本 (One-Click Startup Scripts)

#### 根目录新增脚本 (New Root Scripts)

1. **`run_stenosis_detection.sh`** (Bash 脚本)
   - ✅ Linux/Mac 系统支持
   - ✅ 彩色终端输出，友好的用户界面
   - ✅ 自动检查 MATLAB 环境
   - ✅ 支持命令行参数指定图像路径
   - ✅ 支持默认路径运行（需预先配置）
   - ✅ 错误检查和提示
   - ✅ 使用说明和结果解释

   **使用方法：**
   ```bash
   # 指定图像路径运行
   ./run_stenosis_detection.sh original_image.jpg mask_image.png
   
   # 使用默认路径运行
   ./run_stenosis_detection.sh
   ```

2. **`run_stenosis_detection.py`** (Python 脚本)
   - ✅ 跨平台支持（Windows/Linux/Mac）
   - ✅ Python 3 编写，易于扩展
   - ✅ 自动检测 MATLAB 安装
   - ✅ 支持命令行参数
   - ✅ 完整的临时脚本生成
   - ✅ 自动清理临时文件
   - ✅ 详细的错误处理

   **使用方法：**
   ```bash
   # 指定图像路径运行
   python run_stenosis_detection.py original_image.jpg mask_image.png
   
   # 使用默认路径运行
   python run_stenosis_detection.py
   ```

### 📖 主 README 更新 (Main README Updates)

#### 更新内容
- ✅ 更新狭窄检测模块章节（第 4 节）
- ✅ 修正文件路径引用（从根目录改为 `stenosis_detection/`）
- ✅ 添加一键启动脚本使用说明
- ✅ 提供快速开始指南
- ✅ 保留手动使用方法说明

### 🎯 改进优势 (Improvements)

#### 代码结构
- ✅ **模块化设计** - 狭窄检测代码独立成模块
- ✅ **清晰的项目结构** - 根目录更整洁
- ✅ **便于维护** - 相关代码集中管理

#### 用户体验
- ✅ **一键启动** - 简化运行流程
- ✅ **跨平台支持** - 提供多种运行方式
- ✅ **友好界面** - 彩色输出和详细提示
- ✅ **灵活使用** - 支持参数指定或默认配置

#### 开发体验
- ✅ **完整文档** - 中英文双语说明
- ✅ **示例丰富** - 多种使用场景
- ✅ **易于集成** - 可与深度学习pipeline结合

### 🗂️ 项目结构 (Project Structure)

```
SAM-VMNet/
├── stenosis_detection/              # 狭窄检测模块（新增）
│   ├── README_stenosis.md          # 模块说明文档
│   ├── maskjiance1016.m            # 主脚本
│   ├── MoMforSeg1.m                # 支持函数
│   ├── check_neighbors.m           # 支持函数
│   ├── findpath2.m                 # 支持函数
│   ├── getRadius.m                 # 支持函数
│   ├── duilie.m                    # 支持函数
│   └── getNeighbors.m              # 支持函数
│
├── run_stenosis_detection.sh       # Bash 启动脚本（新增）
├── run_stenosis_detection.py       # Python 启动脚本（新增）
├── CHANGELOG_STENOSIS.md           # 更新日志（本文件）
├── README.md                        # 主文档（已更新）
│
├── models/                          # 深度学习模型
├── med_sam/                         # MedSAM 模块
├── configs/                         # 配置文件
├── data/                            # 数据目录
├── train_branch1.py                # 训练脚本
├── train_branch2.py                # 训练脚本
└── ...                              # 其他文件
```

### 📋 检查清单 (Checklist)

- [x] 创建 `stenosis_detection/` 目录
- [x] 移动所有 MATLAB 文件到新目录
- [x] 创建模块 README 文档
- [x] 编写 Bash 启动脚本
- [x] 编写 Python 启动脚本
- [x] 设置脚本执行权限
- [x] 更新主 README 文档
- [x] 验证脚本语法正确性
- [x] 创建更新日志文档

### 🔄 向后兼容性 (Backwards Compatibility)

#### 迁移指南
如果您之前直接在根目录使用 MATLAB 脚本：

**旧方式：**
```matlab
% 在根目录
maskjiance1016
```

**新方式 1（推荐）：**
```bash
# 使用启动脚本
./run_stenosis_detection.sh image.jpg mask.png
```

**新方式 2（手动）：**
```matlab
% 切换到模块目录
cd stenosis_detection
maskjiance1016
```

### 🐛 问题修复 (Bug Fixes)
- 无（本次为重构，未修改算法逻辑）

### ⚠️ 注意事项 (Notes)

1. **路径更新**: 如果您有自定义脚本调用这些 MATLAB 文件，请更新路径为 `stenosis_detection/`
2. **MATLAB 环境**: 确保 MATLAB 已正确安装并添加到系统 PATH
3. **图像路径**: 使用启动脚本时，可以使用相对路径或绝对路径指定图像

### 📞 技术支持 (Support)

如有问题或建议，请：
- 提交 GitHub Issue
- 参考 `stenosis_detection/README_stenosis.md` 详细文档
- 查看主 README.md 的使用示例

---

**变更类型 (Change Type)**: 重构 (Refactoring)  
**影响范围 (Impact)**: 代码组织结构  
**破坏性变更 (Breaking Changes)**: 无（提供向后兼容的多种使用方式）
