
# SAM-VMUNet 模型用于血管分割

## 简介

该项目实现了 SAM-VMUnet 模型，结合了 MedSAM 和 VM-UNet，用于医学图像中的血管分割。它通过 VM-UNet 进行初步粗分割，然后利用 MedSAM 的提示机制进一步优化细分割。

## 使用说明

### 环境准备

1. 克隆项目：
   ```bash
   git clone https://github.com/qimingfan10/SAM-VMNet.git
   cd SAM-VMNet
   ```

2. 安装依赖：
   ```bash
   pip install -r requirements.txt
   ```

### 数据准备

将数据集按照以下结构放置于 `data/` 目录：

```
data/
├── train/
│   ├── images/     # 训练图像
│   ├── masks/      # 训练标签
├── val/
│   ├── images/     # 验证图像
│   ├── masks/      # 验证标签
```

### 模型训练

执行以下命令开始训练：

```bash
python train.py
```
## 下载预训练权重

由于预训练权重文件较大，它们存储在 Google Drive 中。请从以下链接下载这些文件：

- [best-epoch142-loss0.3230.pth](https://drive.google.com/file/d/1jsZKakA4FrYaMXNp6qkVtxXwwcJQKrW4/view?usp=drive_link)
- [best-epoch142-loss0.3488.pth](https://drive.google.com/file/d/1OKIzUM_L6FeEqyuIsAMn4x-FHptizTkG/view?usp=drive_link)
- [vmamba_small_e238_ema.pth](https://drive.google.com/file/d/1XL7JuacjoZCr8w2b0c8CaQn8b0hREblk/view?usp=drive_link)

下载完成后，请将这些文件放置在 `VM-UNet/pre_trained_weights/` 目录中。

请从以下链接下载这些文件：

- [medsam_vit_b.pth](https://drive.google.com/file/d/1O5IVkcVxd2RtOcZEKuTR3WkOBiosHBfz/view?usp=drive_link)

  下载完成后，请将这些文件放置在 `MedSAM-main/work_dir/MedSAM/` 目录中。

