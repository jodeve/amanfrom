import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import mime from "mime";
import bodyParser from "body-parser";
import { expressjwt } from "express-jwt";
import Page from "./handlers/page";
import Service from "./handlers/service";
import Image from "./handlers/image";
import login from "./handlers/login";
import Message from "./handlers/message";
import path from "path";

configDotenv();

const port = process.env.PORT;

const app = express();

mime.define({
    "image/jpeg": ["jpeg"],
    "image/jpg": ["jpg"],
    "image/png": ["png"],

})

const corsOptions = {
    origin: process.env.FRONTEND_HOST,
    allowedHeaders: "*",
    exposedHeaders: "*",
};

app.use(cors(corsOptions));

//app.use(express.json());

app.use(express.static('public'));

app.use(bodyParser.json({
    limit: "500mb",
}));

app.use(
    bodyParser.urlencoded({
        limit: "500mb",
        parameterLimit: 1000000000000,
        extended: true,
    })
)


app.use(
    expressjwt({
        secret: process.env.TOKEN,
        algorithms: ["HS256"],
    }).unless({
        path: [
            "/api/login",
            { url: "/api", method: "GET" },
            { url: "/api/", method: "GET" },
            { url: "/api/images", method: "GET" }, ,
            { url: "/api/services", method: "GET" },
            { url: "/api/images/", method: "GET" },
            { url: "/api/services/", method: "GET" },
            { url: "/admin/login", method: "GET" },
            { url: "/about", method: "GET" },
            { url: "/services", method: "GET" },
            { url: "/gallery", method: "GET" },
        ]
    })
)

app.get("/api", Page.index)

app.put("/api", Page.update)

app.post("/api/services", Service.store)

app.get("/api/services", Service.index)

app.delete("/api/services/:id", Service.destroy)

app.post("/api/images", Image.store)

app.get("/api/images", Image.index)

app.post("/api/login", login)

app.post("/api/messages", Message.send)

app.get("/*", (_, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(port, () => console.log(`Server running on port: ${port}`));