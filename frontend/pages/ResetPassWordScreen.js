import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import authApi from "../public/src/api/authApi";

const ResetPasswordScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidOtp = (otp) => /^[a-zA-Z0-9]{6}$/.test(otp);

  const isValidPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);

  const handleResetPassword = async () => {
    if (!otp || !newPassword || !confirmPassword) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (!isValidOtp(otp)) {
      Alert.alert("Thông báo", "Mã OTP không hợp lệ. Vui lòng nhập lại.");
      return;
    }

    if (!isValidPassword(newPassword)) {
      Alert.alert(
        "Thông báo",
        "Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Thông báo", "Mật khẩu xác nhận không khớp.");
      return;
    }

    setLoading(true);
    try {
      const result = await authApi.resetPassword(email, otp, newPassword);
      setLoading(false);

      if (result.success) {
        Alert.alert("Thành công", "Mật khẩu đã được thay đổi.");
        navigation.navigate("LoginScreen");
      } else {
        Alert.alert("Lỗi", result.message || "Không thể đặt lại mật khẩu.");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Lỗi", "Đã có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Đặt lại mật khẩu</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập mã OTP"
        value={otp}
        onChangeText={setOtp}
        autoCapitalize="none"
        keyboardType="default"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder=" Mật khẩu mới"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder=" Xác nhận lại mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#888"
      />

      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: "#aaa" }]}
        onPress={handleResetPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}> Đặt lại mật khẩu</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 40,
    marginTop: 30,
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    padding: 14,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});

export default ResetPasswordScreen;
