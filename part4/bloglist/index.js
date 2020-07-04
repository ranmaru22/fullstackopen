import "./utils/env.js";
import http from "http";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import Blog from "./models/blog.js";

const app = express();

const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(
    mongoUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    () => console.log("Connected to MongoDB ...")
);

app.use(cors());
app.use(express.json());

app.get("/api/blogs", async (req, res) => {
    const response = await Blog.find().exec();
    res.json(response);
});

app.post("/api/blogs", async (req, res) => {
    const blog = new Blog(req.body);
    const result = await blog.save();
    res.status(201).json(result);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log("Server up and running on port", PORT));
