from torch.utils.data import Dataset
import numpy as np
import os
from PIL import Image
import sys
# 获取当前文件的绝对路径
current_file_path = os.path.abspath(__file__)

# 获取当前文件所在的目录
current_directory = os.path.dirname(current_file_path)

# 获取上一级目录
parent_directory = os.path.dirname(current_directory)
grandparent_directory = os.path.dirname(parent_directory)
print("当前文件的绝对路径:", current_file_path)
print("当前文件所在的目录:", current_directory)
print("上一级目录:", parent_directory)
print("上上级目录:", grandparent_directory)
sys.path.append(f"{grandparent_directory}/MedSAM-main")
from medsam import *
from medsam_point import *
import random
import h5py
import torch
from scipy import ndimage
from scipy.ndimage.interpolation import zoom
from torch.utils.data import Dataset
from scipy import ndimage
from PIL import Image


class NPY_datasets(Dataset):
    def __init__(self, path_Data, path_Features, config, train=True):
        super(NPY_datasets, self)
        if train:
            images_list = sorted(os.listdir(path_Data + 'train/images/'))
            masks_list = sorted(os.listdir(path_Data + 'train/masks/'))
            features_dir = f'{grandparent_directory}/MedSAM-main/train_tezhengxiangliang'
            features_list = sorted(os.listdir(features_dir))
            self.data = []
            for i in range(len(images_list)):
                img_path = path_Data + 'train/images/' + images_list[i]
                msk_path = path_Data + 'train/masks/' + masks_list[i]
                feature_path = os.path.join(path_Features, features_dir, features_list[i])
                self.data.append((img_path, msk_path, feature_path))
                ###########注意这里用的是test的方法，不然出来的就是有旋转的#############
            self.transformer = config.train_transformer
        else:
            images_list = sorted(os.listdir(path_Data + 'val/images/'))
            masks_list = sorted(os.listdir(path_Data + 'val/masks/'))
            features_dir = f'{grandparent_directory}/MedSAM-main/train_tezhengxiangliang'
            features_list = sorted(os.listdir(features_dir))
            self.data = []
            for i in range(len(images_list)):
                img_path = path_Data + 'val/images/' + images_list[i]
                mask_path = path_Data + 'val/masks/' + masks_list[i]
                feature_path = os.path.join(path_Features, features_dir, features_list[i])
                self.data.append((img_path, mask_path, feature_path))
            self.transformer = config.test_transformer

    def __getitem__(self, indx):
        try:
            img_path, msk_path, feature_path = self.data[indx]
            img = np.array(Image.open(img_path).convert('RGB'))
            msk = np.expand_dims(np.array(Image.open(msk_path).convert('L')), axis=2) / 255
            feature = torch.load(feature_path)  # 加载特征向量
            if self.transformer is not None:
                img, msk = self.transformer((img, msk))
                feature = feature.to('cpu')
            return img, msk, feature  # 返回图像、掩码和特征向量
        except:
            img_path, msk_path = self.data[indx]
            img = np.array(Image.open(img_path).convert('RGB'))
            msk = np.expand_dims(np.array(Image.open(msk_path).convert('L')), axis=2) / 255
            
            if self.transformer is not None:
                img, msk = self.transformer((img, msk))

            return img, msk


    def __len__(self):
        return len(self.data)
# class NPY_datasets(Dataset):
#     def __init__(self, path_Data, path_Features, config, train=True):
#         # 注意这里添加了 path_Features 参数来指定特征向量的路径
#         super(NPY_datasets, self).__init__()  # 调用父类的初始化方法
#         self.train = train
#         self.transformer = config.train_transformer if train else config.test_transformer
#         images_dir = 'train/images/' if train else 'val/images/'
#         masks_dir = 'train/masks/' if train else 'val/masks/'
#         features_dir = '/tmp/pycharm_project_859/MedSAM-main/tezhengxiangliang'
#
#         images_list = sorted(os.listdir(path_Data + images_dir))
#         masks_list = sorted(os.listdir(path_Data + masks_dir))
#         features_list = sorted(os.listdir(features_dir))
#
#         self.data = []
#         for img_file, msk_file, feature_file in zip(images_list, masks_list, features_list):
#             img_path = os.path.join(path_Data, images_dir, img_file)
#             msk_path = os.path.join(path_Data, masks_dir, msk_file)
#             feature_path = os.path.join(path_Features, features_dir, feature_file)
#             self.data.append((img_path, msk_path, feature_path))
#
#     def __getitem__(self, indx):
#         img_path, msk_path, feature_path = self.data[indx]
#         img = np.array(Image.open(img_path).convert('RGB'))
#         msk = np.expand_dims(np.array(Image.open(msk_path).convert('L')), axis=2) / 255
#         feature = torch.load(feature_path)  # 加载特征向量
#         print("最初始的feature shape是：", feature.shape)
#
#         if self.transformer is not None:
#             img, msk = self.transformer((img, msk))
#             # 如果有必要，也可以对特征向量应用变换
#             # feature = ...
#
#         return img, msk, feature  # 返回图像、掩码和特征向量
#
#     def __len__(self):
#         return len(self.data)

def random_rot_flip(image, label):
    k = np.random.randint(0, 4)
    image = np.rot90(image, k)
    label = np.rot90(label, k)
    axis = np.random.randint(0, 2)
    image = np.flip(image, axis=axis).copy()
    label = np.flip(label, axis=axis).copy()
    return image, label


def random_rotate(image, label):
    angle = np.random.randint(-20, 20)
    image = ndimage.rotate(image, angle, order=0, reshape=False)
    label = ndimage.rotate(label, angle, order=0, reshape=False)
    return image, label


class RandomGenerator(object):
    def __init__(self, output_size):
        self.output_size = output_size

    def __call__(self, sample):
        image, label = sample['image'], sample['label']

        if random.random() > 0.5:
            image, label = random_rot_flip(image, label)
        elif random.random() > 0.5:
            image, label = random_rotate(image, label)
        x, y = image.shape
        if x != self.output_size[0] or y != self.output_size[1]:
            image = zoom(image, (self.output_size[0] / x, self.output_size[1] / y), order=3)  # why not 3?
            label = zoom(label, (self.output_size[0] / x, self.output_size[1] / y), order=0)
        image = torch.from_numpy(image.astype(np.float32)).unsqueeze(0)
        label = torch.from_numpy(label.astype(np.float32))
        sample = {'image': image, 'label': label.long()}
        return sample


class Synapse_dataset(Dataset):
    def __init__(self, base_dir, list_dir, split, transform=None):
        self.transform = transform  # using transform in torch!
        self.split = split
        self.sample_list = open(os.path.join(list_dir, self.split + '.txt')).readlines()
        self.data_dir = base_dir

    def __len__(self):
        return len(self.sample_list)

    def __getitem__(self, idx):
        if self.split == "train":
            slice_name = self.sample_list[idx].strip('\n')
            data_path = os.path.join(self.data_dir, slice_name + '.npz')
            data = np.load(data_path)
            image, label = data['image'], data['label']
        else:
            vol_name = self.sample_list[idx].strip('\n')
            filepath = self.data_dir + "/{}.npy.h5".format(vol_name)
            data = h5py.File(filepath)
            image, label = data['image'][:], data['label'][:]

        sample = {'image': image, 'label': label}
        if self.transform:
            sample = self.transform(sample)
        sample['case_name'] = self.sample_list[idx].strip('\n')
        return sample

