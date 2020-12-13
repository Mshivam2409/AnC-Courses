import { ErrorRequestHandler } from "express";
import HttpError from "models/httpError";

const errorController: ErrorRequestHandler = (error: HttpError, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    if (error.name === 'UnauthorizedError') {
        res.status(401).send({ message: "Unauthorized Access!" });
    }
    else {
        res.status(error.code || 500);
        res.json({ message: error.message || "An unknown error occured!" });
    }
}

export default errorController