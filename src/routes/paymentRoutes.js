import { Router } from "express";
import { createOrder } from "../controllers/paymentController.js";

const router = Router();

router.get('/payment', createOrder);

export  default router;