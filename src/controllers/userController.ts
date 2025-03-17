import { Request, Response } from 'express';
import UserModel, { createUser, User } from "../models/User"; // Adjust the path as necessary
import bcrypt from 'bcrypt';


 export const createUserCont = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password, role } = req.body;

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser  = new UserModel({
            username,
            email,
            password: hashedPassword,
            role,
        });

        // await newUser.save();
        const us = await createUser(newUser)
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error });
    }
};
