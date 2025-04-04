const express = require("express");
const multer = require("multer");
const productController = require("../controllers/productController");

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/"); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); 
    }
});

const upload = multer({ storage: storage });

// Routes
router.get("/list", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/", upload.single("image"), productController.addProduct);
router.put("/:id", upload.single("image"), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
