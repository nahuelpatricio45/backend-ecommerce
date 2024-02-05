// productRoutes.js

import {Router} from 'express';
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';
import { authRequired } from '../middlewares/validateToken.js';
const router = Router();

router.get('/', getProducts, authRequired);
router.get('/:id', getProductById);

export default router;
