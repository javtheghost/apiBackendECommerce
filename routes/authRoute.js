const express = require("express");
const { createUser, loginUserCtrl, getAllUser, updateUser, deleteUser, getaUser,
unBlockUser, blockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken,
resetPassword, loginAdmin, getWishlist, saveAddress, getUserCart, userCart, emptyCart, applyCoupon, createOrder, getOrders, updateOrderStatus} = require("../controllers/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
//importa el orden de estas rutas, register, refresh y logout, si no, no funciona.
router.post("/register", createUser);
router.post("/forgot-password-token",forgotPasswordToken);
router.put("/forgot-password/:token",resetPassword);


router.put("/password", authMiddleware,updatePassword); //restablecer contraseña
router.post("/login", loginUserCtrl);//LOGIN USUARIO
router.post("/login-admin", loginAdmin); //LOGIN ADMIN

router.post("/cart", authMiddleware, userCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder);



router.get("/all-users", getAllUser);
router.get("/get-orders", authMiddleware, getOrders);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);


router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/empty-cart",authMiddleware, emptyCart); //VACIAR CARRITO
router.delete("/:id",authMiddleware, isAdmin, deleteUser);
router.put("/order/update-order/:id", authMiddleware, isAdmin, updateOrderStatus); //CAMBIAR EL ESTADO DEL PEDIDO

router.put("/edit-user/:id", authMiddleware,  isAdmin, updateUser);
router.put("/save-address", authMiddleware, saveAddress);//DIRECCION

router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin,unBlockUser);




module.exports = router;