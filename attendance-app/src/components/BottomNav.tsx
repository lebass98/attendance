import React from 'react';
import { House, Search, Heart, Bell, CircleUserRound } from 'lucide-react';

interface BottomNavProps {
  activeTab?: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab = 'home' }) => {
  return (
    <div className="tab-bar">
      <div className="tab-bar-inner">
        <div className={`tab-item ${activeTab === 'home' ? 'active' : ''}`}>
          {activeTab === 'home' ? (
            <div className="icon-bg">
              <House size={20} />
            </div>
          ) : (
            <div className="icon-wrap">
              <House size={24} />
            </div>
          )}
          <span className="tab-label">Home</span>
        </div>
        
        <div className={`tab-item ${activeTab === 'search' ? 'active' : ''}`}>
           {activeTab === 'search' ? (
            <div className="icon-bg">
              <Search size={20} />
            </div>
          ) : (
            <div className="icon-wrap">
              <Search size={24} />
            </div>
          )}
          <span className="tab-label">Search</span>
        </div>

        <div className={`tab-item ${activeTab === 'likes' ? 'active' : ''}`}>
           {activeTab === 'likes' ? (
            <div className="icon-bg">
              <Heart size={20} />
            </div>
          ) : (
            <div className="icon-wrap">
               <Heart size={24} />
            </div>
          )}
          <span className="tab-label">Likes</span>
        </div>

        <div className={`tab-item ${activeTab === 'notifications' ? 'active' : ''}`}>
           {activeTab === 'notifications' ? (
            <div className="icon-bg">
               <Bell size={20} />
            </div>
          ) : (
            <div className="icon-wrap">
              <Bell size={24} />
            </div>
          )}
          <span className="tab-label">Notifications</span>
        </div>

        <div className={`tab-item ${activeTab === 'profile' ? 'active' : ''}`}>
           {activeTab === 'profile' ? (
            <div className="icon-bg">
               <CircleUserRound size={20} />
            </div>
          ) : (
            <div className="icon-wrap">
              <CircleUserRound size={24} />
            </div>
          )}
          <span className="tab-label">Profile</span>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
