'use client';

import React, { useState } from 'react';
import { Check, LogIn, LogOut, House, Search, Heart, Bell, CircleUserRound } from 'lucide-react';
import '../../scss/main.scss';
import avatarImg from '../../assets/avatar.png';
import BottomNav from '../../components/BottomNav';
import Image from 'next/image';

const MainPage = () => {
  const [fontScale, setFontScale] = useState(1);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: '', message: '' });

  const handleFontScale = (scale: number) => {
    setFontScale(scale);
    document.body.style.setProperty('--font-scale', scale.toString());
  };

  const openModal = (type: string) => {
    const message = type === 'checkin' ? '출근하시겠습니까?' : '퇴근하시겠습니까?';
    setModalConfig({ isOpen: true, type, message });
  };

  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  const handleConfirm = () => {
    console.log(`${modalConfig.type === 'checkin' ? '출근' : '퇴근'} 처리됨`);
    closeModal();
  };

  // 샘플 데이터 (월~일)
  const WEEKLY_DATA = [
    { day: '월', date: '2.10', status: 'checked', startTime: '08:55', endTime: '18:03', badge: 'normal', badgeText: '정상' },
    { day: '화', date: '2.11', status: 'checked', startTime: '09:02', endTime: '18:05', badge: 'normal', badgeText: '정상' },
    { day: '수', date: '2.12', status: 'checked', startTime: '09:12', endTime: '18:10', badge: 'late', badgeText: '지각' },
    { day: '목', date: '2.13', status: 'checked', startTime: '08:50', endTime: '18:00', badge: 'normal', badgeText: '정상' },
    { day: '금', date: '2.14', status: 'checked', startTime: '08:58', endTime: '18:02', badge: 'normal', badgeText: '정상' },
    { day: '토', date: '2.15', status: 'checked', startTime: '10:00', endTime: '15:00', badge: 'normal', badgeText: '정상' },
    { day: '일', date: '2.16', status: 'checked', startTime: '11:00', endTime: '15:00', badge: 'normal', badgeText: '정상' },
  ];

  // 주간 출석 일수 계산
  const attendedDays = WEEKLY_DATA.filter(d => d.status === 'checked').length;

  return (
    <div className="main-screen">
      {/* 상태 바 & 상단 바 */}
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

      {/* 스크롤 가능한 콘텐츠 영역 */}
      <div className="content-area">
        <div className="content-wrapper">
          {/* 헤더 */}
          <div className="header-section">
            <div className="header-left">
              <h1 className="greeting">안녕하세요, 김민수님 👋</h1>
              <p className="date-text">2026년 2월 11일 수요일</p>
            </div>
            <div className="notification-btn">
              {/* Avatar Image */}
              <div className="avatar-wrap">
                <Image src={avatarImg} alt="Profile" className="avatar-img" width={40} height={40} />
              </div>
            </div>
          </div>

          {/* 출석 카드 */}
          <div className="attendance-card">
            <div className="card-top">
              <div className="status-group">
                <span className="status-label">오늘의 출석 상태</span>
                <span className="status-value">출근중 ✓</span>
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

          <div className="button-group">
            {/* 출근 버튼 */}
            <div className="checkin-btn" onClick={() => openModal('checkin')}>
              <span className="btn-text">출근하기</span>
            </div>

            {/* 퇴근 버튼 */}
            <div className="checkout-btn" onClick={() => openModal('checkout')}>
              <span className="btn-text">퇴근하기</span>
            </div>
          </div>

          {/* 주간 출석 현황 섹션 */}
          <div className="week-section">
            <div className="week-header">
              <h2 className="section-title">이번 주 출석 현황</h2>
              <span className="week-stats">{attendedDays}/5일 출석</span>
            </div>
            <div className="week-card">
              {WEEKLY_DATA.map((item, index) => (
                <div key={index} className="day-col">
                  {/* status가 checked이면 badge(normal/late)를 클래스로 추가하여 색상 구분 */}
                  <div className={`day-circle ${item.status} ${item.status === 'checked' ? item.badge : ''}`}>
                    {item.status === 'checked' && <Check size={16} color="#FFFFFF" />}
                  </div>
                  <span className="day-label" style={item.status === 'weekend' ? { color: '#9C9B99' } : {}}>
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 최근 출석 기록 섹션 (Node il9qb) */}
          <div className="recent-section">
            <div className="recent-header">
              <h2 className="section-title">최근 출석 기록</h2>
              <span className="recent-more">전체보기</span>
            </div>
            <div className="recent-card">
              {/* WEEKLY_DATA를 역순으로 보여주되, 출석한 기록(status === 'checked')만 표시 */}
              {[...WEEKLY_DATA].reverse().filter(item => item.status === 'checked').map((item, index) => (
                <div key={index}>
                  <div className="recent-row">
                    <div 
                      className="accent-bar" 
                      style={item.badge === 'late' ? { backgroundColor: '#FFB020' } : {}}
                    ></div>
                    <div className="info-col">
                      <span className="date">{item.date} ({item.day})</span>
                      <span className="time">출근 {item.startTime} · 퇴근 {item.endTime}</span>
                    </div>
                    <div className={`badge ${item.badge}`}>
                      <span className="badge-text">{item.badgeText}</span>
                    </div>
                  </div>
                  {index < WEEKLY_DATA.filter(d => d.status === 'checked').length - 1 && (
                    <div className="divider"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          </div>
        </div>

      {/* 하단 탭 바 */}
      <BottomNav activeTab="home" />

      {/* 모달 렌더링 */}
      {modalConfig.isOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p className="modal-message">{modalConfig.message}</p>
            <div className="modal-buttons">
              <button className="btn-cancel" onClick={closeModal}>취소</button>
              <button className="btn-confirm" onClick={handleConfirm}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
