import { body, validationResult, ValidationChain } from 'express-validator';


export const userLoginValidationRules = (): ValidationChain[] => {
    return [
      body('email').isEmail(),
      body('password').isLength({ min: 5 }),
    ];
  };


