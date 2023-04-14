import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';

const login = (req: Request, res: Response) => {
    let {fullname, email, password} = req.body;
    
    res.status(200).json({
        fullname: fullname,
        email: email,
        password: password
    })
};

const register = async (req: Request, res: Response) => {
    let {fullname, email, password} = req.body;
    
    try {
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);
        
        res.status(200).json({
            fullname: fullname,
            email: email,
            password: password,
            hashedPassword: hashedPassword
        })
    } catch (error:any) {
        console.log(error)
    }
    
};

export {
    login,
    register
  };