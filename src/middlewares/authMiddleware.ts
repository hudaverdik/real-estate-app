import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization'];
  if (!token) {
    res.status(403).json({ message: 'No token provided' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      res.status(500).json({ message: 'Failed to authenticate token' });
      return;
    }

    req.userId = (decoded as { userId: string }).userId;
    next();
  });
};
