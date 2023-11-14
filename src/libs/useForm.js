import {reactive, ref} from 'vue';

export function useForm(config, initialState) {
    const fieldsErrors = {};
    Object.keys(config).forEach(fieldName => {
        fieldsErrors[fieldName] = '';
    });
    const errors = {...fieldsErrors};

    const form = reactive({
        state: {...initialState},
        config,
        errors,
        validate,
        submit,
        submitted: false
    });

    const validationFn = {
        required: (value) => {
            const msg = 'Required';
            if (Array.isArray(value)) {
                return !value.length ? msg : '';
            } else {
                return !value ? msg : '';
            }
        },
        max: (value, params) => {
            return value && value.length > params ? 'Should be no longer than ' + params : '';
        },
        min: (value, params) => {
            return value && value.length < params ? 'Should be longer than ' + params : '';
        },
        pattern: (value, pattern) => {
            if (pattern === 'email') {
                return !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? 'Must be a valid email' : null;
            }
        }
    };
    function submit() {
        Object.keys(config).forEach(fieldName => {
            validate(fieldName);
        });
        form.submitted = true;

        return Object.values(errors).every(value => !value);
    }
    function validate(fieldName) {
        const rules = config[fieldName].validation;
        if (rules && Object.keys(rules).length) {
            let firstError = '';
            Object.keys(rules).find(ruleName => {
                const rule = rules[ruleName];
                if (rule) {
                    firstError = validationFn[ruleName](form.state[fieldName], rule);
                    return firstError;
                }
            });
            errors[fieldName] = firstError;
        }
    }

    return {form};
}