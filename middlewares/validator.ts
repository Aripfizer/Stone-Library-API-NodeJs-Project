import { body, validationResult, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";
import db from "../models";

export const validate: any = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: Record<string, string>[] = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

// USER LOGIN

export const userLoginValidationRules = (): ValidationChain[] => {
  return [
    body("email")
      .isEmail()
      .withMessage("Veuillez entrer une adresse email valide"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Le mot de passe doit comporter au moins 6 caractères")
      .matches(/[a-z]/)
      .withMessage(
        "Le mot de passe doit comporter au moins une lettre minuscule"
      )
      .matches(/[A-Z]/)
      .withMessage(
        "Le mot de passe doit comporter au moins une lettre majuscule"
      )
      .matches(/[0-9]/)
      .withMessage("Le mot de passe doit comporter au moins un chiffre")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage(
        "Le mot de passe doit comporter au moins un caractère spécial"
      ),
  ];
};

//USER REGISTER

export const userRegisterValidationRules = (): ValidationChain[] => {
  return [
    body("email")
      .isEmail()
      .withMessage("Veuillez entrer une adresse email valide")
      .custom(async (value, { req }) => {
        const user = await db.User.findOne({ email: value });
        if (user) {
          throw new Error("L'adresse email est déjà enregistrée");
        }
        return true;
      }),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Le mot de passe doit comporter au moins 6 caractères")
      .matches(/[a-z]/)
      .withMessage(
        "Le mot de passe doit comporter au moins une lettre minuscule"
      )
      .matches(/[A-Z]/)
      .withMessage(
        "Le mot de passe doit comporter au moins une lettre majuscule"
      )
      .matches(/[0-9]/)
      .withMessage("Le mot de passe doit comporter au moins un chiffre")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage(
        "Le mot de passe doit comporter au moins un caractère spécial"
      ),
    body("fullname")
      .notEmpty()
      .withMessage("Full name is required")
      .isString()
      .withMessage("Full name must be a string")
      .custom((value) => {
        const words = value.trim().split(/\s+/);
        return words.length >= 2;
      })
      .withMessage(
        "Full name must contain at least two words (name and first name)"
      ),
  ];
};

//USER Create

export const userCreateValidationRules = (): ValidationChain[] => {
  return [
    body("email")
      .isEmail()
      .withMessage("Veuillez entrer une adresse email valide")
      .custom(async (value, { req }) => {
        const user = await db.User.findOne({ where: { email: value } });
        if (user) {
          throw new Error("L'adresse email est déjà utiliser");
        }
        return true;
      }),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Le mot de passe doit comporter au moins 6 caractères")
      .matches(/[a-z]/)
      .withMessage(
        "Le mot de passe doit comporter au moins une lettre minuscule"
      )
      .matches(/[A-Z]/)
      .withMessage(
        "Le mot de passe doit comporter au moins une lettre majuscule"
      )
      .matches(/[0-9]/)
      .withMessage("Le mot de passe doit comporter au moins un chiffre")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage(
        "Le mot de passe doit comporter au moins un caractère spécial"
      ),
    body("fullname")
      .notEmpty()
      .withMessage("Full name is required")
      .isString()
      .withMessage("Full name must be a string")
      .custom((value) => {
        const words = value.trim().split(/\s+/);
        return words.length >= 2;
      })
      .withMessage(
        "Full name must contain at least two words (name and first name)"
      ),
    body("role")
      .optional()
      .isIn(["author"])
      .withMessage("Role doit être 'author', ou vide"),
  ];
};
