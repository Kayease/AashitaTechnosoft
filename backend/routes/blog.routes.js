const express = require("express");
const router = express.Router();
const { getPosts, getPost, createPost, updatePost, deletePost } = require("../controllers/blog.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

// Public routes
router.get("/", getPosts);
router.get("/:slug", getPost);

// Protected routes
router.post("/", protect, authorize("admin"), createPost);
router.put("/:id", protect, authorize("admin"), updatePost);
router.delete("/:id", protect, authorize("admin"), deletePost);

module.exports = router;
