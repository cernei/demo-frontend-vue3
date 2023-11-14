export const layout = [
    ['name'],
    ['email'],
    ['role_id'],
    ['password'],
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
    email: {
        component: 'text',
        label: 'Email',
        disabled: true,
    },
    role_id: {
        component: 'select',
        label: 'Role',
        dictionary: 'roles',
        validation: {
            required: true,
        },
    },
    password: {
        component: 'text',
        label: 'Password',
        validation: {
            max: 64,
            min: 6
        },
    },
};
export const initialState  = { name: '',  email: '', password: '' };