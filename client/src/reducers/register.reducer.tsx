import { registerTypes } from "../actions/register/register.types";
import { IRegisterState } from ".";

export const initialState: IRegisterState = {
  email: '',
  errorMessage: '',
  firstName: '',
  lastName: '',
  password: '',
  username: ''
}

export const registerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case registerTypes.UPDATE_USERNAME:
      return {
        ...state,
        username: action.payload.username
      }
    case registerTypes.UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload.password
      }
    case registerTypes.UPDATE_FIRST_NAME:
      return {
        ...state,
        firstName: action.payload.firstName
      }
    case registerTypes.UPDATE_LAST_NAME:
      return {
        ...state,
        lastName: action.payload.lastName
      }
    case registerTypes.UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload.email
      }
    case registerTypes.REGISTER:
      const errorMessage = action.payload.errorMessage
      const newState = {
        ...state,
        errorMessage
      }
      if (!errorMessage) {
        newState.email = '';
        newState.firstName = '';
        newState.lastName = '';
        newState.password = '';
        newState.username = '';
      }
      return newState;
  }

  return state;
}