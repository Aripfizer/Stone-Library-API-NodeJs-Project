import express from "express";
import { login, register, logout } from "../controllers/auth";
import {
  userLoginValidationRules,
  userRegisterValidationRules,
  validate,
} from "../middlewares/validator";
import ensureUserIsAuthenticate from "../middlewares/ensureUserIsAuthenticate";

const router = express.Router();

router.post("/login", userLoginValidationRules(), validate, login);
router.post("/register", userRegisterValidationRules(), validate, register);
router.post("/logout", ensureUserIsAuthenticate, logout);

export default router;
