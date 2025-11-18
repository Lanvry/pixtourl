import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCloudDownloadAlt,
  faCopy,
  faEye,
  faTrash,
  faShare,
  faEllipsisV,
  faFilter,
  faCheck,
  faSort,
  faTimes,
  faUpload,
  faLink
} from '@fortawesome/free-solid-svg-icons';
import '../../css/dash/MyImages.css';

const MyImages = () => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterType, setFilterType] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // Data storage
  const storageData = {
    used: 4.2,
    total: 10,
    percentage: 42,
    images: 1284,
    bandwidth: 156
  };

  // Sample images data
  const images = [
    {
      id: 1,
      name: 'mountain-landscape.jpg',
      url: 'https://pixtourl.com/abc123-mountain-landscape.jpg',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      size: '2.4 MB',
      dimensions: '1920x1080',
      views: 1247,
      uploaded: '2024-01-15',
      type: 'jpg'
    },
    {
      id: 2,
      name: 'portrait-photo.png',
      url: 'https://pixtourl.com/def456-portrait-photo.png',
      thumbnail: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop',
      size: '1.8 MB',
      dimensions: '1200x1600',
      views: 856,
      uploaded: '2024-01-14',
      type: 'png'
    },
    {
      id: 3,
      name: 'product-shot.jpg',
      url: 'https://pixtourl.com/ghi789-product-shot.jpg',
      thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      size: '3.1 MB',
      dimensions: '2500x1667',
      views: 2103,
      uploaded: '2024-01-13',
      type: 'jpg'
    },
    {
      id: 4,
      name: 'abstract-design.png',
      url: 'https://pixtourl.com/jkl012-abstract-design.png',
      thumbnail: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&h=300&fit=crop',
      size: '1.2 MB',
      dimensions: '1600x1200',
      views: 542,
      uploaded: '2024-01-12',
      type: 'png'
    },
    {
      id: 5,
      name: 'city-skyline.jpg',
      url: 'https://pixtourl.com/mno345-city-skyline.jpg',
      thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop',
      size: '4.2 MB',
      dimensions: '3000x2000',
      views: 1895,
      uploaded: '2024-01-11',
      type: 'jpg'
    },
    {
      id: 6,
      name: 'nature-wildlife.jpg',
      url: 'https://pixtourl.com/pqr678-nature-wildlife.jpg',
      thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      size: '2.8 MB',
      dimensions: '2400x1600',
      views: 967,
      uploaded: '2024-01-10',
      type: 'jpg'
    }
  ];

  // Upload Functions
  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const handleCloseModal = () => {
    setShowUploadModal(false);
    setUploadedFiles([]);
    setIsDragging(false);
  };

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
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      alert('Please select image files only.');
      return;
    }

    const newFiles = imageFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.name.split('.').pop().toLowerCase(),
      url: URL.createObjectURL(file),
      status: 'uploading'
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload process
    newFiles.forEach((fileObj, index) => {
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === fileObj.id 
              ? { ...f, status: 'completed', url: `https://pixtourl.com/${Date.now()}-${f.name}` }
              : f
          )
        );
      }, 1000 + (index * 500));
    });
  };

  const removeUploadedFile = (id) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  const getFileIcon = (type) => {
    return type.toUpperCase();
  };

  const getProgressBarColor = (percentage) => {
    if (percentage < 50) return '#2ed573';
    if (percentage < 80) return '#ffa502';
    return '#ff4757';
  };

  return (
    <div className="my-images-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1>My Images</h1>
          <p>Manage and organize your uploaded images</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={handleUploadClick}>
            <FontAwesomeIcon icon={faCloudDownloadAlt} />
            Upload New
          </button>
        </div>
      </div>

      {/* Storage Card */}
      <div className="storage-card">
        <div className="storage-header">
          <h3>Storage Overview</h3>
          <div className="storage-stats">
            <span className="storage-used">{storageData.used} GB</span>
            <span className="storage-total">of {storageData.total} GB used</span>
          </div>
        </div>
        
        <div className="progress-container">
          <div 
            className="progress-bar"
            style={{
              width: `${storageData.percentage}%`,
              backgroundColor: getProgressBarColor(storageData.percentage)
            }}
          ></div>
        </div>
        
        <div className="storage-details">
          <div className="storage-metric">
            <span className="metric-value">{storageData.images}</span>
            <span className="metric-label">Images</span>
          </div>
          <div className="storage-metric">
            <span className="metric-value">{storageData.bandwidth} GB</span>
            <span className="metric-label">Bandwidth</span>
          </div>
          <div className="storage-metric">
            <span className="metric-value">{storageData.percentage}%</span>
            <span className="metric-label">Used</span>
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="filters-bar">
        <div className="filters-left">
          <div className="filter-group">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name</option>
              <option value="size">Size</option>
              <option value="views">Most Views</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Filter:</label>
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Images</option>
              <option value="jpg">JPG</option>
              <option value="png">PNG</option>
              <option value="gif">GIF</option>
            </select>
          </div>
        </div>
        
        <div className="filters-right">
          <button className="filter-btn">
            <FontAwesomeIcon icon={faFilter} />
            Filters
          </button>
          <button className="filter-btn">
            <FontAwesomeIcon icon={faSort} />
            Sort
          </button>
        </div>
      </div>

      {/* Images Grid */}
      <div className="images-grid">
        {images.map((image) => (
          <div key={image.id} className="image-item-card">
            <div className="image-card-header">
              <div className="file-type-badge">
                {getFileIcon(image.type)}
              </div>
              <div className="image-card-actions">
                <button className="image-action-btn">
                  <FontAwesomeIcon icon={faEllipsisV} />
                </button>
              </div>
            </div>
            
            <div className="image-thumbnail">
              <img src={image.thumbnail} alt={image.name} />
              <div className="image-thumbnail-overlay">
                <button 
                  className="thumbnail-action-btn"
                  onClick={() => copyUrl(image.url)}
                  title="Copy URL"
                >
                  <FontAwesomeIcon icon={faCopy} />
                </button>
                <button className="thumbnail-action-btn" title="Preview">
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button className="thumbnail-action-btn" title="Share">
                  <FontAwesomeIcon icon={faShare} />
                </button>
                <button className="thumbnail-action-btn delete" title="Delete">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
            
            <div className="image-card-body">
              <h4 className="image-item-title" title={image.name}>
                {image.name.length > 20 ? image.name.substring(0, 20) + '...' : image.name}
              </h4>
              
              <div className="image-url-container">
                <span className="image-url-text" title={image.url}>
                  {image.url.replace('https://', '').substring(0, 25)}...
                </span>
                <button 
                  className="copy-image-url-btn"
                  onClick={() => copyUrl(image.url)}
                  title="Copy URL"
                >
                  <FontAwesomeIcon icon={faCopy} />
                </button>
              </div>
              
              <div className="image-meta-info">
                <div className="image-meta-item">
                  <span className="image-meta-label">Size:</span>
                  <span className="image-meta-value">{image.size}</span>
                </div>
                <div className="image-meta-item">
                  <span className="image-meta-label">Dimensions:</span>
                  <span className="image-meta-value">{image.dimensions}</span>
                </div>
                <div className="image-meta-item">
                  <span className="image-meta-label">Views:</span>
                  <span className="image-meta-value">{image.views.toLocaleString()}</span>
                </div>
                <div className="image-meta-item">
                  <span className="image-meta-label">Uploaded:</span>
                  <span className="image-meta-value">
                    {new Date(image.uploaded).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="load-more-section">
        <button className="load-more-btn">
          Load More Images
        </button>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="upload-modal-overlay">
          <div className="upload-modal-container">
            <div className="upload-modal-header">
              <h2>Upload Images</h2>
              <button className="upload-close-btn" onClick={handleCloseModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="upload-modal-body">
              {/* Upload Area */}
              <div 
                className={`upload-drop-zone ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="upload-drop-content">
                  <FontAwesomeIcon icon={faUpload} className="upload-main-icon" />
                  <h3>Drop your images here</h3>
                  <p>or click to browse files</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple
                    onChange={handleFileInput}
                    className="upload-file-input"
                  />
                </div>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="uploaded-files-section">
                  <h4>Uploading Files ({uploadedFiles.length})</h4>
                  <div className="uploaded-files-list">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="uploaded-file-item">
                        <div className="uploaded-file-preview">
                          <img src={file.url} alt={file.name} />
                          <div className="uploaded-file-overlay">
                            {file.status === 'uploading' ? (
                              <div className="upload-progress-indicator">
                                <div className="upload-progress-spinner"></div>
                                <span>Uploading...</span>
                              </div>
                            ) : (
                              <FontAwesomeIcon icon={faCheck} className="upload-complete-icon" />
                            )}
                          </div>
                        </div>
                        <div className="uploaded-file-info">
                          <span className="uploaded-file-name">{file.name}</span>
                          <span className="uploaded-file-size">{file.size}</span>
                        </div>
                        <div className="uploaded-file-actions">
                          {file.status === 'completed' && (
                            <>
                              <button 
                                className="upload-action-btn"
                                onClick={() => copyUrl(file.url)}
                                title="Copy URL"
                              >
                                <FontAwesomeIcon icon={faLink} />
                              </button>
                              <button 
                                className="upload-action-btn delete"
                                onClick={() => removeUploadedFile(file.id)}
                                title="Remove"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="upload-modal-actions">
              <button className="btn-secondary" onClick={handleCloseModal}>
                Cancel
              </button>
              <button 
                className="btn-primary" 
                disabled={uploadedFiles.length === 0}
                onClick={() => {
                  alert('Images uploaded successfully!');
                  handleCloseModal();
                }}
              >
                Finish Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyImages;