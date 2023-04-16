import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users";
import ensureUserIsAuthenticate from "../middlewares/ensureUserIsAuthenticate";
import ensureIsAdmin from "../middlewares/ensureIsAdmin";

const router = express.Router();

router.get("/", ensureUserIsAuthenticate, ensureIsAdmin, getUsers);

router.get("/:userID", getUser);

router.post("/", createUser);

router.put("/:userID", updateUser);

router.delete("/:userID", deleteUser);

export default router;
