import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const validate = (schema: Joi.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorDetails = error.details.map((detail) => detail.message);
            return res.status(400).json({
                error: 'Validation Error',
                details: errorDetails,
            });
        }
        next();
    };
};

// User Schemas
const createUserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    address: Joi.string().optional(),
    phone: Joi.string().optional(),
});

const updateUserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    first_name: Joi.string(),
    last_name: Joi.string(),
    address: Joi.string(),
    phone: Joi.string(),
}).min(1);

// Product Schemas
const createProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().min(0).required(),
    stock_quantity: Joi.number().integer().min(0).required(),
    category: Joi.string().optional(),
    image_url: Joi.string().uri().optional(),
});

const updateProductSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number().min(0),
    stock_quantity: Joi.number().integer().min(0),
    category: Joi.string(),
    image_url: Joi.string().uri(),
}).min(1);

const updateStockSchema = Joi.object({
    quantity: Joi.number().integer().required(), // Can be negative to decrease stock, but typically absolute stock or delta?
    // The controller logic `updateStock` implementation did `stock_quantity + $2`. 
    // If we want to support setting stock, logic is different. 
    // The requirement said "updateStock: PATCH /api/products/:id/stock".
    // Assuming this adds/subtracts. I'll allow integer. 
    // If the user meant "set stock to X", the implementation `stock_quantity + $2` implies it's an adjustment.
    // Actually, usually `stock` endpoint sets the stock or adds. 
    // Given `updateStock` method `stock_quantity = stock_quantity + $2`, it is an adjustment.
});

// Order Schemas
const createOrderSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    items: Joi.array().items(
        Joi.object({
            product_id: Joi.number().integer().required(),
            quantity: Joi.number().integer().min(1).required(),
        })
    ).min(1).required(),
    shipping_address: Joi.string().required(),
    payment_method: Joi.string().optional(),
});

const updateOrderStatusSchema = Joi.object({
    status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled').required(),
});

export const validateCreateUser = validate(createUserSchema);
export const validateUpdateUser = validate(updateUserSchema);
export const validateCreateProduct = validate(createProductSchema);
export const validateUpdateProduct = validate(updateProductSchema);
export const validateUpdateStock = validate(updateStockSchema);
export const validateCreateOrder = validate(createOrderSchema);
export const validateUpdateOrderStatus = validate(updateOrderStatusSchema);
