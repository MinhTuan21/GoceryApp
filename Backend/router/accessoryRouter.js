const express = require("express");
const router = express.Router();
const accessoryController = require("../controllers/accessoryController");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/"); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); 
    }
});

const upload = multer({ storage: storage });
router.post("/", upload.single("image"), accessoryController.addAccessory);


router.get("/", accessoryController.getAccessories);
router.get("/:id", accessoryController.getAccessoryById);
router.put("/:id", accessoryController.updateAccessory);
router.delete("/:id", accessoryController.deleteAccessory);

module.exports = router;
