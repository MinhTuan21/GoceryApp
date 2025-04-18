const BASE_URL = "http://192.168.1.6:4000/api/cart";

const cartApi = {
    getCart: async (userId) => {
        try {
            const response = await fetch(`${BASE_URL}/${userId}`);
            if (!response.ok) throw new Error("Không thể lấy giỏ hàng");
            return await response.json();
        } catch (error) {
            console.error("Lỗi khi lấy giỏ hàng:", error);
            return { success: false, message: error.message };
        }
    },

    addToCart: async (userId, products) => {
        try {
            const response = await fetch(`${BASE_URL}/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, products })
            });
            if (!response.ok) throw new Error("Không thể thêm sản phẩm vào giỏ hàng");
            return await response.json();
        } catch (error) {
            console.error(":", error);//Lỗi khi thêm vào giỏ hàng
            return { success: false, message: error.message };
        }
    },

    updateCart: async (userId, productId, quantity) => {
        try {
            const response = await fetch(`${BASE_URL}/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, productId, quantity })
            });
            if (!response.ok) throw new Error("Không thể cập nhật giỏ hàng");
            return await response.json();
        } catch (error) {
            console.error("Lỗi khi cập nhật giỏ hàng:", error);
            return { success: false, message: error.message };
        }
    },

    removeFromCart: async (userId, productId) => {
        try {
            const response = await fetch(`${BASE_URL}/delete/${userId}/${productId}`, {
                method: "DELETE"
            });
            if (!response.ok) throw new Error("Không thể xoá sản phẩm khỏi giỏ");
            return await response.json();
        } catch (error) {
            console.error("Lỗi khi xoá sản phẩm khỏi giỏ:", error);
            return { success: false, message: error.message };
        }
    },

    clearCart: async (userId) => {
        try {
            const response = await fetch(`${BASE_URL}/clear/${userId}`, {
                method: "DELETE"
            });
            if (!response.ok) throw new Error("Không thể xoá toàn bộ giỏ hàng");
            return await response.json();
        } catch (error) {
            console.error("Lỗi khi xoá toàn bộ giỏ hàng:", error);
            return { success: false, message: error.message };
        }
    }
};

export default cartApi;
