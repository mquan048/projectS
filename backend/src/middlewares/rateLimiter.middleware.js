// src/middleware/rateLimiter.middleware.js
import rateLimit from 'express-rate-limit';

export const uploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 10, // Tối đa 10 request mỗi IP
    message: 'Too many upload requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false
});
