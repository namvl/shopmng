export interface Product {
    id: string;
    name: string;
    sku: string;
    description: string;
    stock: number;
    price: number;
    created_at: string;
    updated_at: string;
}

export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    created_at: string;
    isActive: boolean;
};
