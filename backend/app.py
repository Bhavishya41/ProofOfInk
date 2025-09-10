from flask import Flask, request, jsonify, render_template, send_from_directory
import cv2
import numpy as np
from skimage.metrics import structural_similarity as ssim
from skimage.feature import hog
import base64
import matplotlib.pyplot as plt
from io import BytesIO

from flask_cors import CORS
import os
app = Flask(__name__)
# Enable CORS so the React dev server can access this API
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/signature_imgs/<path:filename>')
def signature_imgs(filename):
    # Serve files from the 'Signature_imgs copy' directory
    base_dir = os.path.dirname(os.path.abspath(__file__))
    img_dir = os.path.join(base_dir, 'Signature_imgs copy')
    return send_from_directory(img_dir, filename)

def calculate_similarity(signature1, signature2):
    # Resize the signature images to a fixed size for consistency
    resized_signature1 = cv2.resize(signature1, (300, 200))
    resized_signature2 = cv2.resize(signature2, (300, 200))

    # Convert the images to grayscale
    gray_signature1 = cv2.cvtColor(resized_signature1, cv2.COLOR_BGR2GRAY)
    gray_signature2 = cv2.cvtColor(resized_signature2, cv2.COLOR_BGR2GRAY)

    # Calculate Histogram of Oriented Gradients (HOG) features for both signatures
    features1, hog_image1 = hog(gray_signature1, pixels_per_cell=(16, 16), cells_per_block=(1, 1), visualize=True)
    features2, hog_image2 = hog(gray_signature2, pixels_per_cell=(16, 16), cells_per_block=(1, 1), visualize=True)

    # Apply colormap to HOG images
    hog_image1_colored = plt.cm.plasma(hog_image1)
    hog_image2_colored = plt.cm.plasma(hog_image2)

    # Encode HOG images to base64 strings
    hog_image1_str = image_to_base64(hog_image1_colored)
    hog_image2_str = image_to_base64(hog_image2_colored)

    # Calculate the Structural Similarity Index (SSIM) between the two HOG features
    # Use the combined data range of both feature arrays
    data_range = max(features1.max(), features2.max()) - min(features1.min(), features2.min())
    similarity_score = ssim(features1, features2, data_range=data_range)

    return similarity_score, hog_image1_str, hog_image2_str

def image_to_base64(image):
    buffer = BytesIO()
    plt.imsave(buffer, image, format='jpeg')
    buffer.seek(0)
    return base64.b64encode(buffer.getvalue()).decode()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/verify', methods=['POST'])
def verify_signatures():
    signature1 = request.files['signature1']
    signature2 = request.files['signature2']
    
    if not signature1 or not signature2:
        return jsonify({'error': 'Please upload both signatures.'}), 400
    
    # Read the uploaded signature images
    signature1_img = cv2.imdecode(np.frombuffer(signature1.read(), np.uint8), cv2.IMREAD_COLOR)
    signature2_img = cv2.imdecode(np.frombuffer(signature2.read(), np.uint8), cv2.IMREAD_COLOR)

    # Calculate the similarity score between the two signatures and get HOG images
    similarity_score, hog_image1_str, hog_image2_str = calculate_similarity(signature1_img, signature2_img)
    
    return jsonify({'similarity_score': similarity_score, 'hog_image1': hog_image1_str, 'hog_image2': hog_image2_str}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10000))
    app.run(host='0.0.0.0', port=port, debug=False)

