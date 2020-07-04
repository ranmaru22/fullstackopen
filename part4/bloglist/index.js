import "./utils/env.js";
import http from "http";
import mongoose from "mongoose";

import app from "./app.js";

const server = http.createServer(app);
const PORT = process.env.PORT || 3003;

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    () => console.log("Connected to MongoDB ...")
);

server.listen(PORT, () => console.log("Server up and running on port", PORT));
