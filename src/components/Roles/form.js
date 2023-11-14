export const layout = [
    ['name'],
    ['permissions'],
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
    permissions: {
        component: 'checkbox-group',
        label: 'Permissions',
        dictionary: 'permissions',
        validation: {
            required: true,
            max: 128
        },
    },

};
export const initialState  = { name: '' };