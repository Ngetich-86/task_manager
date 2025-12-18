export interface User {
    id?: number;
    username: string;
    email: string;
    password_hash: string;
    first_name?: string;
    last_name?: string;
    address?: string;
    phone?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface Product {
    id?: number;
    name: string;
    description?: string;
    price: number;
    stock_quantity: number;
    category?: string;
    image_url?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface Order {
    id?: number;
    user_id: number;
    total_amount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shipping_address: string;
    payment_method?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface OrderItem {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
    subtotal?: number;
    created_at?: Date;
}

export interface OrderWithItems extends Order {
    items: OrderItem[];
}

export interface CreateOrderRequest {
    user_id: number;
    items: Array<{
        product_id: number;
        quantity: number;
    }>;
    shipping_address: string;
    payment_method?: string;
}

export interface UpdateOrderStatus {
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    address?: string;
    phone?: string;
}

export interface CreateProductRequest {
    name: string;
    description?: string;
    price: number;
    stock_quantity: number;
    category?: string;
    image_url?: string;
}