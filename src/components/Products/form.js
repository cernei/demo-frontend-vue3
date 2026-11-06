export const layout = [
    ['name'],
    ['category_id'],
    ['price'],
    ['description'],
];

export const config = {
    name: {
        component: 'text',
        label: 'Name',
        validation: {
            required: true,
            max: 255
        },
    },
    price: {
        component: 'text',
        label: 'Price',
        validation: {
            required: true,
            max: 255
        },
    },
    description: {
        component: 'textarea',
        label: 'Description',
        validation: {
            required: true,
            max: 2000
        },
    },
    category_id: {
        component: 'select',
        label: 'Category',
        dictionary: 'categories',
        validation: {
            required: true,
        },
    },
};
export const initialState  = { name: '', description: '', price: 0, category_id: 0 };