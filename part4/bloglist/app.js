import express from "express";
import cors from "cors";

// Import routes
import blogsRouter from "./routes/blogsRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

// Set routes
app.use("/api/blogs", blogsRouter);

export default app;
