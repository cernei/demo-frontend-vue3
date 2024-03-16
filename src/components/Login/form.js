export const layout = [
    ['email'],
    ['password'],
];

export const config = {
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
export const initialState  = { email: 'admin@gmail.com', password: '12345678' };