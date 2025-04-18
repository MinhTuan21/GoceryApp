const BASE_URL = "http://192.168.1.6:4000/api/auth";

const authApi = {
    login: async (email, password) => {
        console.log("Thông tin đăng nhập:", { email, password }); 

        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: "Lỗi không xác định" }));
                console.log("Lỗi đăng nhập:", errorData); // Log lỗi nếu có
                throw new Error(errorData.message || "Sai tài khoản và mật khẩu!");
            }

            const result = await response.json();
            console.log("Kết quả đăng nhập:", result); // Log kết quả đăng nhập
            return result;
        } catch (error) {
            console.error("Lỗi khi gọi API đăng nhập:", error);
            return { success: false, message: error.message };
        }
    },

    register: async (userData) => {
        console.log("Thông tin đăng ký:", userData); // Log thông tin đăng ký

        try {
            const response = await fetch(`${BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: "Lỗi không xác định" }));
                console.log("Lỗi đăng ký:", errorData); // Log lỗi nếu có
                throw new Error(errorData.message || "Lỗi đăng ký!");
            }

            const result = await response.json();
            console.log("Kết quả đăng ký:", result); // Log kết quả đăng ký
            return result;
        } catch (error) {
            console.error("Lỗi khi gọi API đăng ký:", error);
            return { success: false, message: error.message };
        }
    },

    forgotPassword: async (email) => {
        console.log("Yêu cầu quên mật khẩu:", { email });
    
        try {
            const response = await fetch(`${BASE_URL}/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
    
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: "Lỗi không xác định" }));
                console.log("Lỗi quên mật khẩu:", errorData);
                
                // Kiểm tra lỗi từ phía server và trả về mã 400 nếu có
                if (errorData.message === "Mã OTP đã được gửi gần đây. Hãy thử lại sau") {
                    // Thông báo cho người dùng biết phải chờ thêm
                    throw { status: 400, message: "Vui lòng đợi một lúc trước khi yêu cầu mã OTP mới." };
                }
    
                throw new Error(errorData.message || "Lỗi khi gửi yêu cầu quên mật khẩu!");
            }
    
            const result = await response.json();
            console.log("Kết quả quên mật khẩu:", result);
            return result;
        } catch (error) {
            console.error("Lỗi khi gọi API quên mật khẩu:", error);
            // Nếu lỗi có mã status 400 thì trả về thông báo tương ứng
            if (error.status === 400) {
                return { success: false, status: 400, message: error.message };
            }
            return { success: false, message: error.message };
        }
    },

    resetPassword: async (email, otp, newPassword) => {
        console.log("Yêu cầu thay đổi mật khẩu:", { email, otp, newPassword });

        if (newPassword.length < 8) {
            return { success: false, message: "Mật khẩu mới phải có ít nhất 8 ký tự!" };
        }

        try {
            const response = await fetch(`${BASE_URL}/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, newPassword })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: "Lỗi không xác định" }));
                console.log("Lỗi thay đổi mật khẩu:", errorData);
                throw new Error(errorData.message || "Lỗi khi thay đổi mật khẩu!");
            }

            const result = await response.json();
            console.log("Kết quả thay đổi mật khẩu:", result);
            return result;
        } catch (error) {
            console.error("Lỗi khi gọi API thay đổi mật khẩu:", error);
            return { success: false, message: error.message };
        }
    }
};

export default authApi;
