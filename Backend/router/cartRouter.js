const express = require("express");
const CartController = require("../controllers/cartController");
const router = express.Router();


router.get("/:userId", CartController.getCart);

router.post("/add", CartController.addToCart);

router.put("/update", CartController.updateCart);
router.delete("/delete/:userId/:productId", CartController.removeFromCart);
router.delete("/clear/:userId", CartController.clearCart);

module.exports = router;