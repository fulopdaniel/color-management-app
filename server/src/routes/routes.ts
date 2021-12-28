import { Router } from 'express';
import colorRouter from './ColorRoutes';

const router = Router();

router.use('/color', colorRouter);

export default router;
