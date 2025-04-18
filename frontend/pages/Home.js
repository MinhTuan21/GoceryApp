import React, { useEffect } from "react";
import {
  View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { fetchPots } from "../store/potSlice";
import { fetchAccessories } from "../store/accessorySlice";
import { addToCart } from "../store/cartSlice";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items: products, loading: loadingProducts } = useSelector((state) => state.products);
  const { items: pots, loading: loadingPots } = useSelector((state) => state.pots);
  const { items: accessories, loading: loadingAccessories } = useSelector((state) => state.accessories);
  const totalItems = useSelector((state) => state.cart.totalItems);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchPots());
    dispatch(fetchAccessories());
  }, [dispatch]);

  const renderGridItems = (data, onPress) => (
    <View style={styles.gridContainer}>
      {data.map((item) => (
        <TouchableOpacity key={item._id} style={styles.productCard} onPress={() => onPress(item)}>
          <Image source={{ uri: `http://192.168.1.6:4000${item.image}` }} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price}đ</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerTitle}>Planta - toả sáng không gian nhà bạn</Text>
          <TouchableOpacity onPress={() => {}} style={styles.viewNewBtn}>
            <Text style={styles.viewNewText}>Xem hàng mới về</Text>
            <Ionicons name="arrow-forward" size={16} color="#4CAF50" />
          </TouchableOpacity>
        </View>
        <Image source={require("../assets/images/login.png")} style={styles.headerImage} />
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")} style={styles.cartIcon}>
          <Ionicons name="cart-outline" size={28} color="black" />
          {totalItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      
        <Text style={styles.sectionTitle}>Cây trồng</Text>
        {loadingProducts ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          renderGridItems(products, (item) => navigation.navigate("ProductDetail", { product: item }))
        )}
        <Text style={styles.sectionTitle}>Chậu cây</Text>
        {loadingPots ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          renderGridItems(pots, (item) => navigation.navigate("PotDetail", { pot: item }))
        )}
        <Text style={styles.sectionTitle}>Phụ kiện</Text>
        {loadingAccessories ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          renderGridItems(accessories, (item) => navigation.navigate("AccessoryDetail", { accessory: item }))
        )}
      </ScrollView>

    
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
          <Ionicons name="search" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen")}>
          <Ionicons name="notifications-outline" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <Ionicons name="person-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#F2F3F4",
    padding: 16,
    paddingTop: 50,
    alignItems: "flex-start",
    justifyContent: "space-between",
    position: "relative",
  },
  headerTextWrapper: { flex: 1, marginRight: 8 },
  headerTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  viewNewBtn: { flexDirection: "row", alignItems: "center" },
  viewNewText: { color: "#4CAF50", fontWeight: "500", marginRight: 4 },
  headerImage: { width: 100, height: 100, resizeMode: "contain" },
  cartIcon: { position: "absolute", top: 50, right: 16 },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cartText: { color: "white", fontSize: 12, fontWeight: "bold" },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  productCard: {
    width: "48%",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 10,
    resizeMode: "cover",
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 6,
  },
  price: {
    fontSize: 14,
    color: "green",
    fontWeight: "500",
    marginTop: 2,
  },

  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default HomeScreen;
