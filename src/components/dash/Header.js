import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUserCircle, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="header">
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} />
        <input type="text" placeholder="Search images..." />
      </div>
      
      <div className="header-actions">
        <div className="notification">
          <FontAwesomeIcon icon={faBell} />
          <div className="notification-badge">5</div>
        </div>
        <div className="user-menu">
          <FontAwesomeIcon icon={faUserCircle} />
        </div>
      </div>
    </header>
  );
};

export default Header;