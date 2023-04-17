import { Request, Response } from "express";
import db from "../models";

interface UserResponse {
  id: number;
  fullname: string;
  email: string;
  token: string | null;
  role: string | null;
}

interface userRequest extends Request {
  user?: any;
}

const getUsers = async (req: Request, res: Response) => {
  let allUsers = await db.User.findAll();

  res.status(200).json(allUsers);
};

const getAuthenticateUser = (req: userRequest, res: Response) => {
  res.status(200).json(req.user);
};

const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.userID);
  const user = await db.User.findOne({
    where: { id: id },
    include: { model: db.Role },
  });
  console.log("Get User : ", user);
  if (!user) {
    return res.status(404).send("User not found");
  }

  const userResponse: UserResponse = {
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    token: "",
    role: user.Role.name,
  };
  res.status(200).json(userResponse);
};

const createUser = async (req: Request, res: Response) => {
  let { fullname, email, password, role } = req.body;

  // console.log("CREATION : ", fullname);
  // console.log("CREATION : ", fullname);
  // console.log("CREATION : ", fullname);
  try {
    let roleId = null;
    if (role) roleId = 2;

    let newUser = await db.User.create({
      fullname: fullname,
      email: email,
      password: password,
      RoleId: roleId,
    });

    const userResponse: UserResponse = {
      id: newUser.id,
      fullname: newUser.fullname,
      email: newUser.email,
      token: "",
      role: role,
    };

    res.status(201).json(userResponse);
  } catch (error: any) {
    res.status(500).json(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.userID);
  let { fullname, email } = req.body;

  let user = await db.User.findByPk(id);

  if (!user) res.status(404).json("User Not found");

  user.set({
    fullname: fullname,
    email: email,
  });

  user = await user.save();

  const userResponse: UserResponse = {
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    token: null,
    role: null,
  };

  res.status(200).json(userResponse);
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.userID);
    let user = await db.User.findByPk(id);

    if (!user) {
      throw new Error();
    } else if (user.email === "admin@gmail.com") {
      throw new Error();
    }

    await user.destroy();

    res.status(200).json({
      message: "User supprimer avec success !",
    });
  } catch (error) {
    res.status(404).json({
      message: "User Not found",
    });
  }
};

export {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAuthenticateUser,
};
