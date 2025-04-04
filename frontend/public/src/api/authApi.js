const BASE_URL = "http://172.16.51.242:4000/api/auth";

const authApi = {
    login: async (email, password) => {
        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error("Sai tài khoản và mật khẩu!");
            }

            return await response.json();
        } catch (error) {
            console.error("Lỗi khi gọi API đăng nhập:", error);
            return { success: false, message: error.message };
        }
    },

    register: async (userData) => {
        try {
            const response = await fetch(`${BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error("Lỗi đăng ký!");
            }

            return await response.json();
        } catch (error) {
            console.error("Lỗi khi gọi API đăng ký:", error);
            return { success: false, message: error.message };
        }
    }
};

export default authApi;
