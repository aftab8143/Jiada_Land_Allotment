import { Router } from 'express';
import { index, view, add, edit, deleteEnterpriseType } from '../controllers/enterpriseTypeController.js';
import { validateEnterpriseType } from '../middleware/validateEnterpriseType.js';
import authMiddleware from '../middleware/authMiddleware.js';
import allowRoles     from '../middleware/roleMiddleware.js';

const router = Router();

// Public — read only
router.get('/',    index);
router.get('/:id', view);

// Admin — write operations
router.post('/',      authMiddleware, allowRoles('System Admin', 'Jiada Admin'), validateEnterpriseType, add);
router.put('/:id',    authMiddleware, allowRoles('System Admin', 'Jiada Admin'), validateEnterpriseType, edit);
router.delete('/:id', authMiddleware, allowRoles('System Admin', 'Jiada Admin'), deleteEnterpriseType);

export default router;
