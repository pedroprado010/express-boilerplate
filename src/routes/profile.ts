import { Router } from 'express';
import isAuthenticated, { getToken } from '../middlewares/is-authenticated';

const router = Router();

router.get('/profile', isAuthenticated, async (req, res) => {
  res.json(getToken(res));
});

export default router;
