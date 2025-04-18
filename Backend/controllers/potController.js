const Pot = require('../models/Pot');

// Lấy danh sách chậu cây
exports.getPots = async (req, res) => {
  try {
    const pots = await Pot.find();
    res.json(pots);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách chậu cây', error });
  }
};

// Lấy chậu cây theo ID
exports.getPotById = async (req, res) => {
  try {
    const pot = await Pot.findById(req.params.id);
    if (!pot) return res.status(404).json({ message: 'Không tìm thấy chậu cây' });
    res.json(pot);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy chậu cây', error });
  }
};

// Thêm chậu cây mới
exports.addPot = async (req, res) => {
  try {
    const { name, price, description, size, material } = req.body;
    const image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

    const newPot = new Pot({
      name,
      price,
      description,
      size,
      material,
      image
    });

    await newPot.save();
    res.status(201).json({ message: 'Chậu cây đã được thêm', pot: newPot });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm chậu cây', error });
  }
};

// Cập nhật chậu cây
exports.updatePot = async (req, res) => {
  try {
    const pot = await Pot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pot) return res.status(404).json({ message: 'Không tìm thấy chậu cây' });
    res.json({ message: 'Chậu cây đã được cập nhật', pot });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật chậu cây', error });
  }
};

// Xóa chậu cây
exports.deletePot = async (req, res) => {
  try {
    const pot = await Pot.findByIdAndDelete(req.params.id);
    if (!pot) return res.status(404).json({ message: 'Không tìm thấy chậu cây' });
    res.json({ message: 'Chậu cây đã được xóa' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa chậu cây', error });
  }
};
