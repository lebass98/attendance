import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Modal,
  Platform,
} from 'react-native';
import { Check } from 'lucide-react-native';
import BottomNav from '../components/BottomNav';

export default function MainScreen() {
  const [fontScale, setFontScale] = useState(1);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: '', message: '' });

  const handleFontScale = (scale: number) => {
    setFontScale(scale);
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

  // 주간 출석 샘플 데이터 (월~일)
  const WEEKLY_DATA = [
    { day: '월', date: '2.10', status: 'checked', startTime: '08:55', endTime: '18:03', badge: 'normal', badgeText: '정상' },
    { day: '화', date: '2.11', status: 'checked', startTime: '09:02', endTime: '18:05', badge: 'normal', badgeText: '정상' },
    { day: '수', date: '2.12', status: 'checked', startTime: '09:12', endTime: '18:10', badge: 'late', badgeText: '지각' },
    { day: '목', date: '2.13', status: 'checked', startTime: '08:50', endTime: '18:00', badge: 'normal', badgeText: '정상' },
    { day: '금', date: '2.14', status: 'checked', startTime: '08:58', endTime: '18:02', badge: 'normal', badgeText: '정상' },
    { day: '토', date: '2.15', status: 'checked', startTime: '10:00', endTime: '15:00', badge: 'normal', badgeText: '정상' },
    { day: '일', date: '2.16', status: 'checked', startTime: '11:00', endTime: '15:00', badge: 'normal', badgeText: '정상' },
  ];

  const attendedDays = WEEKLY_DATA.filter((d) => d.status === 'checked').length;
  const baseFontSize = (size: number) => Math.round(size * fontScale);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 상단 바 & 글자 크기 조절 */}
      <View style={styles.topBar}>
        <View style={styles.fontToggleContainer}>
          <TouchableOpacity
            style={[styles.fontBtn, fontScale === 1 && styles.fontBtnActive]}
            onPress={() => handleFontScale(1)}
            activeOpacity={0.8}
          >
            <Text style={[styles.fontBtnText, { fontSize: 13 }, fontScale === 1 && styles.fontBtnTextActive]}>
              가
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fontBtn, fontScale === 1.4 && styles.fontBtnActive]}
            onPress={() => handleFontScale(1.4)}
            activeOpacity={0.8}
          >
            <Text style={[styles.fontBtnText, { fontSize: 17 }, fontScale === 1.4 && styles.fontBtnTextActive]}>
              가
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 스크롤 가능한 콘텐츠 영역 */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 헤더 섹션 */}
        <View style={styles.headerSection}>
          <View style={styles.headerLeft}>
            <Text style={[styles.greeting, { fontSize: baseFontSize(20) }]}>
              안녕하세요, 김민수님 👋
            </Text>
            <Text style={[styles.dateText, { fontSize: baseFontSize(13) }]}>
              2026년 2월 11일 수요일
            </Text>
          </View>
          <View style={styles.avatarWrap}>
            <Image
              source={require('../assets/avatar.png')}
              style={styles.avatarImg}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* 출석 카드 */}
        <View style={styles.attendanceCard}>
          <View style={styles.cardTop}>
            <View>
              <Text style={[styles.statusLabel, { fontSize: baseFontSize(12) }]}>오늘의 출석 상태</Text>
              <Text style={[styles.statusValue, { fontSize: baseFontSize(16) }]}>출근중 ✓</Text>
            </View>
            <View style={styles.badgeTop}>
              <Text style={[styles.badgeTopText, { fontSize: baseFontSize(12) }]}>09:02 출근</Text>
            </View>
          </View>

          <View style={styles.timeRow}>
            <View style={[styles.timeBox, styles.timeBoxCheckIn]}>
              <Text style={styles.timeLabel}>출근</Text>
              <Text style={[styles.timeValue, { fontSize: baseFontSize(18) }]}>09:02</Text>
            </View>
            <View style={[styles.timeBox, styles.timeBoxCheckOut]}>
              <Text style={styles.timeLabel}>퇴근</Text>
              <Text style={[styles.timeValueEmpty, { fontSize: baseFontSize(18) }]}>--:--</Text>
            </View>
          </View>
        </View>

        {/* 출퇴근 버튼 그룹 */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.checkinBtn]}
            onPress={() => openModal('checkin')}
            activeOpacity={0.85}
          >
            <Text style={[styles.btnText, { fontSize: baseFontSize(15) }]}>출근하기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.checkoutBtn]}
            onPress={() => openModal('checkout')}
            activeOpacity={0.85}
          >
            <Text style={[styles.btnText, { fontSize: baseFontSize(15) }]}>퇴근하기</Text>
          </TouchableOpacity>
        </View>

        {/* 주간 출석 현황 */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { fontSize: baseFontSize(16) }]}>이번 주 출석 현황</Text>
            <Text style={[styles.weekStats, { fontSize: baseFontSize(13) }]}>{attendedDays}/7일 출석</Text>
          </View>
          <View style={styles.weekCard}>
            {WEEKLY_DATA.map((item, index) => (
              <View key={index} style={styles.dayCol}>
                <View
                  style={[
                    styles.dayCircle,
                    item.status === 'checked' && styles.dayCircleChecked,
                    item.badge === 'late' && styles.dayCircleLate,
                  ]}
                >
                  {item.status === 'checked' && <Check size={16} color="#FFFFFF" strokeWidth={3} />}
                </View>
                <Text style={styles.dayLabel}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 최근 출석 기록 */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { fontSize: baseFontSize(16) }]}>최근 출석 기록</Text>
            <TouchableOpacity>
              <Text style={[styles.recentMore, { fontSize: baseFontSize(13) }]}>전체보기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.recentCard}>
            {[...WEEKLY_DATA]
              .reverse()
              .filter((item) => item.status === 'checked')
              .map((item, index, arr) => (
                <React.Fragment key={index}>
                  <View style={styles.recentRow}>
                    <View
                      style={[
                        styles.accentBar,
                        item.badge === 'late' && { backgroundColor: '#F59E0B' },
                      ]}
                    />
                    <View style={styles.infoCol}>
                      <Text style={[styles.recentDate, { fontSize: baseFontSize(14) }]}>
                        {item.date} ({item.day})
                      </Text>
                      <Text style={[styles.recentTime, { fontSize: baseFontSize(12) }]}>
                        출근 {item.startTime} · 퇴근 {item.endTime}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.recentBadge,
                        item.badge === 'late' ? styles.badgeLate : styles.badgeNormal,
                      ]}
                    >
                      <Text
                        style={[
                          styles.recentBadgeText,
                          item.badge === 'late'
                            ? styles.badgeLateText
                            : styles.badgeNormalText,
                        ]}
                      >
                        {item.badgeText}
                      </Text>
                    </View>
                  </View>
                  {index < arr.length - 1 && <View style={styles.recentDivider} />}
                </React.Fragment>
              ))}
          </View>
        </View>
      </ScrollView>

      {/* 하단 내비게이션 */}
      <BottomNav activeTab="home" />

      {/* 확인 모달 */}
      <Modal
        visible={modalConfig.isOpen}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalMessage}>{modalConfig.message}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.btnCancel]}
                onPress={closeModal}
              >
                <Text style={styles.btnCancelText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.btnConfirm]}
                onPress={handleConfirm}
              >
                <Text style={styles.btnConfirmText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  dateText: {
    color: '#64748B',
  },
  avatarWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#2563EB',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  attendanceCard: {
    backgroundColor: '#1E40AF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  statusLabel: {
    color: '#93C5FD',
    marginBottom: 4,
  },
  statusValue: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  badgeTop: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeTopText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  timeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timeBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 14,
    padding: 14,
  },
  timeBoxCheckIn: {},
  timeBoxCheckOut: {},
  timeLabel: {
    color: '#93C5FD',
    fontSize: 12,
    marginBottom: 4,
  },
  timeValue: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  timeValueEmpty: {
    color: '#94A3B8',
    fontWeight: '800',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  checkinBtn: {
    backgroundColor: '#2563EB',
  },
  checkoutBtn: {
    backgroundColor: '#0F172A',
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: '700',
    color: '#0F172A',
  },
  weekStats: {
    color: '#2563EB',
    fontWeight: '700',
  },
  weekCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
  },
  dayCol: {
    alignItems: 'center',
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  dayCircleChecked: {
    backgroundColor: '#10B981',
  },
  dayCircleLate: {
    backgroundColor: '#F59E0B',
  },
  dayLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  recentMore: {
    color: '#64748B',
    fontWeight: '600',
  },
  recentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  accentBar: {
    width: 4,
    height: 36,
    borderRadius: 2,
    backgroundColor: '#10B981',
    marginRight: 12,
  },
  infoCol: {
    flex: 1,
  },
  recentDate: {
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  recentTime: {
    color: '#64748B',
  },
  recentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeNormal: {
    backgroundColor: '#D1FAE5',
  },
  badgeLate: {
    backgroundColor: '#FEF3C7',
  },
  recentBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  badgeNormalText: {
    color: '#047857',
  },
  badgeLateText: {
    color: '#B45309',
  },
  recentDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  modalMessage: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalBtn: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCancel: {
    backgroundColor: '#F1F5F9',
  },
  btnConfirm: {
    backgroundColor: '#2563EB',
  },
  btnCancelText: {
    color: '#64748B',
    fontWeight: '700',
  },
  btnConfirmText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
