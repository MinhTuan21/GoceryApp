const Cart = require("../models/cart");

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate("products.productId");
        if (!cart) return res.status(404).json({ message: "Giỏ hàng trống" });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy giỏ hàng", error });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { userId, products } = req.body; 

        if (!userId || !products || !products.length) {
            return res.status(400).json({ message: "userId và danh sách sản phẩm là bắt buộc" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, products });
        } else {
            products.forEach(({ productId, quantity }) => {
                const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
                if (productIndex > -1) {
                    cart.products[productIndex].quantity += quantity;
                } else {
                    cart.products.push({ productId, quantity });
                }
            });
        }

        await cart.save();
        res.json({ message: "Sản phẩm đã được thêm vào giỏ hàng", cart });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thêm sản phẩm vào giỏ hàng", error });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (productIndex > -1) {
            cart.products[productIndex].quantity = quantity;
            await cart.save();
            res.json({ message: "Giỏ hàng đã được cập nhật", cart });
        } else {
            res.status(404).json({ message: "Sản phẩm không tồn tại trong giỏ hàng" });
        }
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật giỏ hàng", error });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });

        cart.products = cart.products.filter(p => p.productId.toString() !== productId);
        await cart.save();
        res.json({ message: "Sản phẩm đã được xóa khỏi giỏ hàng", cart });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa sản phẩm khỏi giỏ hàng", error });
    }
};

exports.clearCart = async (req, res) => {
    try {
        const { userId } = req.params;
        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });

        cart.products = [];
        await cart.save();
        res.json({ message: "Giỏ hàng đã được làm trống" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi làm trống giỏ hàng", error });
    }
};