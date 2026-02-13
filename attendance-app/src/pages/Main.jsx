import React, { useState } from 'react';
import { LogOut, Check, House, Search, Heart, Bell, CircleUserRound } from 'lucide-react';
import '../scss/main.scss';
import avatarImg from '../assets/avatar.png';

const Main = () => {
  const [fontScale, setFontScale] = useState(1);

  const handleFontScale = (scale) => {
    setFontScale(scale);
    document.body.style.setProperty('--font-scale', scale);
  };

  return (
    <div className="main-screen">
      {/* Status Bar & Top Bar */}
      <div className="status-bar">
        <div className="top-bar">
          <div className="font-toggle">
            <div 
              className={`font-btn small ${fontScale === 1 ? 'active' : ''}`}
              onClick={() => handleFontScale(1)}
            >
              <span className="text">가</span>
            </div>
            <div 
              className={`font-btn big ${fontScale === 1.4 ? 'active' : ''}`}
              onClick={() => handleFontScale(1.4)}
            >
              <span className="text">가</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="content-area">
        <div className="content-wrapper">
          {/* Header */}
          <div className="header-section">
            <div className="header-left">
              <h1 className="greeting">안녕하세요, 김민수님 👋</h1>
              <p className="date-text">2026년 2월 11일 수요일</p>
            </div>
            <div className="notification-btn">
              {/* Avatar Image */}
              <div className="avatar-wrap">
                <img src={avatarImg} alt="Profile" className="avatar-img" />
              </div>
            </div>
          </div>

          {/* Attendance Card */}
          <div className="attendance-card">
            <div className="card-top">
              <div className="status-group">
                <span className="status-label">오늘의 출석 상태</span>
                <span className="status-value">출석 완료 ✓</span>
              </div>
              <div className="badge">
                <span className="badge-text">09:02 출근</span>
              </div>
            </div>

            <div className="time-row">
              <div className="time-box check-in">
                <span className="time-label">출근</span>
                <span className="time-value">09:02</span>
              </div>
              <div className="time-box check-out">
                <span className="time-label">퇴근</span>
                <span className="time-value" style={{ color: '#00000061' }}>--:--</span>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="checkout-btn">
            <LogOut className="icon" color="#FFFFFF" />
            <span className="btn-text">퇴근하기</span>
          </div>

          {/* Week Section */}
          <div className="week-section">
            <div className="week-header">
              <h2 className="section-title">이번 주 출석 현황</h2>
              <span className="week-stats">3/5일 출석</span>
            </div>
            <div className="week-card">
              {/* Mon */}
              <div className="day-col">
                <div className="day-circle checked">
                  <Check size={16} color="#FFFFFF" />
                </div>
                <span className="day-label">월</span>
              </div>
              {/* Tue */}
              <div className="day-col">
                <div className="day-circle checked">
                  <Check size={16} color="#FFFFFF" />
                </div>
                <span className="day-label">화</span>
              </div>
              {/* Wed */}
              <div className="day-col">
                <div className="day-circle checked">
                  <Check size={16} color="#FFFFFF" />
                </div>
                <span className="day-label">수</span>
              </div>
              {/* Thu */}
              <div className="day-col">
                <div className="day-circle empty"></div>
                <span className="day-label">목</span>
              </div>
              {/* Fri */}
              <div className="day-col">
                <div className="day-circle empty"></div>
                <span className="day-label">금</span>
              </div>
              {/* Sat */}
              <div className="day-col">
                <div className="day-circle weekend"></div>
                <span className="day-label" style={{ color: '#9C9B99' }}>토</span>
              </div>
              {/* Sun */}
              <div className="day-col">
                <div className="day-circle weekend"></div>
                <span className="day-label" style={{ color: '#9C9B99' }}>일</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <div className="tab-bar">
        <div className="tab-bar-inner">
          <div className="tab-item active">
            <div className="icon-bg">
              <House size={20} />
            </div>
            <span className="tab-label">Home</span>
          </div>
          <div className="tab-item">
            <div className="icon-wrap">
              <Search size={24} />
            </div>
            <span className="tab-label">Search</span>
          </div>
          <div className="tab-item">
            <div className="icon-wrap">
              <Heart size={24} />
            </div>
            <span className="tab-label">Likes</span>
          </div>
          <div className="tab-item">
            <div className="icon-wrap">
              <Bell size={24} />
            </div>
            <span className="tab-label">Notifications</span>
          </div>
          <div className="tab-item">
            <div className="icon-wrap">
              <CircleUserRound size={24} />
            </div>
            <span className="tab-label">Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
