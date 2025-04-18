import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import authApi from "../public/src/api/authApi";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Thông báo", "Vui lòng nhập email của bạn.");
      return;
    }

    const isValidEmail = (email) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return regex.test(email);
    };

    if (!isValidEmail(email)) {
      Alert.alert("Thông báo", "Vui lòng nhập email hợp lệ.");
      return;
    }

    setLoading(true);

    try {
      const result = await authApi.forgotPassword(email.toLowerCase().trim());
      console.log(result);
      if (result.message === "Mã OTP đã được gửi tới email của bạn.") {
        navigation.navigate("ResetPasswordScreen", { email });
        Alert.alert("Thành công", "Mã OTP đã được gửi đến email của bạn.");
      } else {
        Alert.alert("Lỗi", result.message);
      }
    } catch (error) {
      Alert.alert("Lỗi", "Đã có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Quên mật khẩu</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập email của bạn"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TouchableOpacity
          style={[styles.button, loading && { backgroundColor: "#ccc" }]}
          onPress={handleForgotPassword}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Đang xử lý..." : "Gửi yêu cầu"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Quay lại đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f9fafd",
    flexGrow: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#fafafa",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    marginTop: 10,
    alignItems: "center",
  },
  backText: {
    color: "#007bff",
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;
