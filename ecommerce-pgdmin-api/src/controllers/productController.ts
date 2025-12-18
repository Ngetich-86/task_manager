import { Request, Response, NextFunction } from 'express';
import { ProductModel } from '../models';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await ProductModel.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;
        const category = req.query.category as string;

        let products;
        if (category) {
            products = await ProductModel.findByCategory(category);
        } else {
            products = await ProductModel.findAll(limit, offset);
        }

        res.json(products);
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const product = await ProductModel.findById(id);

        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        res.json(product);
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const updatedProduct = await ProductModel.update(id, req.body);

        if (!updatedProduct) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const success = await ProductModel.delete(id);

        if (!success) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export const updateStock = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const { quantity } = req.body;

        if (quantity === undefined) {
            res.status(400).json({ error: 'Quantity is required' });
            return;
        }

        const success = await ProductModel.updateStock(id, quantity);

        if (!success) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        res.json({ message: 'Stock updated successfully' });
    } catch (error) {
        next(error);
    }
}
