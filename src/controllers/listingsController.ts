import { Request, Response } from 'express';
import { db } from '../utils/firebaseAdmin';

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export const getListings = async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('listings').get();
    const listings = snapshot.docs.map(doc => doc.data());
    res.status(200).json(listings);
  } catch (error) {
    if (isError(error)) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
};
