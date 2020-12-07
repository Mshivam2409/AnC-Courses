"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const opts = {
    points: 10,
    duration: 1,
};
const rateLimiter = new rate_limiter_flexible_1.RateLimiterMemory(opts);
const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter.consume(req.connection.remoteAddress)
        .then(() => {
        next();
    })
        .catch((rejRes) => {
        console.log("POSSIBLE DDOS ATTACK!!");
        res.status(429).send('Too Many Requests');
    });
};
exports.default = rateLimiterMiddleware;
//# sourceMappingURL=DDoS.protector.js.map