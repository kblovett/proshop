import express from 'express';

// controller imports
import { authUser, getUserProfile } from '../controllers/userController.js';

// middleware imports
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
