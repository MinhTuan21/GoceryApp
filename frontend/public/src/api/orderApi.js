// const API_URL = "http://192.168.1.6:4000/api/orders"; 

// export async function createOrder(orderData) {
//     try {
//         const response = await fetch(API_URL, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(orderData),
//         });
//         if (!response.ok) throw new Error("Không thể tạo đơn hàng");
//         return await response.json();
//     } catch (error) {
//         console.error("Lỗi khi tạo đơn hàng:", error);
//         return null;
//     }
// }

// export async function getOrdersByUser(userId) {
//     try {
//         const response = await fetch(`${API_URL}/user/${userId}`);
//         if (!response.ok) throw new Error("Không thể lấy đơn hàng");
//         return await response.json();
//     } catch (error) {
//         console.error("Lỗi khi lấy đơn hàng:", error);
//         return [];
//     }
// }

// export async function updateOrderStatus(orderId, status) {
//     try {
//         const response = await fetch(`${API_URL}/${orderId}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ status }),
//         });
//         if (!response.ok) throw new Error("Không thể cập nhật trạng thái đơn hàng");
//         return await response.json();
//     } catch (error) {
//         console.error("Lỗi khi cập nhật đơn hàng:", error);
//         return null;
//     }
// }
