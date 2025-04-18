import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../../store/userSlice';

export default function EditProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.user);

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [address, setAddress] = useState(userInfo.address);
  const [phone, setPhone] = useState(userInfo.phone);
  const [avatar, setAvatar] = useState(null); 

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setAddress(userInfo.address);
    setPhone(userInfo.phone);
    setAvatar(userInfo.avatar);
  }, [userInfo]);

  const handleSave = () => {
    dispatch(updateUserInfo({
      name,
      email,
      address,
      phone,
      avatar: avatar || userInfo.avatar 
    }));
    navigation.goBack();
  }

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert('Quyền truy cập bị từ chối', 'Ứng dụng cần quyền truy cập camera để chụp ảnh.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleAvatarPress = () => {
    Alert.alert(
      'Thay đổi ảnh đại diện',
      'Chọn ảnh từ:',
      [
        { text: 'Thư viện', onPress: openImagePicker },
        { text: 'Camera', onPress: openCamera },
        { text: 'Hủy', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CHỈNH SỬA THÔNG TIN</Text>

      <TouchableOpacity onPress={handleAvatarPress}>
        <Image
          source={
            avatar
              ? { uri: avatar }
              : require('../../assets/images/google.png')
          }
          style={styles.avatar}
        />
      </TouchableOpacity>

      <Text style={styles.infoText}>
        Thông tin sẽ được lưu cho lần mua kế tiếp.{"\n"}
        Bấm vào thông tin chi tiết để chỉnh sửa.
      </Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Họ và tên"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Email"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Địa chỉ"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="Số điện thoại"
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>LƯU THÔNG TIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 20,
  },
  infoText: {
    textAlign: 'center',
    color: '#555',
    fontSize: 13,
    marginBottom: 25,
  },
  input: {
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#888',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 30,
  },
  saveText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
