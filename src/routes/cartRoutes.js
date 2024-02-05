import {Router} from 'express';
import {
 addProductCart,
 cleanCart,
 getProductscart,
 removeProductCart,
 updateQuantity,
 updateQuantityResta
} from '../controllers/cartController.js';
import { authRequired } from '../middlewares/validateToken.js';
const router = Router();
router.post('/cart/update', authRequired, updateQuantity);
router.post('/cart/resta', authRequired, updateQuantityResta);
router.post('/cart/add', authRequired, addProductCart);
router.delete('/cart/clean', cleanCart)
router.delete('/cart/:productId', authRequired, removeProductCart);
router.get('/cart', authRequired, getProductscart)

export default router