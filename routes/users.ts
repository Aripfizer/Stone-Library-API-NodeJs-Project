import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/users";
import ensureUserIsAuthenticate from "../middlewares/ensureUserIsAuthenticate";
import ensureIsAdmin from "../middlewares/ensureIsAdmin";
import ensureIsAdminOrOwner from "../middlewares/ensureIsAdminOrOwner";
import {
  userCreateValidationRules,
  userUpdateValidationRules,
  validate
} from "../middlewares/validator";

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

router.put(
  "/:userID",
  ensureUserIsAuthenticate,
  ensureIsAdminOrOwner,
  userUpdateValidationRules(),
  validate,
  updateUser
);

router.delete("/:userID", deleteUser);

export default router;
