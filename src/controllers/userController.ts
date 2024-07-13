import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
