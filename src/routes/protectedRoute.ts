import { Router, Request, Response } from 'express';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/protected', verifyToken, (req: Request, res: Response) => {
  res.json({ message: `Hello, user with ID ${req.userId}` });
});

export default router;
