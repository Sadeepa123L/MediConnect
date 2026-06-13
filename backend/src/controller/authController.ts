import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import {UserModel, UserRole} from '../model/authModel'
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
    try{
        const {name, email, password} = req.body;
        const existingUser = await UserModel.findOne({ email });
        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            roles: [UserRole.USER],
            approved: true
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully"
        });
    }catch(error){
         res.status(500).json({
            message: "Error registering user",
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try{
        const { email, password} = req.body;
        const user = await UserModel.findOne({ email });
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(404).json({
                message: "Invalid credentials"
            })
        }
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                roles: user.roles
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });
    }catch(error){
        res.status(500).json({
            message: "Internal server error",
        });
    }
};