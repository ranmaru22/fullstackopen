import express from "express";
import Blog from "../models/blog.js";
import User from "../models/user.js";

const router = express.Router();

router.post("/reset", async (req, res) => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    res.status(204).end();
});

export default router;
