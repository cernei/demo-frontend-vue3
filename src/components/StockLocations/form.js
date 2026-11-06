export const layout = [
    ['code'],
];

export const config = {
    code: {
        component: 'text',
        label: 'Code',
        validation: {
            required: true,
            max: 255
        },
    },
};
export const initialState  = { code: '' };