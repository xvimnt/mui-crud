
export interface Order {
    id: number;
    items: [
        {
            name: string;
            quantity: number;
            price: number;
            imageUrl: string;
        },
    ],
    date: string;
    state: 'pending' | 'closed' | 'canceled',
}
