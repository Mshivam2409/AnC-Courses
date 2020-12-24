import mongoose from "mongoose"
import express from "express"
import path from "path"
import dotenv from "dotenv"
import helmet from "helmet"

dotenv.config();

import router from "routes/router";
import backupDB from "backup";
import rateLimiterMiddleware from "middleware/DDoS.protector";
import errorController from "controllers/errorController"
import corsController from "middleware/setCorsHeaders"
import postgresClient from "postgres"

const app = express();

app.use(rateLimiterMiddleware, helmet({ contentSecurityPolicy: false }), corsController)

app.use("/api", router)

app.use(express.static(`${process.env.BUILD_DIRECTORY as string}/html`))
app.use("/*", (req, res) => {
    res.status(403).sendFile(path.resolve(`${process.env.BUILD_DIRECTORY as string}/html/index.html`));
});

app.use(errorController)

mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => {
        postgresClient.authenticate().then(() => {
            app.listen(process.env.PORT || 5000, () => {
                console.log(
                    "Listening!"
                );
                backupDB.read();
            });
        })
    })
    .catch((err) => {
        console.log(err);
    });