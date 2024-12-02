import rateLimit from 'express-rate-limit';

export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many upload requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false
});
