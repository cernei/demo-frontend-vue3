export const layout = [
    ['content'],
    ['category_id'],
];

export const config = {
    content: {
        component: 'textarea',
        label: 'Content',
        validation: {
            required: true,
            max: 2000
        },
        // onChange: ({fields, value, validate}) => {
        //     fields.employees_count.urlParam = value;
        //     validate('employees_count');
        // }
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