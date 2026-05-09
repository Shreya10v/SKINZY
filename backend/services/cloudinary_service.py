import cloudinary
import cloudinary.uploader
import os

from dotenv import load_dotenv

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET")
)

def upload_to_cloudinary(image_path):

    result = cloudinary.uploader.upload(image_path)

    return result["secure_url"]