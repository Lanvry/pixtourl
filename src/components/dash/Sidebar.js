import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logos from "../../images/favicon.ico"
import { 
  faCloudUploadAlt, 
  faHome, 
  faImages, 
  faCog
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ activePage = "dashboard", onPageChange }) => {
  const navItems = [
    { 
      id: 'dashboard',
      icon: faHome, 
      label: 'Dashboard'
    },
    { 
      id: 'myimages',
      icon: faImages, 
      label: 'My Images'
    },
    { 
      id: 'settings',
      icon: faCog, 
      label: 'Settings'
    },
  ];

  return (
    <nav className="sidebar">
      <div className="logo">
        <img src={logos} style={{width: '30px', borderRadius: '100px', marginRight: '10px'}}/>
        <h1>PIXTOURL</h1>
      </div>
      
      <ul className="nav-links">
        {navItems.map((item, index) => (
          <li key={index}>
            <a 
              href="#" 
              className={activePage === item.id ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(item.id);
              }}
            >
              <FontAwesomeIcon icon={item.icon} />
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
      
      <div className="user-info">
        <div className="user-avatar">
          <FontAwesomeIcon icon={faCloudUploadAlt} />
        </div>
        <div className="user-details">
          <h3>Image Host</h3>
          <p>Premium Plan</p>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;