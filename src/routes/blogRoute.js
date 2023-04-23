const express = require("express");
const { createBlog, updateBlog, getAllBlogs, deleteBlog, likeTheBlog, dislikeBlog, getBlog } = require("../controllers/blogController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin,createBlog);
router.put("/likes", authMiddleware, likeTheBlog);
router.put("/dislikes", authMiddleware, dislikeBlog);


router.put("/:id", authMiddleware, isAdmin,updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlogs);
router.delete("/:id", authMiddleware, isAdmin,deleteBlog);





module.exports = router;
