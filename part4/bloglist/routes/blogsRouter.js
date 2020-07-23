import express from "express";
import jwt from "jsonwebtoken";
import Blog from "../models/blog.js";
import User from "../models/user.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const response = await Blog.find().populate("user", "-blogs").exec();
    res.json(response);
});

router.post("/", async (req, res) => {
    if (!req.body.title || !req.body.url) {
        res.status(400).end();
    } else {
        const decodedToken = req.token ? jwt.verify(req.token, process.env.JWT_SECRET) : null;
        if (!req.token || !decodedToken.id) {
            res.status(401).json({ error: "token missing" });
        } else {
            const user = await User.findById(decodedToken.id).exec();
            const blog = new Blog({ user: user.id, ...req.body });
            const result = await blog.save();
            await User.findByIdAndUpdate(user.id, { $push: { blogs: blog } });
            res.status(201).json(result.toJSON());
        }
    }
});

router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id).exec();
    if (!blog) {
        res.status(404).end();
    } else {
        res.json(blog);
    }
});

router.delete("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id).exec();
    if (!blog) {
        res.status(404).end();
    } else {
        const decodedToken = req.token ? jwt.verify(req.token, process.env.JWT_SECRET) : null;
        if (!req.token || !decodedToken.id) {
            res.status(401).json({ error: "token missing" });
        } else if (!blog.user.equals(decodedToken.id)) {
            res.status(401).json({ error: "not authorized" });
        } else {
            const user = await User.findOne(blog.user).exec();
            await user.update({ $pull: { blogs: blog._id } });
            await Blog.findByIdAndRemove(req.params.id);
            res.status(204).end();
        }
    }
});

router.patch("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id).exec();
    if (!blog) {
        res.status(404).end();
    } else {
        const isLikeOnlyPatch = Object.keys(req.body).length === 1 && "likes" in req.body;
        const decodedToken = req.token ? jwt.verify(req.token, process.env.JWT_SECRET) : null;
        if (!req.token || !decodedToken.id) {
            res.status(401).json({ error: "token missing" });
        } else if (!isLikeOnlyPatch && !blog.user.equals(decodedToken.id)) {
            res.status(401).json({ error: "not authorized" });
        } else {
            const patchedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            }).exec();
            res.status(200).json(patchedBlog);
        }
    }
});

export default router;
