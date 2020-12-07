import cache from "express-redis-cache"

const redisCache = cache({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT, auth_pass: process.env.REDIS_AUTH })

export default redisCache