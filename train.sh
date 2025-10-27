# ==========================================
# Branch 1 Training Script
# workdir: results for saving models and logs
# data_path: path to the training dataset
# ==========================================
# python train_branch1.py \
#    --batch_size 8 \
#    --gpu_id "3" \
#    --epochs 200 \
#    --work_dir "./result_branch1/" \
#    --data_path "./data/vessel/"

# ==========================================
# Branch 2 Training Script
# workdir: results for saving models and logs important!!! Different path from branch1
# data_path: path to the training dataset
# medsam_path: path to the checkpoint of MedSAM
# branch1_model_path: path to the checkpoint of Branch 1 Pure-VM-UNet
# ==========================================
python train_branch2.py \
    --batch_size 4 \
    --gpu_id "3" \
    --epochs 5 \
    --work_dir "./result_branch2/" \
    --data_path "./data/vessel/" \
    --medsam_path "./pre_trained_weights/medsam_vit_b.pth" \
    --branch1_model_path "./result_branch1/checkpoints/best-epoch160-loss0.2211.pth"