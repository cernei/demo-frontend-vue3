export const layout = [
    ['name'],
];

export const config = {
    name: {
        component: 'text',
        label: 'Name',
        validation: {
            required: true,
            max: 128
        },
    },

};
export const initialState  = { name: '' };