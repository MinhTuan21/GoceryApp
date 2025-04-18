const Accessory = require("../models/accessory");
exports.getAccessories = async (req, res) => {
  try {
    const accessories = await Accessory.find();
    res.json(accessories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách phụ kiện", error });
  }
};

exports.getAccessoryById = async (req, res) => {
  try {
    const accessory = await Accessory.findById(req.params.id);
    if (!accessory) return res.status(404).json({ message: "Không tìm thấy phụ kiện" });
    res.json(accessory);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy phụ kiện", error });
  }
};


exports.addAccessory = async (req, res) => {
  try {
    const { name, price, description, type } = req.body;
    const image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

    const newAccessory = new Accessory({
      name,
      price,
      description,
      type,
      image
    });

    await newAccessory.save();
    res.status(201).json({ message: "Phụ kiện đã được thêm", accessory: newAccessory });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm phụ kiện", error });
  }
};


exports.updateAccessory = async (req, res) => {
  try {
    const accessory = await Accessory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!accessory) return res.status(404).json({ message: "Không tìm thấy phụ kiện" });
    res.json({ message: "Phụ kiện đã được cập nhật", accessory });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật phụ kiện", error });
  }
};
exports.deleteAccessory = async (req, res) => {
  try {
    const accessory = await Accessory.findByIdAndDelete(req.params.id);
    if (!accessory) return res.status(404).json({ message: "Không tìm thấy phụ kiện" });
    res.json({ message: "Phụ kiện đã được xóa" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa phụ kiện", error });
  }
};
