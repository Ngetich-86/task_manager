import pool from '../config/database';
import { Order, OrderItem, CreateOrderRequest, OrderWithItems } from '../types';

export class OrderModel {
    static async create(orderData: CreateOrderRequest): Promise<OrderWithItems> {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const { user_id, items, shipping_address, payment_method } = orderData;

            // Calculate total amount and verify stock
            let totalAmount = 0;

            for (const item of items) {
                const productRes = await client.query('SELECT price, stock_quantity FROM products WHERE id = $1', [item.product_id]);
                if (productRes.rows.length === 0) {
                    throw new Error(`Product ${item.product_id} not found`);
                }

                const product = productRes.rows[0];
                if (product.stock_quantity < item.quantity) {
                    throw new Error(`Insufficient stock for product ${item.product_id}`);
                }

                totalAmount += Number(product.price) * item.quantity;
            }

            // Create Order
            const orderQuery = `
        INSERT INTO orders (user_id, total_amount, status, shipping_address, payment_method)
        VALUES ($1, $2, 'pending', $3, $4)
        RETURNING *
      `;
            const orderRes = await client.query(orderQuery, [user_id, totalAmount, shipping_address, payment_method]);
            const newOrder = orderRes.rows[0];

            // Create Order Items and Update Stock
            const orderItems: OrderItem[] = [];
            const orderItemQuery = `
        INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
            const updateStockQuery = `
        UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2
      `;

            for (const item of items) {
                const productRes = await client.query('SELECT price FROM products WHERE id = $1', [item.product_id]);
                const price = Number(productRes.rows[0].price);
                const subtotal = price * item.quantity;

                const itemRes = await client.query(orderItemQuery, [newOrder.id, item.product_id, item.quantity, price, subtotal]);
                orderItems.push(itemRes.rows[0]);

                await client.query(updateStockQuery, [item.quantity, item.product_id]);
            }

            await client.query('COMMIT');

            return {
                ...newOrder,
                items: orderItems
            };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    static async findAll(): Promise<OrderWithItems[]> {
        const query = `
      SELECT o.*, 
        json_agg(
          json_build_object(
            'id', oi.id,
            'product_id', oi.product_id,
            'quantity', oi.quantity,
            'unit_price', oi.unit_price,
            'subtotal', oi.subtotal
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `;
        const result = await pool.query(query);
        return result.rows;
    }

    static async findById(id: number): Promise<OrderWithItems | null> {
        const query = `
      SELECT o.*, 
        json_agg(
          json_build_object(
            'id', oi.id,
            'product_id', oi.product_id,
            'quantity', oi.quantity,
            'unit_price', oi.unit_price,
            'subtotal', oi.subtotal
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.id = $1
      GROUP BY o.id
    `;
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }

    static async findByUserId(userId: number): Promise<OrderWithItems[]> {
        const query = `
      SELECT o.*, 
        json_agg(
          json_build_object(
            'id', oi.id,
            'product_id', oi.product_id,
            'quantity', oi.quantity,
            'unit_price', oi.unit_price,
            'subtotal', oi.subtotal
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `;
        const result = await pool.query(query, [userId]);
        return result.rows;
    }

    static async updateStatus(id: number, status: string): Promise<Order | null> {
        const query = `
      UPDATE orders
      SET status = $2, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;
        const result = await pool.query(query, [id, status]);
        return result.rows[0] || null;
    }

    static async delete(id: number): Promise<boolean> {
        const query = 'DELETE FROM orders WHERE id = $1';
        const result = await pool.query(query, [id]);
        return (result.rowCount || 0) > 0;
    }
}
