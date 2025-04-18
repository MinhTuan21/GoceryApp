import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { addNotification } from "../store/notificationSlice";

const CheckoutScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);
    const selected = useSelector((state) => state.cart.selectedItemIds);
    const selectedItems = items.filter((item) => selected.includes(item.id));

    const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        dispatch(clearCart());
        const productImage = selectedItems[0]?.image ? `http://192.168.1.6:4000${selectedItems[0].image}` : null;
        dispatch(
            addNotification({
                message: `Đã thanh toán ${selectedItems.length} sản phẩm với tổng ${total.toLocaleString()}đ.`,
                image: productImage,
            })
        );
        
        alert("Thanh toán thành công!");
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Xác nhận thanh toán</Text>
            <Text>Sản phẩm đã chọn: {selectedItems.length}</Text>
            <Text>Tổng tiền: {total.toLocaleString()}đ</Text>

            <TouchableOpacity style={styles.button} onPress={handleCheckout}>
                <Text style={styles.buttonText}>Xác nhận & Thanh toán</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    button: {
        backgroundColor: "#28a745",
        padding: 16,
        borderRadius: 10,
        marginTop: 30,
    },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default CheckoutScreen;
