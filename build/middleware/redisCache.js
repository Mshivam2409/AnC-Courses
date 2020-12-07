"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_redis_cache_1 = __importDefault(require("express-redis-cache"));
const redisCache = express_redis_cache_1.default({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT, auth_pass: process.env.REDIS_AUTH });
exports.default = redisCache;
//# sourceMappingURL=redisCache.js.map