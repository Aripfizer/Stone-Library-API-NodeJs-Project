import { Request, Response, NextFunction } from "express";

interface userRequest extends Request {
  user?: any;
}

const ensureIsAdmin = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.role === "admin") {
      console.log("Welcome ADMIN  ");
      console.log("Welcome ADMIN  ");
      console.log("Welcome ADMIN  ");
      console.log("Welcome ADMIN  ");
      console.log("Welcome ADMIN  ");

      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(401).json({
      message: "Requette Non Authoriser!",
    });
  }
};

export default ensureIsAdmin;
