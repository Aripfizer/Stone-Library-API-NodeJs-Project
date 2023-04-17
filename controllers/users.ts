import { Request, Response } from "express";
import db from "../models";

interface UserResponse {
  id: number;
  fullname: string;
  email: string;
  token: string;
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
  const user = await db.User.findByPk(id);
  console.log("Get User : ", user)
  if (!user) {
    return res.status(404).send("User not found");
  }

  const userResponse: UserResponse = {
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    token: "",
  };
  res.status(200).json(userResponse);
};

const createUser = (req: Request, res: Response) => {
  //   const newUser: User = {
  //     id: users.length + 1,
  //     name: req.body.name,
  //     email: req.body.email,
  //   };
  //   users.push(newUser);
  //   res.status(201).json(newUser);
};

const updateUser = (req: Request, res: Response) => {
  //   const id = Number(req.params.userID);
  //   const index = users.findIndex((user: User) => user.id === id);
  //   const updatedUser: User = {
  //     id: users[index].id,
  //     name: req.body.name,
  //     email: req.body.email,
  //   };
  //   users[index] = updatedUser;
  //   res.status(200).json('User updated');
};

const deleteUser = (req: Request, res: Response) => {
  //   const id = Number(req.params.userID);
  //   const index = users.findIndex((user: User) => user.id === id);
  //   users.splice(index, 1);
  //   res.status(200).json('User deleted');
};

export {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAuthenticateUser,
};
