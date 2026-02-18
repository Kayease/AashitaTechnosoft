const BlogPost = require("../models/BlogPost.model");

// @desc    Get all blog posts
// @route   GET /api/blog
exports.getPosts = async (req, res) => {
    try {
        const posts = await BlogPost.find({ status: "published" })
            .populate("author", "name")
            .sort("-publishedAt");
        res.json({ success: true, count: posts.length, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single post by slug
// @route   GET /api/blog/:slug
exports.getPost = async (req, res) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug }).populate("author", "name");
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        res.json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create blog post
// @route   POST /api/blog
exports.createPost = async (req, res) => {
    try {
        req.body.author = req.user.id;
        if (req.body.status === "published") {
            req.body.publishedAt = new Date();
        }
        const post = await BlogPost.create(req.body);
        res.status(201).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update blog post
// @route   PUT /api/blog/:id
exports.updatePost = async (req, res) => {
    try {
        if (req.body.status === "published") {
            req.body.publishedAt = new Date();
        }
        const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        res.json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
exports.deletePost = async (req, res) => {
    try {
        const post = await BlogPost.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        res.json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
