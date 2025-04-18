import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import CartItem from "./cartItem";
import { addNotification } from "../store/notificationSlice";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../store/cartSlice";
import ConfirmModal from "./modal/confimModal";

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const dispatch = useDispatch();

  const [selectedItems, setSelectedItems] = useState({});
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const toggleSelect = (itemId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };
  const handleRemove = (itemId) => {
    setItemToRemove(itemId);
    setShowRemoveModal(true); 
  };
  const handleClearCart = () => {
    setShowClearModal(true); 
  };
  const handleIncrease = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };
  const handleDecrease = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };
  const selectedTotal = cartItems
    .filter((item) => selectedItems[item._id])
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <View style={styles.container}>    
      <View style={styles.header}>
        <Text style={styles.title}>Giỏ hàng</Text>
        <TouchableOpacity style={styles.cartButton} onPress={handleClearCart}>
          <FontAwesome name="trash" size={28} color="black" />
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.cartList} contentContainerStyle={{ paddingBottom: 130 }}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Giỏ hàng đang trống</Text>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item._id}
              product={item}
              quantity={item.quantity}
              isSelected={!!selectedItems[item._id]}
              onToggleSelect={() => toggleSelect(item._id)}
              onRemove={() => handleRemove(item._id)}
              onIncrease={() => handleIncrease(item._id)}
              onDecrease={() => handleDecrease(item._id)}
            />
          ))
        )}
      </ScrollView>
      {Object.values(selectedItems).some((v) => v) && (
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tạm tính</Text>
            <Text style={styles.totalPrice}>
              {selectedTotal.toLocaleString("vi-VN")}đ
            </Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => {
              const selected = cartItems.filter((item) => selectedItems[item._id]);
              if (selected.length === 0) {
                Alert.alert("Thông báo", "Vui lòng chọn ít nhất một sản phẩm.");
                return;
              }
              navigation.navigate("CheckoutScreen", {
                selectedItems: selected,
              });
            }}
          >
            <Text style={styles.checkoutText}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      )}

      <ConfirmModal
        visible={showRemoveModal}
        title="Xác nhận xoá đơn hàng?"
        message="Thao tác này sẽ không thể khôi phục."
        onConfirm={() => {
          const item = cartItems.find((i) => i._id === itemToRemove);
          if (item) {
            dispatch(removeFromCart(itemToRemove));
            dispatch(
              addNotification({
                message: ` Đã xoá "${item.name}" khỏi giỏ hàng.`,
                image: `http://172.16.49.47:4000${item.image}`, // thêm image nếu có
              })
            );
          } else {
            dispatch(
              addNotification({
                message: "Sản phẩm không tồn tại trong giỏ hàng.",
                image: null,
              })
            );
          }
          setItemToRemove(null);
          setShowRemoveModal(false);
        }}
      />
      <ConfirmModal
        visible={showClearModal}
        title="Xác nhận xoá tất cả đơn hàng?"
        message="Thao tác này sẽ không thể khôi phục."
        onConfirm={() => {
          if (cartItems.length === 0) {
            dispatch(
              addNotification({
                message: "🛒 Giỏ hàng đã trống.",
                image: null, // hoặc dùng hình ảnh mặc định
              })
            );
          } else {
            cartItems.forEach((item) => {
              dispatch(removeFromCart(item._id));
            });
            dispatch(
              addNotification({
                message: "🧹 Đã xoá toàn bộ sản phẩm khỏi giỏ hàng.",
                image: "https://cdn-icons-png.flaticon.com/512/2038/2038854.png", // ví dụ icon giỏ hàng trống
              })
            );
          }
          setShowClearModal(false);
        }}
        onCancel={() => setShowClearModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 16,
  },
  cartButton: {
    position: "relative",
    marginRight: 10,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  cartList: {
    flex: 1,
    marginTop: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#777",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  checkoutButton: {
    backgroundColor: "#007A3E",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;
