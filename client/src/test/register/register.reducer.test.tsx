import { registerReducer, initialState } from "../../reducers/register.reducer";
import { registerTypes } from "../../actions/register/register.types";

describe('register reducer', () => {
    it('should return the initial state', () => {
        expect(registerReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle UPDATE_USERNAME', () => {
        const startAction = {
            payload: {
                username: 'user123'
            },
            type: registerTypes.UPDATE_USERNAME
        };
        expect(registerReducer({
            bucketKey:'',
            email: '',
            errorMessage: '',
            firstName: '',
            lastName: '',
            password: '',
            username: 'user12'
        }, startAction))
            .toEqual({
                email: '',
                errorMessage: '',
                firstName: '',
                lastName: '',
                password: '',
                username: 'user123'
            });
    });

    it('should handle UPDATE_PASSWORD', () => {
        const startAction = {
            payload: {
                password: 'pass'
            },
            type: registerTypes.UPDATE_PASSWORD
        };
        expect(registerReducer({
            bucketKey:'',
            email: '',
            errorMessage: '',
            firstName: '',
            lastName: '',
            password: 'pas',
            username: 'user123'
        }, startAction))
            .toEqual({
                email: '',
                errorMessage: '',
                firstName: '',
                lastName: '',
                password: 'pass',
                username: 'user123'
            });
    });

    it('should handle UPDATE_FIRST_NAME', () => {
        const startAction = {
            payload: {
                firstName: 'John'
            },
            type: registerTypes.UPDATE_FIRST_NAME
        };
        expect(registerReducer({
            bucketKey:'',
            email: '',
            errorMessage: '',
            firstName: 'Joh',
            lastName: '',
            password: 'pass',
            username: 'user123'
        }, startAction))
            .toEqual({
                email: '',
                errorMessage: '',
                firstName: 'John',
                lastName: '',
                password: 'pass',
                username: 'user123'
            });
    });

    it('should handle UPDATE_LAST_NAME', () => {
        const startAction = {
            payload: {
                lastName: 'Smith'
            },
            type: registerTypes.UPDATE_LAST_NAME
        };
        expect(registerReducer({
            bucketKey:'',
            email: '',
            errorMessage: '',
            firstName: 'John',
            lastName: 'Smit',
            password: 'pass',
            username: 'user123'
        }, startAction))
            .toEqual({
                email: '',
                errorMessage: '',
                firstName: 'John',
                lastName: 'Smith',
                password: 'pass',
                username: 'user123'
            });
    });

    it('should handle UPDATE_EMAIL', () => {
        const startAction = {
            payload: {
                email: 'user123@gmail.com'
            },
            type: registerTypes.UPDATE_EMAIL
        };
        expect(registerReducer({
            bucketKey:'',
            email: 'user123@gmail.co',
            errorMessage: '',
            firstName: 'John',
            lastName: 'Smith',
            password: 'pass',
            username: 'user123'
        }, startAction))
            .toEqual({
                email: 'user123@gmail.com',
                errorMessage: '',
                firstName: 'John',
                lastName: 'Smith',
                password: 'pass',
                username: 'user123'
            });
    });

    it('should handle REGISTER with no error message (successful registration)', () => {
        const currentUser = {
            bucketKey: null,
            email: 'user123@gmail.com',
            firstName: "John",
            id: 14,
            lastName: "Smith",
            username: "user123"
        }
        const startAction = {
            payload: {
                currentUser,
                email: 'user123@gmail.com',
                errorMessage: '',
                firstName: 'John',
                lastName: 'Smith',
                password: 'pass',
                username: 'user123'
            },
            type: registerTypes.REGISTER
        }
        expect(registerReducer({
            bucketKey:'',
            email: 'user123@gmail.com',
            errorMessage: '',
            firstName: 'John',
            lastName: 'Smith',
            password: 'pass',
            username: 'user123'
        }, startAction))
            .toEqual({
                email: '',
                errorMessage: '',
                firstName: '',
                lastName: '',
                password: '',
                username: ''
            });
    });

    it('should handle REGISTER with error message', () => {
        const startAction = {
            payload: {
                currentUser: null,
                email: 'user123@gmail.com',
                errorMessage: 'Username user123 is already taken. Please choose another.',
                firstName: 'John',
                lastName: 'Smith',
                password: 'pass',
                username: 'user123'
            },
            type: registerTypes.REGISTER
        }
        expect(registerReducer({
            bucketKey:'',
            email: 'user123@gmail.com',
            errorMessage: '',
            firstName: 'John',
            lastName: 'Smith',
            password: 'pass',
            username: 'user123'
        }, startAction))
            .toEqual({
                email: 'user123@gmail.com',
                errorMessage: 'Username user123 is already taken. Please choose another.',
                firstName: 'John',
                lastName: 'Smith',
                password: 'pass',
                username: 'user123'
            });
    });
});