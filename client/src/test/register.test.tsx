import * as registerActions from '../actions/register/register.actions';
import { registerTypes } from "../actions/register/register.types";
import { mockResponse } from "./test-helper"

describe('register actions', () => {
    it('should create an action to update username', () => {
        const username = 'username123';
        const expectedAction = {
            payload: {
                username
            },
            type: registerTypes.UPDATE_USERNAME
        }
        expect(registerActions.updateUsername(username)).toEqual(expectedAction);
    });

    it('should create an action to update password', () => {
        const password = 'pass';
        const expectedAction = {
            payload: {
                password
            },
            type: registerTypes.UPDATE_PASSWORD
        }
        expect(registerActions.updatePassword(password)).toEqual(expectedAction);
    });

    it('should create an action to update first name', () => {
        const firstName = 'John';
        const expectedAction = {
            payload: {
                firstName
            },
            type: registerTypes.UPDATE_FIRST_NAME
        }
        expect(registerActions.updateFirstName(firstName)).toEqual(expectedAction);
    });

    it('should create an action to update last name', () => {
        const lastName = 'Smith';
        const expectedAction = {
            payload: {
                lastName
            },
            type: registerTypes.UPDATE_LAST_NAME
        }
        expect(registerActions.updateLastName(lastName)).toEqual(expectedAction);
    });

    it('should create an action to update email', () => {
        const email = 'john.smith@gmail.com';
        const expectedAction = {
            payload: {
                email
            },
            type: registerTypes.UPDATE_EMAIL
        }
        expect(registerActions.updateEmail(email)).toEqual(expectedAction);
    });

    it("should create an action to register user successfully", async () => {
        const dispatch = jest.fn();
        const response = '{"user":"User [id=16, username=user123, password=pass, firstName=John, lastName=Smith, email=user123@gmail.com, bucketKey=null]"}';
        window.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve(mockResponse(201, "Created", response)));
        const event: any = { preventDefault: () => null };
        const userInfo: any = { password: 'pass', username: 'user123', firstName: 'John', lastName: 'Smith', email: 'user123@gmail.com' }
        await registerActions.register(event, userInfo)(dispatch);
        expect(dispatch).toBeCalledWith(
            {
                payload: {
                    currentUser: JSON.parse(response).user,
                    errorMessage: ''
                },
                type: registerTypes.REGISTER
            }
        );
    });

    it("should create an action to display an error if user registers with a username that is already taken", async () => {
        const dispatch = jest.fn();
        const response = '{"errors":{"duplicate":"username"}}';
        const username = 'user123';
        window.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve(mockResponse(409, "Conflict", response)));
        const event: any = { preventDefault: () => null };
        const userInfo: any = { password: 'pass', username, firstName: 'John', lastName: 'Smith', email: 'user123@gmail.com' }
        await registerActions.register(event, userInfo)(dispatch);
        expect(dispatch).toBeCalledWith(
            {
                payload: {
                    currentUser: null,
                    errorMessage: `Username ${username} is already taken. Please choose another.`
                },
                type: registerTypes.REGISTER
            }
        );
    });

    it("should create an action to display an error if user registers with an email that is already taken", async () => {
        const dispatch = jest.fn();
        const response = '{"errors":{"duplicate":"email"}}';
        const email = 'user123@gmail.com';
        window.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve(mockResponse(409, "Conflict", response)));
        const event: any = { preventDefault: () => null };
        const userInfo: any = { password: 'pass', username: 'user123', firstName: 'John', lastName: 'Smith', email }
        await registerActions.register(event, userInfo)(dispatch);
        expect(dispatch).toBeCalledWith(
            {
                payload: {
                    currentUser: null,
                    errorMessage: `Email ${email} is already taken. Please choose another.`
                },
                type: registerTypes.REGISTER
            }
        );
    });

    it("should create an action to display an error if a bad request is somehow sent to server (should never happen)", async () => {
        const dispatch = jest.fn();
        const response = '{"errors":{"invalid":"email"}}';
        window.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve(mockResponse(400, "Bad Request", response)));
        const event: any = { preventDefault: () => null };
        const userInfo: any = { password: 'pass', username: 'user123', firstName: 'John', lastName: 'Smith', email: 'user123gmail.com' }
        await registerActions.register(event, userInfo)(dispatch);
        expect(dispatch).toBeCalledWith(
            {
                payload: {
                    currentUser: null,
                    errorMessage: 'Something went wrong. Please try again later.'
                },
                type: registerTypes.REGISTER
            }
        );
    });

    it("should create an action to display an error if there is a field other than username or email that can't be duplicated (should never happen)", async () => {
        const dispatch = jest.fn();
        const response = '{"errors":{"duplicate":"password"}}';
        window.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve(mockResponse(409, "Conflict", response)));
        const event: any = { preventDefault: () => null };
        const userInfo: any = { password: 'pass', username: 'user123', firstName: 'John', lastName: 'Smith', email: 'user123gmail.com' }
        await registerActions.register(event, userInfo)(dispatch);
        expect(dispatch).toBeCalledWith(
            {
                payload: {
                    currentUser: null,
                    errorMessage: 'Something went wrong. Please try again later.'
                },
                type: registerTypes.REGISTER
            }
        );
    });

    it("should create an action to display an error if there is a server error", async () => {
        const dispatch = jest.fn();
        const response = 'Internal Server Error';
        window.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve(mockResponse(500, "Internal Server Error", response)));
        const event: any = { preventDefault: () => null };
        const userInfo: any = { password: 'pass', username: 'user123', firstName: 'John', lastName: 'Smith', email: 'user123gmail.com' }
        await registerActions.register(event, userInfo)(dispatch);
        expect(dispatch).toBeCalledWith(
            {
                payload: {
                    currentUser: null,
                    errorMessage: 'Something went wrong. Please try again later.'
                },
                type: registerTypes.REGISTER
            }
        );
    });
});