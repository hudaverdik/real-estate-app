import { Response } from 'express';

export const handleResponse = (res: Response, data: any, error: Error | null = null): void => {
  if (error) {
    res.status(500).json({ message: error.message });
  } else {
    res.status(200).json(data);
  }
};
