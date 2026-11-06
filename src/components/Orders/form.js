export const layout = [
    ['email'],
    ['items'],
    ['total_amount'],
];

export const config = {
    email: {
        component: 'text',
        label: 'Email',
        disabled: true
    },
    items: {
        component: 'list',
        form: {
            layout: [['name', 'quantity', 'price', 'total']],
            config: {
                name: {
                    component: 'text',
                    label: 'Name',
                },
                quantity: {
                    component: 'text',
                    label: 'Quantity',
                },
                price: {
                    component: 'text',
                    label: 'Price',
                },
                total: {
                    component: 'text',
                    label: 'Total',
                },
            }
        },
        label: 'Items',
    },
    total_amount: {
        component: 'text',
        label: 'Total',
        disabled: true
    },
};
export const initialState  = { email: '', total_amount: 0, items: [] };