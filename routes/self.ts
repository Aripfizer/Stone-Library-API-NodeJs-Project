import express from "express";
import {
  getAuthenticateUser,
} from "../controllers/users";
import ensureUserIsAuthenticate from "../middlewares/ensureUserIsAuthenticate";
// import ensureIsAdmin from "../middlewares/ensureIsAdmin";

const router = express.Router();

router.get("/me", ensureUserIsAuthenticate, getAuthenticateUser);


export default router;
