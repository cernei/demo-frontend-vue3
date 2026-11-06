export const layout = [
    ['name'],
    ['email'],
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