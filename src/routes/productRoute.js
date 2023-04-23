const express = require("express");
const {createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rating, uploadImages} = require("../controllers/productController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImagesMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin ,createProduct);
router.put(
"/upload/:id",
authMiddleware,
isAdmin, 
uploadPhoto.array('images', 10),
productImgResize,
uploadImages
);//subir imagen
router.get("/:id", getaProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware,rating);



router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id",  authMiddleware, isAdmin, deleteProduct);
router.get("/", getAllProduct);


module.exports = router;