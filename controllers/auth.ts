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

  const user = await db.User.findOne({ where: { email: email } });
  // console.log("User ", user);
  const isPasswordValid = await comparePasswords(password, user.password);
  let authToken;

  if (user && isPasswordValid) {
    authToken = await generateAuthToken(user);
    console.log("My Token : ", authToken);

    const userResponse: UserResponse = {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      token: authToken,
    };

    res.status(200).json(userResponse);
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
};

const register = async (req: Request, res: Response) => {
  let { fullname, email, password } = req.body;

  // console.log("User created : ");
  try {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    let newUser = await db.User.create({
      fullname: fullname,
      email: email,
      password: hashedPassword,
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

export { login, register };
