import { Router } from 'express';
import { index, view, add, edit, deleteActivity } from '../controllers/natureOfActivityController.js';
import { validateNatureOfActivity } from '../middleware/validateNatureOfActivity.js';
import authMiddleware from '../middleware/authMiddleware.js';
import allowRoles     from '../middleware/roleMiddleware.js';

const router = Router();

// Public — read only
router.get('/',    index);
router.get('/:id', view);

// Admin — write operations
router.post('/',      authMiddleware, allowRoles('admin'), validateNatureOfActivity, add);
router.put('/:id',    authMiddleware, allowRoles('admin'), validateNatureOfActivity, edit);
router.delete('/:id', authMiddleware, allowRoles('admin'), deleteActivity);

export default router;
