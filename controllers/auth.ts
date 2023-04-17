import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import db from "../models";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET!;

interface UserResponse {
  id: number;
  fullname: string;
  email: string;
  token: string;
}

interface userRequest extends Request {
  user?: any;
}

const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

const generateAuthToken = async (user: any) => {
  const authToken = jwt.sign({ id: user.id }, tokenSecret, {
    expiresIn: "1800s",
  });

  db.Token.create({ value: authToken, UserId: user.id });

  return authToken;
};

const login = async (req: Request, res: Response) => {
  let { email, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { email: email } });
    if (!user) throw new Error();

    const isPasswordValid = await comparePasswords(password, user.password);
    let authToken;
    if (isPasswordValid) {
      authToken = await generateAuthToken(user);
      // console.log("My Token : ", authToken);

      const userResponse: UserResponse = {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        token: authToken,
      };

      res.status(200).json(userResponse);
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(404).json({
      message: "User not found",
    });
  }
};

const register = async (req: Request, res: Response) => {
  let { fullname, email, password } = req.body;

  // console.log("User created : ");
  try {
    let newUser = await db.User.create({
      fullname: fullname,
      email: email,
      password: password,
    });

    const userResponse: UserResponse = {
      id: newUser.id,
      fullname: newUser.fullname,
      email: newUser.email,
      token: "",
    };

    res.status(201).json(userResponse);
  } catch (error: any) {
    res.status(500).json(error);
    console.log(error);
  }
};

const logout = async (req: userRequest, res: Response) => {
  await db.Token.destroy({ where: { value: req.user.token } });

  res.status(200).json({
    message: "Déconnexion Effectuée",
  });
};

export { login, register, logout };
