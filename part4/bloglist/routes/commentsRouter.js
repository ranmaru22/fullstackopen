import express from "express";
import jwt from "jsonwebtoken";
import Blog from "../models/blog.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const getFromBlogId = req.query.blog || null;
    if (!getFromBlogId) {
        const response = await Comment.find().populate("user", "-blogs").exec();
        res.json(response);
    } else {
        const blog = await Blog.findById(getFromBlogId).populate("comments", "-user -blog").exec();
        res.json(blog.comments);
    }
});

router.get("/:id", async (req, res) => {
    const response = await Comment.findById(req.params.id).populate("user", "-blogs").exec();
    if (!response) {
        res.status(404).end();
    } else {
        res.json(response);
    }
});

router.post("/", async (req, res) => {
    if (!req.body.text) {
        res.status(400).end();
    } else {
        const decodedToken = req.token ? jwt.verify(req.token, process.env.JWT_SECRET) : null;
        if (!req.token || !decodedToken.id) {
            res.status(401).json({ error: "token missing" });
        } else {
            const user = await User.findById(decodedToken.id).exec();
            const comment = new Comment({ user: user._id, ...req.body });
            const result = await comment.save();
            await Blog.findByIdAndUpdate(
                comment.blog,
                { $push: { comments: comment } },
                { new: true }
            );
            res.status(201).json(result.toJSON());
        }
    }
});

export default router;
