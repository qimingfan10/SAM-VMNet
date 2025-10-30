# SAM-VMNet

[![SAM-VMNet](https://img.shields.io/badge/Hugging%20Face-Models-c93837?style=flat-square)](https://huggingface.co/ly17/SAM-VMNet) ![GitHub stars](https://img.shields.io/github/stars/qimingfan10/SAM-VMNet) ![GitHub forks](https://img.shields.io/github/forks/qimingfan10/SAM-VMNet)


This is the official code repository for "Deep learning model for coronary artery segmentation and quantitative stenosis detection in angiographic images", which is accpeted by **Medical Physics** as a research article!

![Framework Architecture](samvm-net.jpg)
*Figure 1: The overall architecture of SAM-VMNet combining VMUnet (Vision-based Medical Network) with SAM (Segment Anything Model)*


## Prepare

To set up the project, follow these steps:

**Clone the repository**:

   ```bash
   git clone https://github.com/qimingfan10/SAM-VMNet.git
   cd SAM-VMNet
   ```

## Tech Stack

### Core Framework
![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-1.13.0-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)
![TorchVision](https://img.shields.io/badge/TorchVision-0.14.0-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)

### Deep Learning Architecture
- **VMUNet** - Vision Mamba U-Net with VSSM-based selective scan blocks
- **SAMVMNet** - Fusion of MedSAM features with VMUNet backbone
- **MedSAM** - Medical Segment Anything Model for feature extraction
- **Mamba SSM** (v1.0.1) - State Space Model for efficient sequence modeling
- **timm** (v0.4.12) - PyTorch Image Models for vision backbones

### Medical Imaging & Scientific Computing
- **MONAI** - Medical Open Network for AI toolkit
- **OpenCV** - Computer vision and image processing
- **SimpleITK** (≥2.2.1) - Medical image analysis
- **scikit-image** - Image processing algorithms
- **scipy** - Scientific computing library
- **scikit-learn** - Machine learning utilities
- **nibabel** - Neuroimaging data I/O
- **medpy** - Medical image processing

### Training & Optimization
- **tensorboardX** - TensorBoard logging for PyTorch
- **triton** (v2.0.0) - GPU programming and acceleration
- **causal_conv1d** (v1.0.0) - Efficient causal convolutions for Mamba
- **THOP** - PyTorch-OpCounter for FLOPs computation

### Data Processing & Utilities
- **h5py** - HDF5 file format support
- **tqdm** - Progress bars
- **matplotlib** - Plotting and visualization
- **yacs** - Configuration management
- **termcolor** - Terminal text styling

### Model Export & Inference
- **ONNX** - Open Neural Network Exchange format
- **ONNXRuntime** - Cross-platform inference engine
- **pycocotools** - COCO dataset evaluation metrics

### Development Tools
- **pytest** - Unit testing framework
- **flake8** - Code linting
- **black** - Code formatting
- **isort** - Import sorting
- **mypy** - Static type checking
- **JupyterLab** - Interactive development environment

## 0. Environments

   ```bash
   pip install -r requirements.txt
   ```

The .whl files of mamba_ssm could be found [here](https://github.com/state-spaces/mamba/releases).
The .whl files of causal_conv1d could be found [here](https://github.com/Dao-AILab/causal-conv1d/releases).

## 1. Download the pre-trained weights

   Download the following files from Google Drive and place them in the `./pre_trained_weights` directory:
   
   - [vmamba_small_e238_ema.pth](https://drive.google.com/file/d/1XL7JuacjoZCr8w2b0c8CaQn8b0hREblk/view?usp=drive_link)
  
   - [best-epoch142-loss0.3230.pth](https://drive.google.com/file/d/1OKIzUM_L6FeEqyuIsAMn4x-FHptizTkG/view?usp=drive_link)
  
   - [best-epoch142-loss0.3488.pth](https://drive.google.com/file/d/1jsZKakA4FrYaMXNp6qkVtxXwwcJQKrW4/view?usp=drive_link)
   
   - [MedSAM_model.pth](https://drive.google.com/file/d/1O5IVkcVxd2RtOcZEKuTR3WkOBiosHBfz/view?usp=drive_link)

## 2. Prepare the datasets

Download the [ARCADE](https://zenodo.org/records/10390295) from zenodo.

After downloading the datasets, you are supposed to put them into `./data/vessel/` and the file format reference is as follows.
```
- './data/vessel/'
  - train
    - images
      - .png
    - masks
      - .png
  - val
    - images
      - .png
    - masks
      - .png
  - test
    - images
      - .png
    - masks
      - .png
```
## 3. Usage
```bash
bash train.sh
```
First, train the Pure VM-UNet of Branch 1. The trained weights will be saved in `./result_branch1/`.

```bash
bash test.sh
```
Then, use the trained weights to predict the test set images and obtain pred_masks.

```bash
bash train.sh
```
Finally, train the SAM-VMNet of Branch 2. The trained weights will be saved in `./result_branch1/`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Citation

If you use this project in your research, please cite the following paper:

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

---

For any questions or issues, please open an issue on this repository.
