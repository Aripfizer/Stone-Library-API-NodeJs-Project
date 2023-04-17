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

const router = express.Router();

router.get("/", ensureUserIsAuthenticate, ensureIsAdmin, getUsers);

router.get("/:userID", ensureUserIsAuthenticate, ensureIsAdmin, getUser);

router.post("/", createUser);

router.put("/:userID", updateUser);

router.delete("/:userID", deleteUser);

export default router;
