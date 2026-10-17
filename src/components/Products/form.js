export const layout = [
    ['title'],
    ['description'],
    ['category_id'],
];

export const config = {
    title: {
        component: 'text',
        label: 'Title',
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
export const initialState  = { name: '' };