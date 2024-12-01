import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { addTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js';

const router = Router();

// Aplica autenticação para todas as rotas de tarefas
router.use(authenticate);

router.post('/', addTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
