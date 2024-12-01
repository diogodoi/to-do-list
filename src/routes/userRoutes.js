import { Router } from 'express';
import { register, login, logout } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

// Rota para registro de novos usuários
router.post('/register', register);

// Rota para login de usuários
router.post('/login', login);

// Rota para logout do usuário (protegida por autenticação)
router.post('/logout', authenticate, logout);

export default router;
