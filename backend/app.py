from flask import Flask
from flask_cors import CORS

from routes.test import test_bp
from routes.upload import upload_bp

app = Flask(__name__)
CORS(app)

# Register Routes
app.register_blueprint(test_bp, url_prefix="/api")
app.register_blueprint(upload_bp, url_prefix="/api")

@app.route("/")
def home():
    return {"message": "Backend Running"}

if __name__ == "__main__":
    app.run(debug=True)