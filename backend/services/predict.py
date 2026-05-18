import torch
import torch.nn as nn

from torchvision import transforms, models
from PIL import Image

# =========================
# CLASS NAMES
# =========================

class_names = [
    "class0_normal",
    "class1_acne",
    "class2_wrinkles",
    "class3_Eczema",
    "class4_Rosacea",
    "class5_dark_spots"
]

label_map = {
    "class0_normal": "Normal Skin",
    "class1_acne": "Acne",
    "class2_wrinkles": "Wrinkles",
    "class3_Eczema": "Eczema",
    "class4_Rosacea": "Rosacea",
    "class5_dark_spots": "Dark Spots"
}

treatment_data = {

    "Acne": {
        "severity": "Moderate",
        "tips": [
            "Wash face twice daily",
            "Avoid oily products",
            "Stay hydrated"
        ]
    },

    "Eczema": {
        "severity": "Moderate",
        "tips": [
            "Use moisturizer",
            "Avoid harsh soaps",
            "Keep skin hydrated"
        ]
    },

    "Rosacea": {
        "severity": "Mild",
        "tips": [
            "Avoid spicy food",
            "Use sunscreen",
            "Reduce stress"
        ]
    },

    "Wrinkles": {
        "severity": "Low",
        "tips": [
            "Use retinol products",
            "Stay hydrated",
            "Apply sunscreen"
        ]
    },

    "Dark Spots": {
        "severity": "Low",
        "tips": [
            "Use Vitamin C serum",
            "Avoid sun exposure",
            "Use SPF daily"
        ]
    },

    "Normal Skin": {
        "severity": "None",
        "tips": [
            "Maintain skincare routine",
            "Use sunscreen",
            "Stay hydrated"
        ]
    }
}
# =========================
# LOAD MODEL
# =========================

model = models.resnet18(pretrained=False)

num_features = model.fc.in_features

model.fc = nn.Linear(
    num_features,
    len(class_names)
)

# Load trained weights
model.load_state_dict(
    torch.load(
        "../ai/model/skin_model.pth",
        map_location=torch.device("cpu")
    )
)

model.eval()

# =========================
# IMAGE TRANSFORMS
# =========================

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# =========================
# PREDICTION FUNCTION
# =========================

def predict_skin_disease(image_path):

    image = Image.open(image_path).convert("RGB")

    image = transform(image)

    image = image.unsqueeze(0)

    with torch.no_grad():

        outputs = model(image)

        probabilities = torch.nn.functional.softmax(
            outputs[0],
            dim=0
        )

        confidence, predicted = torch.max(
            probabilities,
            0
        )

    raw_label = class_names[predicted.item()]
 
    disease = label_map[raw_label]

    return {
    "disease": disease,
    "confidence": round(confidence.item() * 100, 2),
    "severity": treatment_data[disease]["severity"],
    "tips": treatment_data[disease]["tips"]
}