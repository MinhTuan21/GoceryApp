import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

const CartItem = ({
  product,
  quantity,
  isSelected,
  onToggleSelect,
  onRemove,
  onIncrease,
  onDecrease,
}) => {
  return (
    <View style={styles.container}>
    
      <View style={styles.leftColumn}>
        <Checkbox
          value={isSelected}
          onValueChange={onToggleSelect}
          color={isSelected ? "#2e7d32" : undefined}
        />
      </View>

      
      <Image
        source={{ uri: `http://192.168.1.6:4000${product.image}` }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price.toLocaleString()}đ</Text>
        <View style={styles.quantityContainer}>
          <Ionicons
            name="remove-circle-outline"
            size={18}
            color="#555"
            onPress={onDecrease}
          />
          <Text style={styles.quantity}>{quantity}</Text>
          <Ionicons
            name="add-circle-outline"
            size={18}
            color="#555"
            onPress={onIncrease}
          />
        </View>
      </View>
      <View style={styles.rightColumn}>
        <TouchableOpacity onPress={onRemove}>
          <Text style={styles.delete}>Xoá</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
    backgroundColor: "#fff",
    marginVertical: 6,
    borderRadius: 8,
    elevation: 1,
  },
  leftColumn: {
    marginRight: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
  },
  price: {
    fontSize: 12,
    color: "#2e7d32",
    fontWeight: "bold",
    marginTop: 2,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 8,
  },
  quantity: {
    fontSize: 14,
    paddingHorizontal: 6,
  },
  rightColumn: {
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  delete: {
    color: "red",
    fontSize: 12,
    marginBottom: 6,
  },
});

export default CartItem;
