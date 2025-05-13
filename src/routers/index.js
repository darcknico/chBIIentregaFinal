import { Router } from 'express';
import { sessionsRouter } from "./sessions.router.js";
import { cartsRouter } from './carts.route.js';
import { productRouter } from './products.route.js';
import errorHandler from '../middlewares/error-handler.js';

const router = Router();

router.use('/api/sessions', sessionsRouter);
router.use('/api/carts', cartsRouter);
router.use('/api/products', productRouter);

router.use(errorHandler);

export default router;