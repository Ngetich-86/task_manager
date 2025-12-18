import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models';
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, ...otherData } = req.body;
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);

        const newUser = await UserModel.create({
            ...otherData,
            password: password_hash
        });

        const { password_hash: _, ...userWithoutPassword } = newUser;
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserModel.findAll();
        const usersWithoutPassword = users.map(user => {
            const { password_hash, ...u } = user;
            return u;
        });
        res.json(usersWithoutPassword);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const user = await UserModel.findById(id);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const { password_hash, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const updates = req.body;

        if (updates.password) {
            updates.password_hash = await bcrypt.hash(updates.password, 10);
            delete updates.password;
        }

        const updatedUser = await UserModel.update(id, updates);

        if (!updatedUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const { password_hash, ...userWithoutPassword } = updatedUser;
        res.json(userWithoutPassword);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const success = await UserModel.delete(id);

        if (!success) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
