import express from "express"
import {
    authorizeRole,
    isAuthenticatedUser,
  } from "../middlewares/userAuthencation.js";
import { allOrders, deleteOrders, getOrderDetails, myOrders, newOrder, updateOrder } from "../controllers/orderController.js";
const router = express.Router();


router.route("/orders/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/me/orders").get(isAuthenticatedUser, myOrders);

router.route("/admin/orders")
.get(isAuthenticatedUser,authorizeRole("admin"), allOrders);

router.route("/admin/orders/:id")
.put(isAuthenticatedUser,authorizeRole("admin"), updateOrder)
.delete(isAuthenticatedUser,authorizeRole("admin"), deleteOrders);




export default router;
