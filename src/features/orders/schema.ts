export interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
}

export interface Order {
    id: number;
    items: OrderItem[],
    date: string;
    state: 'pending' | 'closed' | 'canceled',
}
