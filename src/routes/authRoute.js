const express = require("express");
const { createUser, loginUserCtrl, getAllUser, updateUser, deleteUser } = require("../controllers/userController");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/all-users", getAllUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);


module.exports = router;