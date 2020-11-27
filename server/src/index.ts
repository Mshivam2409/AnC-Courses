import mongoose from "mongoose"
import express from "express"
import path from "path"
import { config } from "dotenv"
import helmet from "helmet"

config();

import router from "routes/router";
import backupDB from "backup";
import rateLimiterMiddleware from "middleware/DDoS.protector";

const app = express();

app.use(rateLimiterMiddleware, helmet({ contentSecurityPolicy: false }))

app.use("/api", router)


if (process.env.NODE_ENV === "production") {
    const publicPath = process.env.BUILD_DIRECTORY as string
    app.use("/manage", express.static(`${publicPath}/admin`))
    app.use("/manage", (req, res) => {
        res.sendFile(path.resolve(publicPath + "/admin/index.html"));
    })
    app.use(express.static(`${publicPath}/client`));
    app.use("/*", (req, res) => {
        res.sendFile(path.resolve(publicPath + "/client/index.html"));
    });
}
// AnC2020

mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(
                "Listening on " + ", port "
            );
            backupDB.read();
        });
    })
    .catch((err) => {
        console.log(err);
    });