import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, Eye, EyeOff, X, ScanLine } from 'lucide-react-native';
import BottomNav from '../components/BottomNav';

export default function LoginScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  // OTP State & Refs
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(182); // 3:02 -> 182 sec
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleFontScale = (scale: number) => {
    setFontScale(scale);
  };

  const handleOtpChange = (text: string, index: number) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    
    if (cleanText.length > 1) {
      newOtp[index] = cleanText.substring(cleanText.length - 1);
    } else {
      newOtp[index] = cleanText;
    }
    setOtp(newOtp);

    // Auto focus next input
    if (cleanText && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const validateEmail = (emailStr: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(emailStr).toLowerCase());
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setEmailError('이메일 형태로 입력해 주세요');
      return;
    }
    setEmailError('');
    router.push('/main');
  };

  const baseFontSize = (size: number) => Math.round(size * fontScale);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* 상단 바 (글자 크기 토글 버튼) */}
        <View style={styles.topBar}>
          <View style={styles.fontToggleContainer}>
            <TouchableOpacity
              style={[
                styles.fontBtn,
                fontScale === 1 && styles.fontBtnActive,
              ]}
              onPress={() => handleFontScale(1)}
              activeOpacity={0.8}
            >
              <Text style={[styles.fontBtnText, { fontSize: 13 }, fontScale === 1 && styles.fontBtnTextActive]}>
                가
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.fontBtn,
                fontScale === 1.4 && styles.fontBtnActive,
              ]}
              onPress={() => handleFontScale(1.4)}
              activeOpacity={0.8}
            >
              <Text style={[styles.fontBtnText, { fontSize: 17 }, fontScale === 1.4 && styles.fontBtnTextActive]}>
                가
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 스크롤 콘텐츠 영역 */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 로고 섹션 */}
          <View style={styles.logoSection}>
            <View style={styles.logoCircle}>
              <ScanLine color="#FFFFFF" size={44} />
            </View>
            <Text style={[styles.appName, { fontSize: baseFontSize(24) }]}>출석체크</Text>
            <Text style={[styles.appDesc, { fontSize: baseFontSize(14) }]}>간편하게 출석을 관리하세요</Text>
          </View>

          {/* OTP 입력 섹션 */}
          <View style={styles.otpSection}>
            <Text style={[styles.otpTitle, { fontSize: baseFontSize(14) }]}>인증번호 4자리를 입력해주세요.</Text>
            <View style={styles.otpInputsRow}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  style={[
                    styles.otpInput,
                    digit !== '' && styles.otpInputFilled,
                    { fontSize: baseFontSize(20) },
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleOtpKeyPress(e, index)}
                />
              ))}
            </View>
            <Text style={styles.otpTimer}>
              {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:
              {(timeLeft % 60).toString().padStart(2, '0')}
            </Text>
            <Text style={styles.otpError}>* 인증번호를 확인해 주세요.</Text>
          </View>

          {/* 로그인 폼 섹션 */}
          <View style={styles.formContainer}>
            {/* 이메일 입력 */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { fontSize: baseFontSize(13) }]}>이메일</Text>
              <View style={styles.inputField}>
                <Mail size={18} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  style={[styles.textInput, { fontSize: baseFontSize(14) }]}
                  placeholder="이메일을 입력하세요"
                  placeholderTextColor="#94A3B8"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (emailError) setEmailError('');
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {email !== '' && (
                  <TouchableOpacity style={styles.clearBtn} onPress={() => setEmail('')}>
                    <X size={12} color="#FFFFFF" strokeWidth={3} />
                  </TouchableOpacity>
                )}
              </View>
              {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}
            </View>

            {/* 비밀번호 입력 */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { fontSize: baseFontSize(13) }]}>비밀번호</Text>
              <View style={styles.inputField}>
                <Lock size={18} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  style={[styles.textInput, { fontSize: baseFontSize(14) }]}
                  placeholder="비밀번호를 입력하세요"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                >
                  {showPassword ? <EyeOff size={18} color="#64748B" /> : <Eye size={18} color="#64748B" />}
                </TouchableOpacity>
                {password !== '' && (
                  <TouchableOpacity style={styles.clearBtn} onPress={() => setPassword('')}>
                    <X size={12} color="#FFFFFF" strokeWidth={3} />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={[styles.forgotText, { fontSize: baseFontSize(12) }]}>비밀번호를 잊으셨나요?</Text>
            </TouchableOpacity>

            {/* 로그인 버튼 */}
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} activeOpacity={0.85}>
              <Text style={[styles.loginBtnText, { fontSize: baseFontSize(15) }]}>로그인</Text>
            </TouchableOpacity>

            {/* 구분선 */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>또는</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* 소셜 로그인 버튼 */}
            <TouchableOpacity style={[styles.socialBtn, styles.facebookBtn]} activeOpacity={0.85}>
              <View style={[styles.socialIconCircle, { backgroundColor: '#1877F2' }]}>
                <Text style={styles.socialIconText}>f</Text>
              </View>
              <Text style={[styles.socialBtnText, { fontSize: baseFontSize(14), color: '#333333' }]}>
                Facebook으로 계속하기
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.socialBtn, styles.googleBtn]} activeOpacity={0.85}>
              <View style={[styles.socialIconCircle, { backgroundColor: '#EA4335' }]}>
                <Text style={styles.socialIconText}>G</Text>
              </View>
              <Text style={[styles.socialBtnText, { fontSize: baseFontSize(14), color: '#333333' }]}>
                Google로 계속하기
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.socialBtn, styles.appleBtn]} activeOpacity={0.85}>
              <View style={[styles.socialIconCircle, { backgroundColor: '#000000' }]}>
                <Text style={styles.socialIconText}>A</Text>
              </View>
              <Text style={[styles.socialBtnText, { fontSize: baseFontSize(14), color: '#333333' }]}>
                Apple로 계속하기
              </Text>
            </TouchableOpacity>

            {/* 회원가입 섹션 */}
            <View style={styles.signupRow}>
              <Text style={[styles.signupText, { fontSize: baseFontSize(13) }]}>계정이 없으신가요? </Text>
              <TouchableOpacity>
                <Text style={[styles.signupLink, { fontSize: baseFontSize(13) }]}>회원가입</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* 하단 내비게이션 바 */}
        <BottomNav activeTab="profile" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingBottom: 8,
  },
  fontToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 20,
    padding: 3,
  },
  fontBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontBtnActive: {
    backgroundColor: '#2563EB',
  },
  fontBtnText: {
    color: '#64748B',
    fontWeight: '700',
  },
  fontBtnTextActive: {
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 14,
  },
  appName: {
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  appDesc: {
    color: '#64748B',
  },
  otpSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  otpTitle: {
    fontWeight: '600',
    color: '#334155',
    marginBottom: 14,
  },
  otpInputsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  otpInput: {
    width: 48,
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    textAlign: 'center',
    fontWeight: '700',
    color: '#0F172A',
  },
  otpInputFilled: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  otpTimer: {
    fontSize: 13,
    color: '#EF4444',
    fontWeight: '700',
    marginBottom: 4,
  },
  otpError: {
    fontSize: 11,
    color: '#94A3B8',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    color: '#0F172A',
  },
  clearBtn: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#94A3B8',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  eyeBtn: {
    padding: 4,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 11,
    marginTop: 4,
    marginLeft: 2,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 18,
  },
  forgotText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  loginBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 12,
    color: '#94A3B8',
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  facebookBtn: {},
  googleBtn: {},
  appleBtn: {},
  socialIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  socialIconText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  socialBtnText: {
    fontWeight: '600',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  signupText: {
    color: '#64748B',
  },
  signupLink: {
    color: '#2563EB',
    fontWeight: '700',
  },
});
