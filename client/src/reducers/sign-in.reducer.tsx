import { signInTypes } from "../actions/sign-in/sign-in.types";
import { ISignInState } from ".";

export const initialState: ISignInState = {
  credentials: {
    password: '',
    username: ''
  },
  errorMessage: ''
}

export const signInReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case signInTypes.UPDATE_PASSWORD:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          password: action.payload.password
        }
      }
    case signInTypes.UPDATE_USERNAME:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          username: action.payload.username
        }
      }
    case signInTypes.LOGIN:
      const errorMessage = action.payload.errorMessage
      const newState = {
        ...state,
        errorMessage
      }
      if (!errorMessage) {
        newState.credentials = {
          password: '',
          username: ''
        }
      }
      return newState;
  }

  return state;
}