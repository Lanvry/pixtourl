import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCopy,
  faSpinner,
  faArrowLeft,
  faCloudUpload,
  faFileImage,
  faUpload
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import GlassSurface from "../components/GlassSurface";
import Aurora from "../components/Aurora";
import TargetCursor from "../components/TargetCursor";
import "../css/Upload.css";
import LightRays from "../components/LightRays";

function Upload() {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Ambil files dari state navigation atau localStorage
    if (location.state?.files) {
      setFiles(location.state.files);
    } else {
      // Fallback ke localStorage
      const savedFiles = localStorage.getItem("tempUploadedFiles");
      if (savedFiles) {
        setFiles(JSON.parse(savedFiles));
      }
    }
  }, [location.state]);

  // Handle file selection
  const handleFileSelect = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles).map(file => ({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      data: URL.createObjectURL(file)
    }));
    
    setFiles(fileArray);
    localStorage.setItem("tempUploadedFiles", JSON.stringify(fileArray));
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileSelect(droppedFiles);
    }
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 0) {
      handleFileSelect(selectedFiles);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Simulasi proses upload ke storage
  const handleUploadToStorage = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const uploaded = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Simulasi progress
        await new Promise((resolve) => {
          const interval = setInterval(() => {
            setUploadProgress((prev) => {
              const newProgress = prev + (100 / files.length) * 0.1;
              if (newProgress >= ((i + 1) / files.length) * 100) {
                clearInterval(interval);
                resolve();
                return ((i + 1) / files.length) * 100;
              }
              return newProgress;
            });
          }, 100);
        });

        // Simpan ke localStorage (ganti dengan API call di production)
        const imageData = {
          id: Date.now() + i,
          name: file.name,
          type: file.type,
          size: file.size,
          url: file.data, // base64 URL
          uploadedAt: new Date().toISOString(),
          shareableUrl: `https://myapp.com/image/${Date.now() + i}`,
        };

        // Simpan ke permanent storage
        const existingImages = JSON.parse(
          localStorage.getItem("uploadedImages") || "[]"
        );
        const updatedImages = [...existingImages, imageData];
        localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));

        uploaded.push(imageData);
      }

      setUploadedUrls(uploaded);

      // Hapus temporary files
      localStorage.removeItem("tempUploadedFiles");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading files. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      alert("URL copied to clipboard!");
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  // Drag and Drop Section Component
  const DragDropSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="drag-drop-section"
    >
      <div className="drag-drop-container">
        <motion.div
          className={`drop-zone ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="drop-zone-content">
            <motion.div
              className="upload-icon"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FontAwesomeIcon icon={faCloudUpload} />
            </motion.div>
            <h3>Drag & Drop Your Images Here</h3>
            <p>Supported formats: JPG, PNG, GIF, WEBP</p>
            <p className="drop-subtitle">or</p>
            <GlassSurface className="browse-btn cursor-target">
              <FontAwesomeIcon icon={faFileImage} />
              Browse Files
            </GlassSurface>
          </div>
        </motion.div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />

        {/* Features */}
        <div className="upload-features">
          <div className="feature">
            <FontAwesomeIcon icon={faCheckCircle} className="feature-icon" />
            <span>Unlimited uploads</span>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon={faCheckCircle} className="feature-icon" />
            <span>Secure storage</span>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon={faCheckCircle} className="feature-icon" />
            <span>Instant sharing</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <div className="AuroraUpload">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>
      <div className="upload-page">
        <div className="upload-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="upload-header"
          >
            <GlassSurface
              width={"fit-content"}
              height={"fit-content"}
              className="back-btn cursor-target"
            >
              <a onClick={goBack}>
                <FontAwesomeIcon
                  style={{ margin: "0 5px" }}
                  icon={faArrowLeft}
                />
                Back
              </a>
            </GlassSurface>
            <h1>Upload Your Images</h1>
            <p>
              {files.length > 0 
                ? `Ready to upload ${files.length} image(s)`
                : 'Select images to get started'
              }
            </p>
          </motion.div>

          {/* Show Drag & Drop if no files, otherwise show previews */}
          {files.length === 0 ? (
            <DragDropSection />
          ) : (
            <>
              {/* File Previews */}
              <div className="file-previews">
                {files.map((file, index) => (
                  <motion.div
                    key={index}
                    className="file-preview"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <img src={file.data} alt={file.name} />
                    <div className="file-info">
                      <h4>{file.name}</h4>
                      <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Upload Button */}
              {!uploading && uploadedUrls.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="upload-actions"
                >
                  <GlassSurface
                    className="upload-btn-home cursor-target"
                    onClick={handleUploadToStorage}
                  >
                    <FontAwesomeIcon icon={faCloudUpload} />
                    Upload {files.length} Image(s)
                  </GlassSurface>
                </motion.div>
              )}

              {/* Progress Bar */}
              {uploading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="upload-progress"
                >
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p>Uploading... {Math.round(uploadProgress)}%</p>
                </motion.div>
              )}

              {/* Results */}
              {uploadedUrls.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="upload-results"
                >
                  <div className="success-message">
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <h2>Upload Successful!</h2>
                    <p>Your images have been uploaded and are ready to share.</p>
                  </div>

                  <div className="url-list">
                    {uploadedUrls.map((image, index) => (
                      <div key={image.id} className="url-item">
                        <div className="url-info">
                          <span className="url-number">{index + 1}.</span>
                          <span className="url-link">{image.shareableUrl}</span>
                        </div>
                        <GlassSurface
                          className="copy-btn"
                          onClick={() => copyToClipboard(image.shareableUrl)}
                        >
                          <FontAwesomeIcon icon={faCopy} />
                          Copy
                        </GlassSurface>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Upload;