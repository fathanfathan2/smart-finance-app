import express from 'express';
import { getDashboard } from '../controllers/dashboardController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Ini akan diakses melalui http://localhost:3000/api/dashboard
router.get('/', authenticate, getDashboard);

export default router;
