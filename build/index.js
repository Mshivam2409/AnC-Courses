"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.config();
const router_1 = __importDefault(require("routes/router"));
const backup_1 = __importDefault(require("backup"));
const DDoS_protector_1 = __importDefault(require("middleware/DDoS.protector"));
const app = express_1.default();
app.use(DDoS_protector_1.default, helmet_1.default({ contentSecurityPolicy: false }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
app.use("/api", router_1.default);
if (process.env.NODE_ENV === "production") {
    const publicPath = process.env.BUILD_DIRECTORY;
    app.use("/manage", express_1.default.static(`${publicPath}/admin`));
    app.use("/manage", (req, res) => {
        res.sendFile(path_1.default.resolve(publicPath + "/admin/index.html"));
    });
    app.use(express_1.default.static(`${publicPath}/client`));
    app.use("/*", (req, res) => {
        res.sendFile(path_1.default.resolve(publicPath + "/client/index.html"));
    });
}
// AnC2020
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log("Listening on " + ", port ");
        backup_1.default.read();
    });
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map