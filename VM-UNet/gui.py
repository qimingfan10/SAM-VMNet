import torch
from torch.utils.data import DataLoader
import timm
from datasets.dataset import NPY_datasets
from tensorboardX import SummaryWriter
from models.vmunet.vmunet import VMUNet
from engine import *
import os
import sys
import shutil
import tkinter as tk
from tkinter import filedialog, messagebox
from PIL import Image, ImageTk

from utils import *
from configs.config_setting import setting_config

import warnings

warnings.filterwarnings("ignore")


def predict(image_path, config):
    current_directory = os.path.dirname(os.path.abspath(__file__))
    datapath = f"{current_directory}/data/one/"
    weight_path = f"{current_directory}/pre_trained_weights/best-epoch142-loss0.3488.pth"

    # 确保目标目录存在
    target_dirs = [
        f'{datapath}/train/images',
        f'{datapath}/train/masks',
        f'{datapath}/val/images',
        f'{datapath}/val/masks'
    ]
    for target_dir in target_dirs:
        os.makedirs(target_dir, exist_ok=True)
        clear_folder(target_dir)

    # 将文件复制到每个目标目录
    for target_dir in target_dirs:
        shutil.copy(image_path, target_dir)

    print('#----------Creating logger----------#')
    sys.path.append(config.work_dir + '/')
    log_dir = os.path.join(config.work_dir, 'log')
    checkpoint_dir = os.path.join(config.work_dir, 'checkpoints')
    resume_model = os.path.join(checkpoint_dir, 'latest.pth')
    outputs = os.path.join(config.work_dir, 'outputs')
    if not os.path.exists(checkpoint_dir):
        os.makedirs(checkpoint_dir)
    if not os.path.exists(outputs):
        os.makedirs(outputs)

    logger = get_logger('train', log_dir)
    writer = SummaryWriter(config.work_dir + 'summary')

    log_config_info(config, logger)

    print('#----------GPU init----------#')
    os.environ["CUDA_VISIBLE_DEVICES"] = config.gpu_id
    set_seed(config.seed)
    torch.cuda.empty_cache()

    print('#----------Preparing dataset----------#')
    val_dataset = NPY_datasets(datapath, config, train=False)
    val_loader = DataLoader(val_dataset,
                            batch_size=1,
                            shuffle=False,
                            pin_memory=True,
                            num_workers=config.num_workers,
                            drop_last=True)

    print('#----------Prepareing Model----------#')
    model_cfg = config.model_config
    if config.network == 'vmunet':
        model = VMUNet(
            num_classes=model_cfg['num_classes'],
            input_channels=model_cfg['input_channels'],
            depths=model_cfg['depths'],
            depths_decoder=model_cfg['depths_decoder'],
            drop_path_rate=model_cfg['drop_path_rate'],
            load_ckpt_path=model_cfg['load_ckpt_path'],
        )
        model.load_from()

    else:
        raise Exception('network in not right!')
    model = model.cuda()

    cal_params_flops(model, 256, logger)

    print('#----------Prepareing loss, opt, sch and amp----------#')
    criterion = config.criterion
    optimizer = get_optimizer(config, model)
    scheduler = get_scheduler(config, optimizer)

    print('#----------Set other params----------#')
    min_loss = 999
    start_epoch = 1
    min_epoch = 1
    if os.path.exists(resume_model):
        print('#----------Resume Model and Other params----------#')
        checkpoint = torch.load(resume_model, map_location=torch.device('cpu'))
        model.load_state_dict(checkpoint['model_state_dict'])
        optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
        scheduler.load_state_dict(checkpoint['scheduler_state_dict'])
        saved_epoch = checkpoint['epoch']
        start_epoch += saved_epoch
        min_loss, min_epoch, loss = checkpoint['min_loss'], checkpoint['min_epoch'], checkpoint['loss']

        log_info = f'resuming model from {resume_model}. resume_epoch: {saved_epoch}, min_loss: {min_loss:.4f}, min_epoch: {min_epoch}, loss: {loss:.4f}'
        logger.info(log_info)
    if os.path.exists(weight_path):
        print('#----------Testing----------#')
        best_weight = torch.load(weight_path, map_location=torch.device('cpu'))
        model.load_state_dict(best_weight, strict=False)
        clear_folder(f"{current_directory}/predict_one")  # 在处理前清空输出文件夹

        loss = test_one_epoch_point3(
            val_loader,
            model,
            criterion,
            logger,
            config,
        )

    predict_image_path = f"{current_directory}/predict_one/predicted_image.jpg"
    return predict_image_path


def clear_folder(folder_path):
    """清空文件夹并重新创建同名空文件夹。"""
    if os.path.exists(folder_path):
        shutil.rmtree(folder_path)
    os.makedirs(folder_path)


class ImagePredictionApp:
    def __init__(self, root, config):
        self.root = root
        self.root.title("Image Prediction App")
        self.config = config

        self.upload_button = tk.Button(self.root, text="Upload Image", command=self.upload_image)
        self.upload_button.pack(pady=10)

        self.image_label = tk.Label(self.root)
        self.image_label.pack(pady=10)

    def upload_image(self):
        file_path = filedialog.askopenfilename(title="Select an Image",
                                               filetypes=[("Image files", "*.jpg *.jpeg *.png")])
        if file_path:
            predict_image_path = predict(file_path, self.config)
            if os.path.exists(predict_image_path):
                self.show_image(predict_image_path)
            else:
                messagebox.showerror("Error", "Failed to generate prediction image.")

    def show_image(self, image_path):
        image = Image.open(image_path)
        image.thumbnail((400, 400))  # 调整图像大小以适应窗口
        photo = ImageTk.PhotoImage(image)
        self.image_label.config(image=photo)
        self.image_label.image = photo


if __name__ == "__main__":
    root = tk.Tk()
    config = setting_config
    app = ImagePredictionApp(root, config)
    root.mainloop()

# import sys
# from PyQt5.QtWidgets import QApplication, QWidget, QLabel
#
# # 创建应用程序对象
# app = QApplication(sys.argv)
#
# # 创建主窗口
# window = QWidget()
# window.setWindowTitle('简单的PyQt示例')
# window.setGeometry(100, 100, 280, 80)
#
# # 创建标签
# label = QLabel('Hello, PyQt!', window)
# label.move(110, 40)
#
# # 显示窗口
# window.show()
#
# # 运行应用程序的主循环
# sys.exit(app.exec_())

# import tkinter as tk
#
# # 创建主窗口
# root = tk.Tk()
# root.title("简单的 Tkinter GUI")
#
# # 创建一个按钮
# button = tk.Button(root, text="点击我", command=lambda: print("按钮被点击了"))
# button.pack(pady=20)
#
# # 进入主循环
# root.mainloop()