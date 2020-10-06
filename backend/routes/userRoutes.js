import express from 'express';

// controller imports
import {
  registerUser,
  authUser,
  getUserProfile,
} from '../controllers/userController.js';

// middleware imports
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
