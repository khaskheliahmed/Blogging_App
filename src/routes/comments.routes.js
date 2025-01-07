import express from 'express';
import { commentOnPost } from '../controllers/comments.controllers.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/comment', authMiddleware, commentOnPost);

export default router;