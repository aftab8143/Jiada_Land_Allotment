import { Router } from 'express';
import {
  login,
  logout,
  userlogout,
  ssoRedirect,
  resetpassword,
  captcha,
  captcha_validate,
  dashboard,
  add,
  edit,
  deleteUser,
  index,
  view,
} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import allowRoles from '../middleware/roleMiddleware.js';
import { ROLES }      from '../constants/roles.js';

const router = Router();

// ── Public ──────────────────────────────────────────────────────────────────
router.post('/login', login);
router.get('/captcha', captcha);
router.get('/sso-redirect', ssoRedirect);

// ── Protected (any authenticated user) ──────────────────────────────────────
router.post('/logout',authMiddleware, logout);
router.get('/user-logout', authMiddleware, userlogout);
router.post('/reset-password', authMiddleware, resetpassword);
router.get('/dashboard', authMiddleware, dashboard);

// ── Admin CRUD ───────────────────────────────────────────────────────────────
router.post('/', authMiddleware, allowRoles(ROLES.SYSTEM_ADMIN, ROLES.JIADA_ADMIN), add);
router.get('/', authMiddleware, allowRoles(ROLES.SYSTEM_ADMIN, ROLES.JIADA_ADMIN), index);
router.get('/:id', authMiddleware, view);
router.put('/:id', authMiddleware, allowRoles(ROLES.SYSTEM_ADMIN, ROLES.JIADA_ADMIN), edit);
router.delete('/:id', authMiddleware, allowRoles(ROLES.SYSTEM_ADMIN, ROLES.JIADA_ADMIN), deleteUser);

export default router;