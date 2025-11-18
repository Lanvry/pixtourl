import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCloudUploadAlt, 
  faLink, 
  faChartLine, 
  faUser,
  faShare
} from '@fortawesome/free-solid-svg-icons';

const RecentActivity = () => {
  const activities = [
    {
      icon: faCloudUploadAlt,
      title: 'Image uploaded',
      description: 'landscape.jpg was uploaded',
      time: '2 hours ago',
      type: 'upload'
    },
    {
      icon: faLink,
      title: 'URL shared',
      description: 'portrait.png URL was shared 5 times',
      time: '5 hours ago',
      type: 'share'
    },
    {
      icon: faChartLine,
      title: 'Popular image',
      description: 'product-shot.jpg reached 2,000 views',
      time: '1 day ago',
      type: 'analytics'
    },
    {
      icon: faUser,
      title: 'New user registration',
      description: 'Someone signed up via your referral',
      time: '2 days ago',
      type: 'user'
    },
    {
      icon: faShare,
      title: 'Social media share',
      description: 'Your image was shared on Instagram',
      time: '3 days ago',
      type: 'social'
    }
  ];

  const getTypeColor = (type) => {
    const colors = {
      upload: '#3a86ff',
      share: '#2ed573',
      analytics: '#ffa502',
      user: '#ff6b81',
      social: '#8e44ad'
    };
    return colors[type] || '#3a86ff';
  };

  return (
    <div className="recent-activity cursor-target">
      <div className="activity-header">
        <h3>Recent Activity</h3>
        <div className="chart-actions">
          <button>View All</button>
        </div>
      </div>
      
      <ul className="activity-list">
        {activities.map((activity, index) => (
          <li key={index} className="activity-item">
            <div 
              className="activity-icon"
              style={{ backgroundColor: getTypeColor(activity.type) }}
            >
              <FontAwesomeIcon icon={activity.icon} />
            </div>
            <div className="activity-details">
              <h4>{activity.title}</h4>
              <p>{activity.description}</p>
            </div>
            <div className="activity-time">{activity.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;