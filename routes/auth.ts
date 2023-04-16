import express from "express";
import { login, register } from "../controllers/auth";
import {
  userLoginValidationRules,
  userRegisterValidationRules,
  validate,
} from "../middlewares/validator";

const router = express.Router();

router.post("/login", login);
router.post("/register", userRegisterValidationRules(), validate, register);

export default router;
