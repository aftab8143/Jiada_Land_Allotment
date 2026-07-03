import { Router } from 'express';
import { index, view, add, edit, deleteEnterpriseSector } from '../controllers/enterpriseSectorController.js';
import { validateEnterpriseSector } from '../middleware/validateEnterpriseSector.js';
import authMiddleware from '../middleware/authMiddleware.js';
import allowRoles     from '../middleware/roleMiddleware.js';

const router = Router();

// Public — read only
router.get('/',    index);
router.get('/:id', view);

// Admin — write operations
router.post('/',      authMiddleware, allowRoles('System Admin', 'Jiada Admin'), validateEnterpriseSector, add);
router.put('/:id',    authMiddleware, allowRoles('System Admin', 'Jiada Admin'), validateEnterpriseSector, edit);
router.delete('/:id', authMiddleware, allowRoles('System Admin', 'Jiada Admin'), deleteEnterpriseSector);

export default router;
