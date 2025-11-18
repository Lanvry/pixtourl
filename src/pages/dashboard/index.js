import React, { Suspense, lazy, useState } from 'react';
import '../../css/dash/index.css';
import Sidebar from '../../components/dash/Sidebar';
import Header from '../../components/dash/Header';

// Lazy load components
const Dashboard = lazy(() => import('./dashboard'));
const MyImages = lazy(() => import('./myimage'));
const Settings = lazy(() => import('./settings'));

const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

const componentMap = {
  dashboard: Dashboard,
  myimages: MyImages,
  settings: Settings,
};

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  const PageComponent = componentMap[currentPage] || Dashboard;

  return (
    <div className="app">
      <Sidebar 
        activePage={currentPage} 
        onPageChange={setCurrentPage} 
      />
      <div className="main-content">
        <Header />
        <Suspense fallback={<LoadingFallback />}>
          <PageComponent />
        </Suspense>
        <footer className="footer-dasv">
          <p>&copy; 2025 PIXTOURL. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;