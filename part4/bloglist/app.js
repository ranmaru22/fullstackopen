import config from "./utils/config.js";
import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cors from "cors";
import mw from "./utils/middleware.js";

// Import routes
import blogsRouter from "./routes/blogsRouter.js";
import userRouter from "./routes/userRouter.js";
import loginRouter from "./routes/loginRouter.js";

const app = express();

mongoose.connect(
    config.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    () => console.log("Connected to MongoDB ...")
);

app.use(cors());
app.use(express.json());
app.use(mw.getToken);

// Set routes
app.use("/api/blogs", blogsRouter);
app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);

// Error handler
app.use((err, req, res, next) => {
    if (err.message.includes("CastError")) {
        res.status(404).json({ error: "not found" });
    } else if (err.message.includes("password too weak")) {
        res.status(400).json({ error: err.message });
    } else if (err.message.includes("User validation failed")) {
        res.status(400).json({ error: err.message });
    } else if (err.name.includes("JsonWebTokenError")) {
        res.status(401).json({ error: "invalid token" });
    } else {
        next();
    }
});

export default app;
