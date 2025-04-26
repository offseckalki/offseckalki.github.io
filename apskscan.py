from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from androguard.core.apk import APK
import os
import random

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'apk'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def analyze_apk(filepath):
    try:
        a = APK(filepath)

        # Extract permissions
        permissions = a.get_permissions()
        dangerous_permissions = [
            "android.permission.READ_SMS",
            "android.permission.RECEIVE_SMS",
            "android.permission.READ_CONTACTS",
            "android.permission.RECORD_AUDIO",
            "android.permission.CAMERA",
            "android.permission.ACCESS_FINE_LOCATION",
            "android.permission.INTERNET",
            "android.permission.READ_PHONE_STATE",
            "android.permission.WRITE_EXTERNAL_STORAGE"
        ]
        
        unnecessary_permissions = [p for p in permissions if p in dangerous_permissions]

        # AI-driven probability (Placeholder - Replace with real analysis)
        malicious_probability = round(random.uniform(0.1, 0.9), 2)

        # Suspicious code detection
        suspicious_code_patterns = [
            "exec(", "os.system(", "subprocess.popen(", "dexClassLoader",
            "Runtime.getRuntime().exec(", "Base64.decode(", "Cipher.getInstance("
        ]
        suspicious_code = [pattern for pattern in suspicious_code_patterns if pattern in str(a.get_dex())]

        reasons = []
        if malicious_probability > 0.5:
            reasons.append("App contains high-risk permissions.")
        if suspicious_code:
            reasons.append("App has suspicious execution commands.")

        return {
            "filename": os.path.basename(filepath),
            "probability_malicious": malicious_probability,
            "unnecessary_permissions": unnecessary_permissions,
            "suspicious_code": suspicious_code,
            "reasons": reasons
        }
    
    except Exception as e:
        return {"error": f"Error analyzing APK: {str(e)}"}

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        return jsonify({"message": "File uploaded successfully", "filename": filename}), 200

    return jsonify({"error": "Invalid file type"}), 400

@app.route('/scan', methods=['POST'])
def scan_apk():
    data = request.json
    filename = data.get("filename")

    if not filename:
        return jsonify({"error": "Filename required"}), 400

    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    if not os.path.exists(filepath):
        return jsonify({"error": "File not found"}), 400

    scan_results = analyze_apk(filepath)

    return jsonify(scan_results), 200

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
