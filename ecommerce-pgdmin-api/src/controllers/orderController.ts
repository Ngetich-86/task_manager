import { Request, Response, NextFunction } from 'express';
import { OrderModel } from '../models';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await OrderModel.create(req.body);
        res.status(201).json(order);
    } catch (error: any) {
        if (error.message.includes('Insufficient stock') || error.message.includes('not found')) {
            res.status(400).json({ error: error.message });
            return;
        }
        next(error);
    }
};

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await OrderModel.findAll();
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const order = await OrderModel.findById(id);

        if (!order) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }

        res.json(order);
    } catch (error) {
        next(error);
    }
};

export const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        const orders = await OrderModel.findByUserId(userId);
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const { status } = req.body;

        if (!status) {
            res.status(400).json({ error: 'Status is required' });
            return;
        }

        const updatedOrder = await OrderModel.updateStatus(id, status);

        if (!updatedOrder) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }

        res.json(updatedOrder);
    } catch (error) {
        next(error);
    }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const success = await OrderModel.delete(id);

        if (!success) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
