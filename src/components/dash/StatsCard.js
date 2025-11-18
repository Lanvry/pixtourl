import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faImages, 
  faHdd, 
  faNetworkWired, 
  faMousePointer,
  faArrowUp,
  faArrowDown,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

const StatsCard = ({ title, value, icon, trend, change }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'images': return faImages;
      case 'hdd': return faHdd;
      case 'network-wired': return faNetworkWired;
      case 'mouse-pointer': return faMousePointer;
      default: return faImages;
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'positive': return <FontAwesomeIcon icon={faArrowUp} />;
      case 'negative': return <FontAwesomeIcon icon={faArrowDown} />;
      case 'warning': return <FontAwesomeIcon icon={faExclamationTriangle} />;
      default: return <FontAwesomeIcon icon={faArrowUp} />;
    }
  };

  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <h3>{title}</h3>
        <FontAwesomeIcon icon={getIcon(icon)} />
      </div>
      <div className="stat-card-value">{value}</div>
      <div className={`stat-card-footer ${trend}`}>
        {getTrendIcon()}
        <span>{change}</span>
      </div>
    </div>
  );
};

export default StatsCard;