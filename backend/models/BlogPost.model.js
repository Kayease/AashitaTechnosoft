const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        trim: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    content: {
        type: String,
        required: [true, "Please provide content"],
    },
    excerpt: String,
    featuredImage: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        enum: ["technology", "company", "insights", "news"],
        default: "technology",
    },
    tags: [String],
    status: {
        type: String,
        enum: ["draft", "published", "archived"],
        default: "draft",
    },
    publishedAt: Date,
}, { timestamps: true });

// Generate slug before saving
blogPostSchema.pre("save", function (next) {
    if (this.isModified("title")) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }
    next();
});

module.exports = mongoose.model("BlogPost", blogPostSchema);
