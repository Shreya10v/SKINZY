from flask import Blueprint, request, jsonify
import os

from services.cloudinary_service import upload_to_cloudinary

upload_bp = Blueprint("upload", __name__)

UPLOAD_FOLDER = "temp"

@upload_bp.route("/upload", methods=["POST"])
def upload_image():

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files["image"]

    if image.filename == "":
        return jsonify({"error": "No selected image"}), 400

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    image_path = os.path.join(UPLOAD_FOLDER, image.filename)

    image.save(image_path)

    # Upload image to cloudinary
    image_url = upload_to_cloudinary(image_path)

    return jsonify({
        "message": "Image uploaded successfully",
        "image_url": image_url
    })