import { Router } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';

const router = Router();

router.get('/profile', isAuthenticated, async (req, res, next) => {
  res.json({ name: 'name' });
});

export default router;
