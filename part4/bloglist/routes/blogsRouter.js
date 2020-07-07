import express from "express";
import mongoose from "mongoose";
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
        await Blog.findByIdAndRemove(req.params.id);
        res.status(204).end();
    }
});

export default router;
