import { Router } from 'express';
import isAuthenticated from '../middlewares/is-authenticated';

const router = Router();

router.get('/profile', isAuthenticated, async (req, res) => {
  res.json({ name: 'name' });
});

export default router;
