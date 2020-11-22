import { Router } from 'express';
import { createJWT } from '../services/security';

const router = Router();

router.post('/login', async (req, res, next) => {
  const token = await createJWT({ uid: '123456' });
  res.json({ jwt: token });
});

export default router;
