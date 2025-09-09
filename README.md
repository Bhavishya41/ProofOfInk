# 🖋️ ProofOfInk

**Advanced Signature Verification System with HOG Analysis**

A modern, full-stack application that uses computer vision and machine learning to verify signature authenticity. Built with a sleek monochrome design and powered by React + Flask.

![ProofOfInk Demo](https://img.shields.io/badge/Status-Ready-brightgreen) ![Python](https://img.shields.io/badge/Python-3.x-blue) ![React](https://img.shields.io/badge/React-18.x-61DAFB) ![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌟 Features

- **🔍 Advanced Analysis**: Uses Histogram of Oriented Gradients (HOG) for signature feature extraction
- **🎯 High Accuracy**: Structural Similarity Index (SSIM) for precise matching
- **🎨 Modern UI**: Clean monochrome design with electric blue accents
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile
- **🖱️ Drag & Drop**: Intuitive file upload with preview
- **⚡ Real-time**: Instant verification results with visual feedback
- **🔬 HOG Visualization**: See the actual feature analysis process

## 🛠️ Tech Stack

### Backend
- **Flask** - Python web framework
- **OpenCV** - Computer vision library
- **scikit-image** - Image processing algorithms
- **NumPy** - Numerical computing
- **Matplotlib** - Visualization

### Frontend
- **React 18** - Modern JavaScript library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **JavaScript (ES6+)** - No TypeScript complexity

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- Node.js 16+
- npm or yarn

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Signature_Verification_System-main
```

### 2. Backend Setup
```bash
# Install Python dependencies
pip install flask flask-cors opencv-python numpy scikit-image matplotlib

# Start Flask server
python app.py
```
The backend will run on `http://127.0.0.1:5000`

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
ProofOfInk/
├── 📁 frontend/                 # React frontend
│   ├── 📁 public/              # Static assets
│   │   └── favicon.svg         # Custom favicon
│   ├── 📁 src/
│   │   ├── 📁 components/      # React components
│   │   │   ├── SignatureUpload.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   └── HogImages.jsx
│   │   ├── 📁 lib/
│   │   │   └── api.js          # Backend API calls
│   │   ├── App.jsx             # Main application
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── package.json
│   ├── tailwind.config.cjs
│   └── vite.config.js
├── 📁 Signature_imgs copy/      # Sample signature images
├── 📁 static/                   # Legacy static files
├── 📁 templates/                # Legacy HTML templates
├── app.py                       # Flask backend server
└── README.md                    # This file
```

## 🎯 How It Works

### 1. **Image Upload**
- Users upload two signature images via drag & drop or file picker
- Images are validated and previewed in real-time

### 2. **Feature Extraction**
- Images are resized to 300x200 pixels for consistency
- Converted to grayscale for analysis
- HOG (Histogram of Oriented Gradients) features are extracted
- HOG visualizations are generated using plasma colormap

### 3. **Similarity Analysis**
- SSIM (Structural Similarity Index) compares HOG features
- Similarity score calculated as percentage
- Threshold: >90% = Match, <90% = No Match

### 4. **Results Display**
- Color-coded results (green = match, red = no match)
- Similarity percentage shown
- HOG analysis images displayed for transparency

## 🎨 Design System

### Color Palette
- **Background**: Dark gradient (`#0A0A0A` to `#262626`)
- **Container**: Light gray (`#FAFAFA`) with subtle borders
- **Text**: Monochrome scale from `#F5F5F5` to `#0A0A0A`
- **Accent**: Electric blue (`#0284C7` to `#0EA5E9`)
- **Success**: Green (`#22C55E`)
- **Error**: Red (`#EF4444`)

### Typography
- **Font**: System fonts with sans-serif fallback
- **Headers**: Bold, uppercase with letter spacing
- **Body**: Medium weight for readability

## 🔧 Configuration

### Environment Variables
Create `.env.local` in the `frontend/` directory:
```env
VITE_API_BASE_URL=http://127.0.0.1:5000
```

### Backend Configuration
The Flask server runs in debug mode by default. For production:
```python
if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)
```

## 📸 Screenshots

### Main Interface
- Clean monochrome design
- Drag & drop signature upload areas
- Professional verification button

### Results View
- Color-coded match/no-match results
- Similarity percentage display
- HOG analysis visualization

## 🔬 Algorithm Details

### HOG (Histogram of Oriented Gradients)
- **Cell Size**: 16x16 pixels
- **Block Size**: 1x1 cells
- **Visualization**: Plasma colormap for better contrast

### SSIM (Structural Similarity Index)
- **Range**: 0.0 to 1.0
- **Threshold**: 0.9 (90%) for positive match
- **Data Range**: Automatically calculated from feature arrays

## 🚀 Deployment

### Frontend (Vite Build)
```bash
cd frontend
npm run build
# Serves static files from dist/
```

### Backend (Flask Production)
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Docker (Optional)
```dockerfile
# Example Dockerfile structure
FROM python:3.9-slim
# Copy backend files and install dependencies
FROM node:18-alpine
# Build frontend and serve static files
```

## 📝 API Documentation

### POST `/verify`
Verifies two signature images and returns similarity analysis.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: 
  - `signature1`: Image file
  - `signature2`: Image file

**Response:**
```json
{
  "similarity_score": 0.85,
  "hog_image1": "base64_encoded_image",
  "hog_image2": "base64_encoded_image"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenCV** for computer vision capabilities
- **scikit-image** for advanced image processing
- **React** for the modern frontend framework
- **Tailwind CSS** for the utility-first styling
- **Vite** for the lightning-fast development experience

## 👨‍💻 Author

**Bhavishya Jain**
- Built with ❤️ using React + Tailwind
- Monochrome theme design

---

<div align="center">
  <strong>ProofOfInk - Verify with Confidence</strong>
  <br>
  <em>Advanced signature verification made simple</em>
</div>
