import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const GuideScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>CẨM NANG</Text>

      {/* Hướng dẫn sử dụng */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Cách sử dụng</Text>
        <Text style={styles.textContent}>
          1. Chọn sản phẩm yêu thích và thêm vào giỏ hàng.
          {"\n"}
          2. Vào giỏ hàng để kiểm tra các sản phẩm.
          {"\n"}
          3. Chọn phương thức thanh toán và giao hàng.
          {"\n"}
          4. Hoàn tất thanh toán và chờ nhận hàng.
        </Text>
      </View>

      {/* Câu hỏi thường gặp */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Câu hỏi thường gặp</Text>
        <Text style={styles.textContent}>
          Q: Làm sao để thay đổi địa chỉ giao hàng?
          {"\n"}A: Bạn có thể chỉnh sửa địa chỉ giao hàng trong phần thanh toán.
          {"\n\n"}
          Q: Tôi có thể trả lại sản phẩm không?
          {"\n"}A: Bạn có thể yêu cầu trả lại sản phẩm trong vòng 7 ngày sau khi nhận hàng.
        </Text>
      </View>

      {/* Chính sách bảo mật */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Chính sách bảo mật</Text>
        <Text style={styles.textContent}>
          Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và chỉ sử dụng thông tin cho mục đích hoàn thành đơn hàng.
        </Text>
      </View>

      {/* Các nút điều hướng */}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()} // Quay lại trang trước
        >
          <Text style={styles.buttonText}>Quay lại</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("HomeScreen")} // Quay về trang chủ
        >
          <Text style={styles.buttonText}>Trang Chủ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  infoSection: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textContent: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },
  buttons: {
    marginTop: 30,
  },
  button: {
    backgroundColor: "#007A3E",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default GuideScreen;
