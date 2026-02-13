import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Home, Search, Heart, Bell, CircleUserRound, ScanLine } from 'lucide-react';
import '../scss/login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleFontScale = (scale) => {
    setFontScale(scale);
    document.body.style.setProperty('--font-scale', scale);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setEmailError('이메일형태로 입력해주세요');
      return;
    }
    // Navigate to Main screen
    navigate('/main');
  };

  return (
    <div className="login-screen">
      {/* Top Bar */}
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

      {/* Scrollable Content Area */}
      <div className="content-area">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-wrap">
            <div className="logo-circle">
              <ScanLine color="#ffffff" size={48} />
            </div>
          </div>
          <h1 className="app-name">출석체크</h1>
          <p className="app-desc">간편하게 출석을 관리하세요</p>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <div className="input-group">
            <label className="input-label">이메일</label>
            <div className="input-field">
              <Mail className="icon" />
              <input 
                type="email" 
                placeholder="이메일을 입력하세요" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
              />
            </div>
            {emailError && (
              <p style={{ color: 'red', fontSize: '12px', marginTop: '4px', paddingLeft: '4px' }}>
                {emailError}
              </p>
            )}
          </div>

          <div className="input-group">
            <label className="input-label">비밀번호</label>
            <div className="input-field">
              <Lock className="icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="비밀번호를 입력하세요" 
                id="passwordInput" 
              />
              <div 
                id="togglePasswordBtn" 
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
              </div>
            </div>
          </div>

          <a href="#" className="forgot-pw">비밀번호를 잊으셨나요?</a>
        </div>

        {/* Button Section */}
        <div className="button-section">
          <button className="login-btn" onClick={handleLogin}>로그인</button>

          <div className="divider-row">
            <div className="line"></div>
            <span className="div-text">또는</span>
            <div className="line"></div>
          </div>

          <button className="social-btn facebook">
            <div className="logo-circle fb-logo">f</div>
            <span>Facebook으로 계속하기</span>
          </button>

          <button className="social-btn google">
            <div className="logo-circle google-logo">G</div>
            <span>Google로 계속하기</span>
          </button>

          <button className="social-btn apple">
            <div className="logo-circle apple-logo">A</div>
            <span>Apple로 계속하기</span>
          </button>
        </div>

        {/* Signup Section */}
        <div className="signup-row">
          <span className="signup-text">계정이 없으신가요?</span>
          <a href="#" className="signup-link">회원가입</a>
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <div className="tab-bar">
        <div className="tab-bar-inner">
          <div className="tab-item active">
            <div className="icon-bg">
              <Home size={20} />
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

export default Login;
