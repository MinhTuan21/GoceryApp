import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getOrdersByUser, updateOrderStatus } from "../redux/slices/orderSlice";

const OrderScreen = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(getOrdersByUser("12345")); 
    }, [dispatch]);

    const handleCreateOrder = () => {
        const newOrder = {
            userId: "12345",
            products: [{ productId: "abc123", quantity: 2 }],
            totalAmount: 500,
        };
        dispatch(createOrder(newOrder));
    };

    const handleUpdateOrder = (orderId) => {
        dispatch(updateOrderStatus({ orderId, status: "Shipped" }));
    };

    return (
        <div>
            <h2>Danh sách Đơn Hàng</h2>
            {loading && <p>Đang tải...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleCreateOrder}>Tạo Đơn Hàng</button>

            <ul>
                {orders.map((order) => (
                    <li key={order._id}>
                        Đơn hàng {order._id} - Trạng thái: {order.status}
                        <button onClick={() => handleUpdateOrder(order._id)}>Cập nhật trạng thái</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderScreen;
