import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../models";

dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET!;

interface userRequest extends Request {
  user?: any;
}
interface UserResponse {
  id: number;
  fullname: string;
  email: string;
  token: string;
  role: string;
}
const ensureUserIsAuthenticate = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.header("Authorization")?.replace("Bearer ", "")!;
    const decodedToken: any = jwt.verify(authToken, tokenSecret);
    const user = await db.User.findOne({
      where: { id: decodedToken.id },
      include: { model: db.Role },
    });

    const tokenExistInDatabase = await db.Token.findOne({
      where: { value: authToken, UserId: decodedToken.id },
    });

    if (user && tokenExistInDatabase) {
      const userResponse: UserResponse = {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        token: authToken,
        role: user.Role.name,
      };

      req.user = userResponse;

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
