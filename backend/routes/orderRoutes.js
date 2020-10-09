import express from 'express';

// controller imports
import { addOrderItems } from '../controllers/orderController.js';

// middleware imports
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);

export default router;
