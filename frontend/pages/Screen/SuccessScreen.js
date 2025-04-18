import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

const SuccessScreen = ({ navigation, route }) => {
  const { customerInfo, selectedItems, finalTotal, shippingMethod, paymentMethod, paymentDetails } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text>{item.name} (x{item.quantity})</Text>
      <Text>{item.price.toLocaleString("vi-VN")}đ</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ĐẶT HÀNG THÀNH CÔNG</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Thông tin khách hàng:</Text>
        <Text>{customerInfo.name}</Text>
        <Text>{customerInfo.email}</Text>
        <Text>{customerInfo.address}</Text>
        <Text>{customerInfo.phone}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Phương thức thanh toán:</Text>
        {paymentMethod === "card" ? (
          <View>
            <Text>Thẻ tín dụng</Text>
            <Text>Số thẻ: {paymentDetails.cardNumber}</Text>
            <Text>Ngày hết hạn: {paymentDetails.expiryDate}</Text>
            <Text>CVV: {paymentDetails.cvv}</Text>
          </View>
        ) : (
          <Text>Thanh toán khi nhận hàng</Text>
        )}
      </View>

      {/* Phương thức vận chuyển */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Phương thức vận chuyển:</Text>
        <Text>{shippingMethod === "fast" ? "Giao hàng Nhanh" : "Giao hàng COD"}</Text>
      </View>

      {/* Các sản phẩm đã đặt */}
      <View style={styles.productsContainer}>
        <Text style={styles.label}>Sản phẩm:</Text>
        <FlatList
          data={selectedItems}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>

      {/* Tổng tiền */}
      <View style={styles.summaryContainer}>
        <Text style={styles.label}>Tổng tiền:</Text>
        <Text>{finalTotal.toLocaleString("vi-VN")}đ</Text>
      </View>

      {/* Các nút điều hướng */}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("GuideScreen")} 
        >
          <Text style={styles.buttonText}>Xem Cẩm Nang</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Text style={styles.buttonText}>Quay lại Trang Chủ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  productsContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  productItem: {
    marginBottom: 10,
  },
  summaryContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  buttons: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007A3E",
    paddingVertical: 14,
    marginBottom: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SuccessScreen;
