import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAuthenticateUser,
} from "../controllers/users";
import ensureUserIsAuthenticate from "../middlewares/ensureUserIsAuthenticate";
import ensureIsAdmin from "../middlewares/ensureIsAdmin";
import { userCreateValidationRules, validate } from "../middlewares/validator";

const router = express.Router();

router.get("/", ensureUserIsAuthenticate, ensureIsAdmin, getUsers);

router.get("/:userID", ensureUserIsAuthenticate, ensureIsAdmin, getUser);

router.post(
  "/",
  ensureUserIsAuthenticate,
  ensureIsAdmin,
  userCreateValidationRules(),
  validate,
  createUser
);

router.put("/:userID", updateUser);

router.delete("/:userID", deleteUser);

export default router;
