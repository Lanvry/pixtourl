import React from 'react';
import StatsCard from '../../components/dash/StatsCard';
import RecentActivity from '../../components/dash/RecentActivity';
import QuickUpload from '../../components/dash/QuickUpload';
import ImageGallery from '../../components/dash/ImageGallery';

const Dashboard = () => {
  const statsData = [
    {
      title: 'Total Images',
      value: '1,284',
      icon: 'images',
      trend: 'positive',
      change: '24 new today'
    },
    {
      title: 'Storage Used',
      value: '4.2/10 GB',
      icon: 'hdd',
      trend: 'warning',
      change: '42% used'
    },
    {
      title: 'Bandwidth',
      value: '156 GB',
      icon: 'network-wired',
      trend: 'positive',
      change: '12% increase'
    },
    {
      title: 'URL Clicks',
      value: '12,847',
      icon: 'mouse-pointer',
      trend: 'positive',
      change: '8% increase'
    }
  ];

  return (
    <div className="content">
      <div className="dashboard-title">
        <h2>PIXTOURL Dashboard</h2>
        <p>Manage your images and track their performance</p>
      </div>
      
      <QuickUpload />
      
      <div className="stats-cards">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="dashboard-grid">
        <div className="grid-column">
          <ImageGallery />
        </div>
        <div className="grid-column">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;