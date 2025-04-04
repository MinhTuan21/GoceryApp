const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const atlat = "mongodb+srv://tuandvmpd10690:21062005a@cluster0.i6twh.mongodb.net/PlantShop?retryWrites=true&w=majority&appName=Cluster0";

const connect = async () => {
    try {
        await mongoose.connect(atlat);
        console.log("✅ Kết nối MongoDB thành công");
    } catch (error) {
        console.log("❌ Kết nối MongoDB thất bại", error);
    }
};

module.exports = { connect };
