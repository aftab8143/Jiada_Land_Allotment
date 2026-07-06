import { Router } from 'express';
import { index, view, add, edit, deleteGroup } from '../controllers/groupController.js';
import { validateGroup } from '../middleware/validateGroup.js';
import authMiddleware from '../middleware/authMiddleware.js';
import allowRoles     from '../middleware/roleMiddleware.js';
import { ROLES }      from '../constants/roles.js';

const router = Router();

// Protected — read only
router.get('/',    authMiddleware, index);
router.get('/:id', authMiddleware, view);

// Admin — write operations
router.post('/',    authMiddleware, allowRoles(ROLES.SYSTEM_ADMIN, ROLES.JIADA_ADMIN), validateGroup, add);
router.put('/:id',  authMiddleware, allowRoles(ROLES.SYSTEM_ADMIN, ROLES.JIADA_ADMIN), validateGroup, edit);
router.delete('/:id', authMiddleware, allowRoles(ROLES.SYSTEM_ADMIN, ROLES.JIADA_ADMIN), deleteGroup);

export default router;
