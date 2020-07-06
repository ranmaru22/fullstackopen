import http from "http";
import config from "./utils/config.js";
import app from "./app.js";

const server = http.createServer(app);

server.listen(config.PORT, () =>
    console.log("Server up and running on port", config.PORT)
);
