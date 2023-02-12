
export interface Product {
    id: number;
    name: string;
    detail: string;
    category: string;
    imageUrl: string;
    price: number;
    stock: number;
    sub: string; // Cognito ID
}
