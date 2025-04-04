import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import orderApi from "../public/src/api/orderApi"


const CartScreen = () => {
    const navigation = useNavigation();
    const totalItems = useSelector((state) => state.cart.totalItems);

    return (
        <View style={styles.header}>
            <Text style={styles.title}>Giỏ hàng</Text>

            <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate("Cart")}>
                <FontAwesome name="shopping-cart" size={28} color="black" />
                {totalItems > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{totalItems}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    title: {
        flex: 1,
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 16,
    },
    cartButton: {
        position: "relative",
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
});

export default CartScreen;
