const Order = require("../models/Order");
exports.createOrder = async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: "Đơn hàng đã được tạo", order });
};
exports.getOrdersByUser = async (req, res) => {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
};
exports.updateOrderStatus = async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    res.json({ message: "Trạng thái đơn hàng đã được cập nhật", order });
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        res.json({ message: "Đơn hàng đã được xóa" });
    } catch (error) {
        res.status(500).json({ message: "Looi khi xóa đơn hàng", error });
    }
};
