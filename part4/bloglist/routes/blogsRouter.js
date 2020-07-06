import express from "express";
const router = express.Router();

// Import models
import Blog from "../models/blog.js";

router.get("/", async (req, res) => {
    const response = await Blog.find().exec();
    res.json(response);
});

router.post("/", async (req, res) => {
    if (!req.body.title || !req.body.url) {
        res.status(400).end();
    } else {
        const blog = new Blog(req.body);
        const result = await blog.save();
        res.status(201).json(result.toJSON());
    }
});

export default router;
