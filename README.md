# 🩺 AI Skin Disease Prediction System

An AI-powered web application that predicts skin diseases from uploaded skin images using Deep Learning. The system combines a Convolutional Neural Network (CNN) with a modern web interface to provide fast and accessible preliminary skin disease analysis.

> **Disclaimer:** This application is intended for educational and research purposes only. It is not a substitute for professional medical advice or diagnosis.

---

## 📌 Features

- 🤖 AI-based skin disease prediction using a CNN model
- 📷 Upload skin images for instant analysis
- ⚡ Fast and accurate preliminary predictions
- 👤 Secure user authentication
- 🖥️ Responsive and user-friendly interface
- 🖼️ Image preprocessing using OpenCV
- ☁️ Secure image storage
- 📊 Prediction history management

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- Flask
- Python

### AI/ML
- TensorFlow
- Keras
- Convolutional Neural Network (CNN)

### Image Processing
- OpenCV
- Pillow
- TorchVision

### Database & Storage
- MongoDB
- Firebase Storage

### Authentication
- Firebase Authentication

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 🏗️ System Workflow

1. User registers or logs in.
2. User uploads a skin image.
3. Image is preprocessed using OpenCV.
4. The trained CNN model analyzes the image.
5. The system predicts the skin disease.
6. Prediction results are displayed to the user.
7. Prediction history and image information are stored securely.

---

## 📂 Project Structure

```
Skin-Disease-Prediction/
│
├── frontend/          # React application
├── backend/           # Flask APIs
├── model/             # Trained AI model
├── uploads/           # Uploaded images
├── static/            # Static assets
├── requirements.txt
├── README.md
└── .gitignore
```

---

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/your-username/skin-disease-prediction.git
cd skin-disease-prediction
```

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📸 How It Works

- Upload a skin image.
- The image is resized and preprocessed.
- The CNN model extracts features and predicts the disease.
- The prediction result is displayed along with confidence information.

---

## 🎯 Future Enhancements

- Mobile application support
- Real-time camera scanning
- More skin disease categories
- Doctor consultation integration
- Improved prediction accuracy using advanced deep learning models

---

## 👨‍💻 Contributors

- Shreya Vishwakarma – Frontend Development & AI Integration
- Shivika Bhawsar – Backend Development, Testing

---

## 📄 License

This project is developed for educational purposes.
