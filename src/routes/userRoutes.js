// userRoutes.js

import { Router } from "express";
import {
  login,
  register,
  logout, 
  profile,
  verifyToken
} from "../controllers/userController.js";
import {validateSchema} from '../middlewares/validatormiddlewares.js'
import { authRequired} from '../middlewares/validateToken.js';
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";
const router = Router();

router.post("/register",validateSchema(registerSchema), register);
router.post("/login",validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get ("/profile", authRequired , profile )
router.get ("/verify", verifyToken )
export default router;
