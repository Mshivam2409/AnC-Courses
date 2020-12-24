import { RequestHandler } from "express";

const corsController: RequestHandler = (req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.set("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
}

export default corsController