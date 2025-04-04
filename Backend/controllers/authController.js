const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.json({ message: "Đăng ký thành công", user });
};
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Sai email hoặc mật khẩu" });
    }
    const token = jwt.sign({ userId: user._id }, "secretKey", { expiresIn: "1h" });
    res.json({ message: "Đăng nhập thành công", token });
};
