import express from 'express';

// controller imports
import { addOrderItems, getOrderById } from '../controllers/orderController.js';

// middleware imports
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);

export default router;
