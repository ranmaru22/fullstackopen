import config from "./utils/config.js";
import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cors from "cors";

// Import routes
import blogsRouter from "./routes/blogsRouter.js";

const app = express();

mongoose.connect(
    config.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    () => console.log("Connected to MongoDB ...")
);

app.use(cors());
app.use(express.json());

// Set routes
app.use("/api/blogs", blogsRouter);

export default app;
