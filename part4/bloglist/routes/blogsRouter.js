import express from "express";
const router = express.Router();

// Import models
import Blog from "../models/blog.js";

router.get("/", async (req, res) => {
    const response = await Blog.find().exec();
    res.json(response);
});

router.post("/", async (req, res) => {
    const blog = new Blog(req.body);
    const result = await blog.save();
    res.status(201).json(result);
});

export default router;
