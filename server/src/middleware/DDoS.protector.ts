import { RequestHandler } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";

const opts = {
    points: 10, // Number of points
    duration: 1, // Per second(s)
};

const rateLimiter = new RateLimiterMemory(opts);

const rateLimiterMiddleware: RequestHandler = (req, res, next) => {
    rateLimiter.consume(req.connection.remoteAddress as string)
        .then(() => {
            next();
        })
        .catch((rejRes) => {
            res.status(429).json({ message: 'We have DDOS Protection Son! Try somewhere else! Awwwwwwwwwwwwwwwwwwwww:))' });
        });
};

export default rateLimiterMiddleware