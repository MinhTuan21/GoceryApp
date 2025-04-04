const Product = require("../models/Product");

// Lấy danh sách sản phẩm
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm", error });
    }
};

// Lấy sản phẩm theo ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy sản phẩm", error });
    }
};

// Thêm sản phẩm mới
exports.addProduct = async (req, res) => {
    try {
        const { name, price, category, description, stock } = req.body;
        const image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

        const newProduct = new Product({
            name,
            price,
            category,
            description,
            stock,
            image
        });

        await newProduct.save();
        res.status(201).json({ message: "Sản phẩm đã được thêm", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thêm sản phẩm", error });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        res.json({ message: "Sản phẩm đã được cập nhật", product });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm", error });
    }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        res.json({ message: "Sản phẩm đã được xóa" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa sản phẩm", error });
    }
};
