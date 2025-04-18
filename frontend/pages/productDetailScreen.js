import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { addNotification } from '../store/notificationSlice';
import cartApi from '../public/src/api/cartApi';


const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  

  const sizes = ['Nhỏ', 'Vừa', 'Lớn'];
  const origins = ['Việt Nam', 'Châu Phi', 'Thái Lan', 'Trung Quốc', 'Hà Lan'];
  const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
  const randomOrigin = origins[Math.floor(Math.random() * origins.length)];
  const randomStock = Math.floor(Math.random() * 200) + 1;

  const handleAddToCart = async () => {
    const cartItem = { ...product, quantity };
    dispatch(addToCart(cartItem));
    try {
      const response = await cartApi.addToCart("67ff280a4347a94f627f79c5", [{ productId: product._id, quantity }]);
      if (response.success) {
        dispatch(
          addNotification({
            message: `Đã thêm ${quantity} "${product.name}" vào giỏ hàng.`,
            image: `http://192.168.1.6:4000${product.image}`,
          })
        );
      } else {
        alert("Lỗi khi thêm vào giỏ hàng server: " + response.message);
      }
    } catch (error) {
      console.error("Lỗi API:", error);
      alert("Đã xảy ra lỗi khi thêm vào giỏ hàng!");
    }
  };
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 200 }}>
        <Image
          source={{ uri: `http://192.168.1.6:4000${product.image}` }}
          style={styles.image}
        />

        <View style={styles.tagsContainer}>
          <Text style={styles.tag}>Cây trồng</Text>
          <Text style={styles.tag}>Ưa bóng</Text>
        </View>
        <Text style={styles.price}>{product.price.toLocaleString()}đ</Text>
        <Text style={styles.sectionTitle}>Chi tiết sản phẩm</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Kích cỡ</Text>
          <Text style={styles.value}>{randomSize}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Xuất xứ</Text>
          <Text style={styles.value}>{randomOrigin}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Tình trạng</Text>
          <Text style={[styles.value, { color: 'green' }]}>Còn {randomStock} sp</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.quantityWrapper}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}>
              <Ionicons name="remove-circle-outline" size={28} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity((prev) => prev + 1)}>
              <Ionicons name="add-circle-outline" size={28} />
            </TouchableOpacity>
          </View>
          <Text style={styles.total}>
            Tạm tính: {(quantity * product.price).toLocaleString()}đ
          </Text>
        </View>

        <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
          <Text style={styles.buyButtonText}>CHỌN MUA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('CartScreen')}
        >
          <Text style={styles.cartButtonText}>XEM GIỎ HÀNG</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#d1f0d5',
    color: '#2e7d32',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    fontSize: 13,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  label: { fontSize: 14, color: '#444' },
  value: { fontSize: 14, fontWeight: '500' },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
  },
  quantityWrapper: {
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 15,
    marginTop: 8,
    fontWeight: '500',
  },
  buyButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cartButton: {
    backgroundColor: '#ddd',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default ProductDetailScreen;
