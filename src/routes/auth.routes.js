import express from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const authRouter = express.Router();

// Rotas públicas (sem autenticação)
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

// Rotas protegidas (com autenticação)
authRouter.get('/users', authMiddleware, authController.getAllUsers);

export default authRouter;