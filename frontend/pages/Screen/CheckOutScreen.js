import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ScrollView
} from "react-native";
import { useDispatch } from "react-redux";
import Checkbox from "expo-checkbox";

const CheckoutScreen = ({ navigation, route }) => {
    const { selectedItems } = route.params;
    const dispatch = useDispatch();

    const [name, setName] = useState("Trần Minh Trí");
    const [email, setEmail] = useState("tranminhtri@gmail.com");
    const [address, setAddress] = useState("60 Láng Hạ, Ba Đình, Hà Nội");
    const [phone, setPhone] = useState("0899925757");
    const [paymentMethod, setPaymentMethod] = useState("visa");
    const [shippingMethod, setShippingMethod] = useState("fast");
    const [agree, setAgree] = useState(false);

    const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = shippingMethod === "fast" ? 15000 : 20000;
    const finalTotal = total + shippingFee;

    const handleContinue = () => {
        if (!name || !email || !address || !phone) {
            Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Thông báo", "Vui lòng nhập đúng email.");
            return;
        }

        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(phone)) {
            Alert.alert("Thông báo", "Số điện thoại không hợp lệ.");
            return;
        }

        if (!agree) {
            Alert.alert("Thông báo", "Vui lòng xác nhận thanh toán để tiếp tục.");
            return;
        }

       
        navigation.navigate("PaymentScreen", {
            customerInfo: { name, email, address, phone },
            selectedItems,
            shippingMethod,
            paymentMethod,
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Thông tin thanh toán</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>1. Thông tin người nhận</Text>

                <Text style={styles.label}>Họ và tên</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} />

                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

                <Text style={styles.label}>Địa chỉ</Text>
                <TextInput style={styles.input} value={address} onChangeText={setAddress} />

                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>2. Phương thức vận chuyển</Text>
                <TouchableOpacity onPress={() => setShippingMethod("fast")}>
                    <Text style={[styles.option, shippingMethod === "fast" && styles.selected]}>
                        🚚 Giao hàng Nhanh - 15.000đ (5-7/9)
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShippingMethod("cod")}>
                    <Text style={[styles.option, shippingMethod === "cod" && styles.selected]}>
                        📦 Giao hàng COD - 20.000đ (4-8/9)
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>3. Hình thức thanh toán</Text>
                <TouchableOpacity onPress={() => setPaymentMethod("visa")}>
                    <Text style={[styles.option, paymentMethod === "visa" && styles.selected]}>
                        💳 Thẻ VISA / MASTERCARD
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPaymentMethod("atm")}>
                    <Text style={[styles.option, paymentMethod === "atm" && styles.selected]}>
                        🏦 Thẻ ATM / Internet Banking
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>4. Tóm tắt đơn hàng</Text>
                <Text style={styles.summaryText}>🧾 Tạm tính: {total.toLocaleString("vi-VN")}đ</Text>
                <Text style={styles.summaryText}>🚚 Phí vận chuyển: {shippingFee.toLocaleString("vi-VN")}đ</Text>
                <Text style={styles.summaryTotal}>💰 Tổng cộng: {finalTotal.toLocaleString("vi-VN")}đ</Text>
            </View>

            <View style={styles.checkboxContainer}>
                <Checkbox value={agree} onValueChange={setAgree} color={agree ? "#007A3E" : undefined} />
                <Text style={styles.checkboxLabel}>Tôi đồng ý với điều khoản và xác nhận thanh toán.</Text>
            </View>

            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueText}>Tiếp tục</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    section: {
        marginBottom: 25,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        color: "#007A3E",
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        marginTop: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 10,
        marginTop: 4,
    },
    option: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        marginTop: 8,
    },
    selected: {
        backgroundColor: "#E0F2E9",
        borderColor: "#007A3E",
    },
    summaryText: {
        fontSize: 16,
        marginBottom: 4,
    },
    summaryTotal: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        color: "#007A3E",
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
    },
    checkboxLabel: {
        marginLeft: 10,
        fontSize: 14,
        flex: 1,
    },
    continueButton: {
        backgroundColor: "#007A3E",
        marginTop: 20,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    continueText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default CheckoutScreen;
