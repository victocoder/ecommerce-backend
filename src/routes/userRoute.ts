import { Router } from 'express';
import { createUserCont } from '../controllers/userController';
const router = Router();

// POST /api/users
router.post('/', createUserCont);

export default router;