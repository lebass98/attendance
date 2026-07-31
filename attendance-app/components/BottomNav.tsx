import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { House, Search, Heart, Bell, CircleUserRound } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface BottomNavProps {
  activeTab?: 'home' | 'search' | 'likes' | 'notifications' | 'profile';
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab = 'home' }) => {
  const router = useRouter();

  return (
    <View style={styles.tabBar}>
      <View style={styles.tabBarInner}>
        {/* Home */}
        <TouchableOpacity
          style={styles.tabItem}
          activeOpacity={0.7}
          onPress={() => router.push('/main')}
        >
          {activeTab === 'home' ? (
            <View style={styles.iconBg}>
              <House size={20} color="#FFFFFF" />
            </View>
          ) : (
            <View style={styles.iconWrap}>
              <House size={24} color="#94A3B8" />
            </View>
          )}
          <Text style={[styles.tabLabel, activeTab === 'home' && styles.activeTabLabel]}>
            Home
          </Text>
        </TouchableOpacity>

        {/* Search */}
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          {activeTab === 'search' ? (
            <View style={styles.iconBg}>
              <Search size={20} color="#FFFFFF" />
            </View>
          ) : (
            <View style={styles.iconWrap}>
              <Search size={24} color="#94A3B8" />
            </View>
          )}
          <Text style={[styles.tabLabel, activeTab === 'search' && styles.activeTabLabel]}>
            Search
          </Text>
        </TouchableOpacity>

        {/* Likes */}
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          {activeTab === 'likes' ? (
            <View style={styles.iconBg}>
              <Heart size={20} color="#FFFFFF" />
            </View>
          ) : (
            <View style={styles.iconWrap}>
              <Heart size={24} color="#94A3B8" />
            </View>
          )}
          <Text style={[styles.tabLabel, activeTab === 'likes' && styles.activeTabLabel]}>
            Likes
          </Text>
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          {activeTab === 'notifications' ? (
            <View style={styles.iconBg}>
              <Bell size={20} color="#FFFFFF" />
            </View>
          ) : (
            <View style={styles.iconWrap}>
              <Bell size={24} color="#94A3B8" />
            </View>
          )}
          <Text style={[styles.tabLabel, activeTab === 'notifications' && styles.activeTabLabel]}>
            Alerts
          </Text>
        </TouchableOpacity>

        {/* Profile / Login */}
        <TouchableOpacity
          style={styles.tabItem}
          activeOpacity={0.7}
          onPress={() => router.push('/')}
        >
          {activeTab === 'profile' ? (
            <View style={styles.iconBg}>
              <CircleUserRound size={20} color="#FFFFFF" />
            </View>
          ) : (
            <View style={styles.iconWrap}>
              <CircleUserRound size={24} color="#94A3B8" />
            </View>
          )}
          <Text style={[styles.tabLabel, activeTab === 'profile' && styles.activeTabLabel]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingBottom: 24,
    paddingTop: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  tabBarInner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconBg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrap: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#2563EB',
    fontWeight: '700',
  },
});

export default BottomNav;
