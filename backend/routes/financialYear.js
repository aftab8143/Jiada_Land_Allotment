import { Router } from 'express';
import { index, view, add, edit, deleteFinancialYear } from '../controllers/financialYearController.js';
import { validateFinancialYear } from '../middleware/validateFinancialYear.js';
import authMiddleware from '../middleware/authMiddleware.js';
import allowRoles     from '../middleware/roleMiddleware.js';

const router = Router();

// Public — read only
router.get('/',    index);
router.get('/:id', view);

// Admin — write operations
router.post('/',      authMiddleware, allowRoles('admin'), add);
router.put('/:id',    authMiddleware, allowRoles('admin'), edit);
router.delete('/:id', authMiddleware, allowRoles('admin'), deleteFinancialYear);

export default router;
