import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../store/cartSlice";
import { addNotification } from "../../store/notificationSlice";
import ConfirmModal from "../modal/confimModal";

const PaymentScreen = ({ navigation, route }) => {
  const { customerInfo, selectedItems, shippingMethod } = route.params;
  const dispatch = useDispatch();

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = shippingMethod === "fast" ? 15000 : 20000;
  const finalTotal = total + shippingFee;

  const handlePayment = () => {
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin thẻ.");
      return;
    }

    
    setModalVisible(true);
  };

  const confirmPayment = () => {
    selectedItems.forEach((item) => {
      dispatch(removeFromCart(item._id));
    });

    dispatch(
      addNotification({
        message: `✅ Bạn đã thanh toán thành công đơn hàng trị giá ${finalTotal.toLocaleString("vi-VN")}đ.`,
        image: `http://192.168.1.6:4000${selectedItems[0].image}`,
      })
    );
    Alert.alert("Thành công", "Thanh toán thành công!", [
      {
        text: "OK",
        onPress: () =>
          navigation.navigate("SuccessScreen", {
            customerInfo,
            selectedItems,
            finalTotal,
          }), 
      },
    ]);
    setModalVisible(false);
  };

  const cancelPayment = () => {
    
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>THANH TOÁN</Text>

        <TextInput
          style={styles.input}
          placeholder="Nhập số thẻ"
          keyboardType="number-pad"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Tên chủ thẻ"
          value={cardName}
          onChangeText={setCardName}
        />
        <TextInput
          style={styles.input}
          placeholder="Ngày hết hạn (MM/YY)"
          value={expiryDate}
          onChangeText={setExpiryDate}
        />
        <TextInput
          style={styles.input}
          placeholder="CVV"
          keyboardType="number-pad"
          value={cvv}
          onChangeText={setCvv}
          secureTextEntry
        />

        <View style={styles.section}>
          <View style={styles.rowSpace}>
            <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.link}>chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
          <Text>{customerInfo.name}</Text>
          <Text>{customerInfo.email}</Text>
          <Text>{customerInfo.address}</Text>
          <Text>{customerInfo.phone}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.rowSpace}>
            <Text style={styles.sectionTitle}>Phương thức vận chuyển</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.link}>chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
          <Text>
            {shippingMethod === "fast"
              ? "Giao hàng Nhanh - 15.000đ (5-7/9)"
              : "Giao hàng COD - 20.000đ (4-8/9)"}
          </Text>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryText}>Tạm tính: {total.toLocaleString("vi-VN")}đ</Text>
          <Text style={styles.summaryText}>
            Phí vận chuyển: {shippingFee.toLocaleString("vi-VN")}đ
          </Text>
          <Text style={styles.total}>Tổng cộng: {finalTotal.toLocaleString("vi-VN")}đ</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>TIẾP TỤC</Text>
        </TouchableOpacity>

        <ConfirmModal
          visible={modalVisible}
          onConfirm={confirmPayment}
          onCancel={cancelPayment}
          title="Xác nhận thanh toán"
          message={`Bạn chắc chắn muốn thanh toán đơn hàng trị giá ${finalTotal.toLocaleString("vi-VN")}đ?`}
        />
      </ScrollView>
    </KeyboardAvoidingView>
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
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    marginBottom: 15,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
  },
  rowSpace: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  link: {
    color: "#007A3E",
    fontWeight: "500",
  },
  summary: {
    marginTop: 20,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#f2f2f2",
  },
  summaryText: {
    fontSize: 14,
    marginBottom: 5,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007A3E",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007A3E",
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PaymentScreen;
