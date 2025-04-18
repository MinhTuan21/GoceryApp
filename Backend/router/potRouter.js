const express = require('express');
const router = express.Router();
const potController = require('../controllers/potController');
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
router.post('/', upload.single('image'), potController.addPot);

// Các route khác
router.get('/', potController.getPots);
router.get('/:id', potController.getPotById);
router.put('/:id', potController.updatePot);
router.delete('/:id', potController.deletePot);

module.exports = router;
