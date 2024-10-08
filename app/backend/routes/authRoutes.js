import express from 'express';
import { loginUser, registerUser, getCurrentUser } from '../controllers/authControllers.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/current-user', getCurrentUser);
export default router
