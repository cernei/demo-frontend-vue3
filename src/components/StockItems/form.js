export const layout = [
    ['quantity'],

];

export const config = {
    quantity: {
        component: 'text',
        label: 'Quantity',
        validation: {
            required: true,
            max: 255
        },
    },
};
export const initialState  = { quantity: '' };