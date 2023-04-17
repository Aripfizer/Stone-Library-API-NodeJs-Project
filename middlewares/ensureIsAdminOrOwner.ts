import { Request, Response, NextFunction } from "express";

interface userRequest extends Request {
  user?: any;
}

const ensureIsAdminOrOwner = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.userID);

    if (req.user.role === "admin" || req.user.id === id) {
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

export default ensureIsAdminOrOwner;
