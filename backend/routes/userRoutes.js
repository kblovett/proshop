import express from 'express';

// controller imports
import { authUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', authUser);

export default router;
