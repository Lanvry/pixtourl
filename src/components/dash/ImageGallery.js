import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faCopy, faEye, faDownload } from '@fortawesome/free-solid-svg-icons';

const ImageGallery = () => {
  const sampleImages = [
    {
      id: 1,
      name: 'landscape.jpg',
      url: 'https://imghost.pro/12345-landscape.jpg',
      thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150',
      size: '2.4 MB',
      views: 1247,
      uploaded: '2 hours ago'
    },
    {
      id: 2,
      name: 'portrait.png',
      url: 'https://imghost.pro/12346-portrait.png',
      thumbnail: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=150',
      size: '1.8 MB',
      views: 856,
      uploaded: '1 day ago'
    },
    {
      id: 3,
      name: 'product-shot.jpg',
      url: 'https://imghost.pro/12347-product-shot.jpg',
      thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150',
      size: '3.1 MB',
      views: 2103,
      uploaded: '3 days ago'
    }
  ];

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  return (
    <div className="image-gallery">
      <div className="gallery-header">
        <h3>Recent Images</h3>
        <button className="view-all-btn">View All</button>
      </div>
      
      <div className="gallery-grid">
        {sampleImages.map((image) => (
          <div key={image.id} className="gallery-item cursor-target">
            <div className="image-container">
              <img src={image.thumbnail} alt={image.name} />
              <div className="image-overlay">
                <button onClick={() => copyUrl(image.url)} className="icon-btn">
                  <FontAwesomeIcon icon={faCopy} />
                </button>
                <button className="icon-btn">
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button className="icon-btn">
                  <FontAwesomeIcon icon={faDownload} />
                </button>
              </div>
            </div>
            <div className="image-info">
              <h4>{image.name}</h4>
              <p className="image-url">
                <FontAwesomeIcon icon={faLink} />
                {image.url.substring(0, 25)}...
              </p>
              <div className="image-stats">
                <span>{image.size}</span>
                <span>{image.views} views</span>
                <span>{image.uploaded}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;