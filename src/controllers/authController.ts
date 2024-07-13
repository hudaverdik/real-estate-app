import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { handleResponse } from '../utils/responseHandler';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authService.register(req.body);
    handleResponse(res, result);
  } catch (error) {
    handleResponse(res, null, error as Error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authService.login(req.body);
    handleResponse(res, result);
  } catch (error) {
    handleResponse(res, null, error as Error);
  }
};
