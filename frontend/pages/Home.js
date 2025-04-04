import React, { useEffect } from "react";
import {
    View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { addToCart } from "../store/cartSlice"; // Import Redux action
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { items: products, loading } = useSelector((state) => state.products);
    const totalItems = useSelector((state) => state.cart.totalItems); 

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Planta - toả sáng không gian nhà bạn</Text>
                <TouchableOpacity onPress={() => navigation.navigate("CartScreen")} style={{ position: "relative" }}>
                    <Ionicons name="cart-outline" size={28} color="black" />
                    {totalItems > 0 && (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartText}>{totalItems}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Cây trồng</Text>

          
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    renderItem={({ item }) => (
                        <View style={styles.productCard}>
                            <Image source={{ uri: `http://172.16.51.242:4000${item.image}` }} style={styles.image} />
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>{item.price} VNĐ</Text>
                            <TouchableOpacity 
                                style={styles.button} 
                                onPress={() => dispatch(addToCart(item))} 
                            >
                                <Text style={styles.buttonText}>Thêm vào giỏ</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
            <View style={styles.navBar}>
                <Ionicons name="home" size={28} color="black" />
                <Ionicons name="search" size={28} color="black" />
                <Ionicons name="notifications-outline" size={28} color="black" />
                <Ionicons name="person-outline" size={28} color="black" />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 16 },
    header: {flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16,  marginTop:30 },
    headerTitle: { fontSize: 18, fontWeight: "bold", flex: 1 },
    sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
    row: { justifyContent: "space-between" },
    productCard: { width: "48%", padding: 10, borderWidth: 1, borderRadius: 8, borderColor: "#ddd", marginBottom: 10 },
    image: { width: "100%", height: 120, resizeMode: "cover", borderRadius: 8 },
    name: { fontSize: 16, fontWeight: "bold", marginTop: 8 },
    price: { fontSize: 14, color: "green", marginTop: 4 },
    button: { marginTop: 10, backgroundColor: "#008CBA", padding: 8, borderRadius: 5, alignItems: "center" },
    buttonText: { color: "#fff", fontWeight: "bold" },
    navBar: { flexDirection: "row", justifyContent: "space-around", padding: 10, borderTopWidth: 1, borderColor: "#ddd" },
    cartBadge: { position: "absolute", top: -5, right: -5, backgroundColor: "red", borderRadius: 10, paddingHorizontal: 6 },
    cartText: { color: "white", fontSize: 12, fontWeight: "bold" },
});

export default HomeScreen;
