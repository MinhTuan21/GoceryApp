import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/userSlice';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("LoginScreen");
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Thông tin cá nhân</Text>

      <View style={styles.profileSection}>
        <Image
          source={userInfo.avatar ? { uri: userInfo.avatar } : require('../../assets/images/google.png')}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{userInfo.name || 'Tên người dùng'}</Text>
          <Text style={styles.email}>{userInfo.email || 'example@email.com'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chung</Text>
        <MenuItem title="Chỉnh sửa thông tin" onPress={() => navigation.navigate('EditProfile')} />
        <MenuItem title="Cẩm nang trồng cây" onPress={() => navigation.navigate('GuideScreen')} /> 
        <MenuItem title="Lịch sử giao dịch" onPress={() => navigation.navigate('TransactionHistory')} />
        <MenuItem title="Q & A" onPress={() => navigation.navigate('QA')} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bảo mật và Điều khoản</Text>
        <MenuItem title="Điều khoản và điều kiện" onPress={() => navigation.navigate('Terms')} />
        <MenuItem title="Chính sách quyền riêng tư" onPress={() => navigation.navigate('PrivacyPolicy')} />
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutContainer}>
        <Text style={styles.logout}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const MenuItem = ({ title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={styles.menuText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
  },
  email: {
    color: 'gray',
    fontSize: 14,
  },
  section: {
    marginVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  sectionTitle: {
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 15,
    color: '#000',
  },
  logoutContainer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  logout: {
    color: 'red',
    fontWeight: '500',
    fontSize: 16,
  },
});
