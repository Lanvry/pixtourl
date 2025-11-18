import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faLink, faCopy } from '@fortawesome/free-solid-svg-icons';

const QuickUpload = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        // Simulate URL generation
        setImageUrl(`https://imghost.pro/${Date.now()}-${file.name}`);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(imageUrl);
    alert('URL copied to clipboard!');
  };

  return (
    <div className="quick-upload cursor-target">
      <div className="upload-area">
        <div className="upload-content">
          <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
          <h3>Upload Your Image</h3>
          <p>Drag & drop or click to upload</p>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileUpload}
            className="file-input"
          />
        </div>
      </div>

      {uploadedImage && (
        <div className="upload-result">
          <div className="image-preview">
            <img src={uploadedImage} alt="Uploaded preview" />
          </div>
          <div className="url-section">
            <div className="url-display">
              <FontAwesomeIcon icon={faLink} />
              <input 
                type="text" 
                value={imageUrl} 
                readOnly 
                className="url-input"
              />
              <button onClick={copyToClipboard} className="copy-btn">
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </div>
            <div className="url-actions">
              <button className="btn-primary">Share</button>
              <button className="btn-secondary">Edit</button>
              <button className="btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickUpload;