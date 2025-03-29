# SAM-VMNet
![Description of the image](https://drive.google.com/uc?export=view&id=1hJJfgBumF-Sh5qwWpemwwAcNlQPuTTUZ)

SAM-VMNet is a project that combines the power of SAM (Segment Anything Model) and VMNet (Vision-based Medical Network) for advanced medical image segmentation. This project is based on the research paper available at [arXiv:2406.00492](https://arxiv.org/abs/2406.00492).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Pre-trained Weights](#pre-trained-weights)
- [License](#license)
- [Citation](#citation)

## Installation

To set up the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/qimingfan10/SAM-VMNet.git
   cd SAM-VMNet
   ```

2. **Install the required dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

## Usage

After installing the dependencies, you can proceed with the following steps:

1. **Download the pre-trained weights**:

   - Download the following files from Google Drive and place them in the `SAM-VMNet/VM-UNet/pre_trained_weights` directory:
     - [vmamba_small_e238_ema.pth](https://drive.google.com/file/d/1XL7JuacjoZCr8w2b0c8CaQn8b0hREblk/view?usp=drive_link)
     - [best-epoch142-loss0.3230.pth](https://drive.google.com/file/d/1OKIzUM_L6FeEqyuIsAMn4x-FHptizTkG/view?usp=drive_link)
     - [best-epoch142-loss0.3488.pth](https://drive.google.com/file/d/1jsZKakA4FrYaMXNp6qkVtxXwwcJQKrW4/view?usp=drive_link)

   - Download the following file from Google Drive and place it in the `SAM-VMNet/MedSAM-main/work_dir/MedSAM` directory:
     - [MedSAM_model.pth](https://drive.google.com/file/d/1O5IVkcVxd2RtOcZEKuTR3WkOBiosHBfz/view?usp=drive_link)

   - The pre-trained models are available on [![Hugging Face Models](https://img.shields.io/badge/Hugging%20Face-Models-c93837?style=flat-square)](https://huggingface.co/ly17/SAM-VMNet). You can download and use them for your projects.
     
2. **Run the project**:

   - Follow the instructions in the project's source code to run the segmentation tasks.

## Pre-trained Weights

The pre-trained weights are essential for the project to function correctly. Ensure that you download and place them in the correct directories as specified in the [Usage](#usage) section.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Citation

If you use this project in your research, please cite the following paper:

```bibtex
@article{author2024samvmnet,
  title={SAM-VMNet: Advanced Medical Image Segmentation},
  author={Author, First and Author, Second},
  journal={arXiv preprint arXiv:2406.00492},
  year={2024}
}
```

---

For any questions or issues, please open an issue on this repository.
