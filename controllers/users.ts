import { Request, Response } from "express";
import db from "../models";

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

const getUsers = async (req: Request, res: Response) => {
  let allUsers = await db.User.findAll();

  res.status(200).json(allUsers);
};

const getUser = (req: Request, res: Response) => {
  //   const id = Number(req.params.userID);
  //   const user = users.find((user: User) => user.id === id);
  //   if (!user) {
  //     return res.status(404).send('User not found');
  //   }
  //   res.json(user);
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

export { getUsers, getUser, createUser, updateUser, deleteUser };
