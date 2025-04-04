import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const ProductItem = ({ product }) => {
    const dispatch = useDispatch();
    const [showNotification, setShowNotification] = useState(false);

    const handleAddToCart = () => {
        dispatch(addToCart(product));

      
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 1000);
    };

    return (
        <div>
            <h3>{product.name}</h3>
            <p>Giá: {product.price}đ</p>
            <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>

            {showNotification && <span style={{ color: "green", marginLeft: 10 }}>+1</span>}
        </div>
    );
};

export default ProductItem;
