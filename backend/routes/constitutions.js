import { Router } from 'express';
import { index, view, add, edit, deleteConstitution } from '../controllers/constitutionController.js';
import { validateConstitution } from '../middleware/validateConstitution.js';
import authMiddleware from '../middleware/authMiddleware.js';
import allowRoles     from '../middleware/roleMiddleware.js';

const router = Router();

// Public — read only
router.get('/',    index);
router.get('/:id', view);

// Admin — write operations
router.post('/',    authMiddleware, allowRoles('admin'), validateConstitution, add);
router.put('/:id',  authMiddleware, allowRoles('admin'), validateConstitution, edit);
router.delete('/:id', authMiddleware, allowRoles('admin'), deleteConstitution);

export default router;
