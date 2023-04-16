import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users";
import ensureUserIsAuthenticate from "../middlewares/ensureUserIsAuthenticate";

const router = express.Router();

router.get("/", ensureUserIsAuthenticate, getUsers);

router.get("/:userID", getUser);

router.post("/", createUser);

router.put("/:userID", updateUser);

router.delete("/:userID", deleteUser);

export default router;
