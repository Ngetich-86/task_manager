import pool from '../config/database';
import { Product, CreateProductRequest } from '../types';

export class ProductModel {
    static async create(productData: CreateProductRequest): Promise<Product> {
        const { name, description, price, stock_quantity, category, image_url } = productData;
        const query = `
      INSERT INTO products (name, description, price, stock_quantity, category, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
        const values = [name, description, price, stock_quantity, category, image_url];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async findAll(limit: number = 10, offset: number = 0): Promise<Product[]> {
        const query = `
      SELECT * FROM products
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;
        const result = await pool.query(query, [limit, offset]);
        return result.rows;
    }

    static async findById(id: number): Promise<Product | null> {
        const query = 'SELECT * FROM products WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }

    static async update(id: number, updates: Partial<Product>): Promise<Product | null> {
        const fields = Object.keys(updates);
        const values = Object.values(updates);

        if (fields.length === 0) return null;

        const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
        const query = `
      UPDATE products
      SET ${setClause}, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;

        const result = await pool.query(query, [id, ...values]);
        return result.rows[0] || null;
    }

    static async delete(id: number): Promise<boolean> {
        const query = 'DELETE FROM products WHERE id = $1';
        const result = await pool.query(query, [id]);
        return (result.rowCount || 0) > 0;
    }

    static async updateStock(id: number, quantity: number): Promise<boolean> {
        const query = `
      UPDATE products
      SET stock_quantity = stock_quantity + $2, updated_at = NOW()
      WHERE id = $1
    `;
        const result = await pool.query(query, [id, quantity]);
        return (result.rowCount || 0) > 0;
    }

    static async findByCategory(category: string): Promise<Product[]> {
        const query = 'SELECT * FROM products WHERE category = $1';
        const result = await pool.query(query, [category]);
        return result.rows;
    }
}
