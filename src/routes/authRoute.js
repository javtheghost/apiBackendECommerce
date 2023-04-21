const express = require("express");
const { createUser, loginUserCtrl, getAllUser, updateUser, deleteUser, getaUser,
unBlockUser, blockUser, handleRefreshToken, logout } = require("../controllers/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
//importa el orden de estas rutas, register, refresh y logout, si no, no funciona.
router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/all-users", getAllUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);

router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/:id", deleteUser);
router.put("edit-user/:id", authMiddleware, updateUser);


router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin,unBlockUser);




module.exports = router;