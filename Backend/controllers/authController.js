const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.json({ message: "Đăng ký thành công", user });
    } catch (error) {
        res.status(500).json({ message: "Đã có lỗi xảy ra khi đăng ký", error });
    }
};
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Sai email hoặc mật khẩu" });
        }
        const token = jwt.sign({ userId: user._id }, "secretKey", { expiresIn: "1h" });
        res.json({ message: "Đăng nhập thành công", token });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi đăng nhập", error });
    }
};

exports.getUserList = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json({ message: "Danh sách tài khoản", users });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};


exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email không tồn tại" });
        }

       
        if (user.otpExpire && user.otpExpire > Date.now()) {
            return res.status(400).json({ message: "Mã OTP đã được gửi gần đây. Hãy thử lại sau" });
        }

        
        const otp = crypto.randomBytes(3).toString("hex"); 

        
        user.otp = otp;
        user.otpExpire = Date.now() + 2 * 60 * 1000;

        await user.save();

        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Mã OTP phục hồi mật khẩu",
            text: `Mã OTP của bạn là: ${otp}. Mã này có hiệu lực trong 1 giờ.`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Mã OTP đã được gửi tới email của bạn." });
    } catch (error) {
        console.error("Lỗi khi xử lý yêu cầu quên mật khẩu:", error); 
        res.status(500).json({ message: "Lỗi khi xử lý yêu cầu quên mật khẩu", error });
    }
};


exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({ message: "Mật khẩu mới phải dài ít nhất 8 ký tự" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email không tồn tại" });
        }

        
        if (user.otp !== otp) {
            return res.status(400).json({ message: "Mã OTP không đúng" });
        }
        if (user.otpExpire < Date.now()) {
            return res.status(400).json({ message: "Mã OTP đã hết hạn" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.otp = undefined;
        user.otpExpire = undefined;
        await user.save();

        res.json({ success: true, message: "Mật khẩu đã được thay đổi thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thay đổi mật khẩu", error });
    }
};
