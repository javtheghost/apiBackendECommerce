const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createCoupon, updateCoupon, deleteCoupon, getAllCoupon, getCoupon } = require("../controllers/couponController");
const router = express.Router();

router.post("/", authMiddleware, isAdmin,createCoupon);
router.put("/:id", authMiddleware, isAdmin,updateCoupon);
router.get("/:id",  authMiddleware, isAdmin,getCoupon);
router.get("/", authMiddleware, isAdmin, getAllCoupon);
router.delete("/:id", authMiddleware, isAdmin,deleteCoupon);





module.exports = router;
