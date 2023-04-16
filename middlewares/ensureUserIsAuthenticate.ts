import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../models";

dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET!;

interface userRequest extends Request {
  user?: any;
}

const ensureUserIsAuthenticate = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.header("Authorization")?.replace("Bearer ", "")!;
    const decodedToken: any = jwt.verify(authToken, tokenSecret);
    console.log("ID : ", decodedToken);
    const user = await db.User.findByPk(decodedToken.id);

    const tokenExistInDatabase = db.Token.findOne({
      where: { value: authToken, UserId: decodedToken.id },
    });

    if (user && tokenExistInDatabase) {
      req.user = user;
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(401).json({
      message: "Vous devez vous authentifier!",
    });
  }
};

export default ensureUserIsAuthenticate;
