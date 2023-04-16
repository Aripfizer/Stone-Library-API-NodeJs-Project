import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import db from "../models";

const login = (req: Request, res: Response) => {
  let { email, password } = req.body;

  res.status(200).json({
    email: email,
    password: password,
  });
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

    res.status(201).json(newUser);
  } catch (error: any) {
    console.log(error);
  }
};

export { login, register };
