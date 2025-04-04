const express = require("express");
const { createOrder, getOrdersByUser, updateOrderStatus } = require("../controllers/orderController");
const router = express.Router();

router.post("/", createOrder);
router.get("/user/:userId", getOrdersByUser);
router.put("/:id", updateOrderStatus);
module.exports = router;
