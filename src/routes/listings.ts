import { Router } from 'express';
import { getListings } from '../controllers/listingsController';

const router = Router();

router.get('/', getListings);

export default router;
