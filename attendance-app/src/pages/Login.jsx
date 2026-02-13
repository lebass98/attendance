import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Home, Search, Heart, Bell, CircleUserRound, ScanLine, X } from 'lucide-react';
import '../scss/login.scss';
import BottomNav from '../components/BottomNav';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  // OTP State
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(182); // 3:02 -> 182 seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleFontScale = (scale) => {
    setFontScale(scale);
    document.body.style.setProperty('--font-scale', scale);
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return; // Only allow numbers

    const newOtp = [...otp];
    // Check if user is pasting multiple digits or typing one
    if (value.length > 1) {
        // Handle paste if needed, for now just take the last char if it's single input logic
        // But usually input type text maxLength 1 handles single char.
        // Let's stick to single char extraction
        newOtp[index] = value.substring(value.length - 1);
    } else {
        newOtp[index] = value;
    }
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
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
      {/* 상단 바 */}
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

      {/* 스크롤 가능한 콘텐츠 영역 */}
      <div className="content-area">
        {/* 로고 섹션 */}
        <div className="logo-section">
          <div className="logo-wrap">
            <div className="logo-circle">
              <ScanLine color="#ffffff" size={48} />
            </div>
          </div>
          <h1 className="app-name">출석체크</h1>
          <p className="app-desc">간편하게 출석을 관리하세요</p>
        </div>

        {/* 인증번호 입력 섹션 */}
        <div className="otp-section">
          <h3 className="otp-title">인증번호 4자리를 입력해주세요.</h3>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="tel" // Show number pad on mobile
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                className={`otp-input ${digit ? 'filled' : ''}`}
                autoComplete="off"
              />
            ))}
          </div>
          <div className="otp-timer">
            {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
          <p className="otp-error">* 인증번호를 확인해 주세요.</p>
        </div>

        <div className="login-form-container">
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
                {email && (
                  <div className="clear-btn" onClick={() => setEmail('')}>
                    <X size={12} color="#ffffff" strokeWidth={3} />
                  </div>
                )}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="passwordInput" 
                />
                <div 
                  id="togglePasswordBtn" 
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
                </div>
                {password && (
                  <div className="clear-btn" onClick={() => setPassword('')}>
                    <X size={12} color="#ffffff" strokeWidth={3} />
                  </div>
                )}
              </div>
            </div>

            <a href="#" className="forgot-pw">비밀번호를 잊으셨나요?</a>
          </div>

          {/* 버튼 섹션 */}
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

          {/* 회원가입 섹션 */}
          <div className="signup-row">
            <span className="signup-text">계정이 없으신가요?</span>
            <a href="#" className="signup-link">회원가입</a>
          </div>
        </div>
      </div>

      {/* 하단 탭 바 */}
      <BottomNav activeTab="home" />
    </div>
  );
};

export default Login;
