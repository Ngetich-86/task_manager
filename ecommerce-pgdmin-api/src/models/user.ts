import pool from '../config/database';
import { User, CreateUserRequest } from '../types';

export class UserModel {
    static async create(userData: CreateUserRequest): Promise<User> {
        const { username, email, password, first_name, last_name, address, phone } = userData;
        const query = `
      INSERT INTO users (username, email, password_hash, first_name, last_name, address, phone)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
        const values = [username, email, password, first_name, last_name, address, phone];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async findAll(): Promise<User[]> {
        const query = 'SELECT * FROM users';
        const result = await pool.query(query);
        return result.rows;
    }

    static async findById(id: number): Promise<User | null> {
        const query = 'SELECT * FROM users WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }

    static async findByEmail(email: string): Promise<User | null> {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(query, [email]);
        return result.rows[0] || null;
    }

    static async update(id: number, updates: Partial<User>): Promise<User | null> {
        const fields = Object.keys(updates);
        const values = Object.values(updates);

        if (fields.length === 0) return null;

        const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
        const query = `
      UPDATE users
      SET ${setClause}, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;

        const result = await pool.query(query, [id, ...values]);
        return result.rows[0] || null;
    }

    static async delete(id: number): Promise<boolean> {
        const query = 'DELETE FROM users WHERE id = $1';
        const result = await pool.query(query, [id]);
        return (result.rowCount || 0) > 0;
    }
}
