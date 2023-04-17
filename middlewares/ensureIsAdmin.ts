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
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(401).json({
      message: "Requete Non Authoriser!",
    });
  }
};

export default ensureIsAdmin;
