const express = require("express");
const {createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rating, uploadImages, deleteImages} = require("../controllers/productController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImagesMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin ,createProduct);
router.put(
"/upload",
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
router.delete("/delete-img/:id",  authMiddleware, isAdmin, deleteImages);

router.get("/", getAllProduct);


module.exports = router;