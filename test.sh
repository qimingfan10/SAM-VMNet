# ==========================================
# Branch 1 Testing Script
# data_path: path to the training dataset
# pretrained_weight: checkpoint of the branch1 pure VM-UNet
# output_dir: path to the prediction of test set
# ==========================================
python test.py \
    --data_path "./data/vessel/" \
    --pretrained_weight "./result_branch1/checkpoints/best-epoch160-loss0.2211.pth" \
    --device "cuda:7" \
    --output_dir "./data/vessel/test"