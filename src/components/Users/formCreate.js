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
        validation: {
            required: true,
            pattern: 'email',
            max: 128,
        },
    },
    password: {
        component: 'text',
        label: 'Password',
        validation: {
            required: true,
            max: 64,
            min: 6
        },
    },
};
export const initialState  = { name: '',  email: '', password: '' };