import history from '../../history';
import { registerTypes } from "./register.types";
import { environment } from '../../environment';

export const updatePassword = (password: string) => {
  return {
    payload: {
      password
    },
    type: registerTypes.UPDATE_PASSWORD
  }
}

export const updateUsername = (username: string) => {
  return {
    payload: {
      username
    },
    type: registerTypes.UPDATE_USERNAME
  }
}

export const updateEmail = (email: string) => {
    return {
      payload: {
        email
      },
      type: registerTypes.UPDATE_EMAIL
    }
  }

  export const updateFirstName = (firstName: string) => {
    return {
      payload: {
        firstName
      },
      type: registerTypes.UPDATE_FIRST_NAME
    }
  }

  export const updateLastName = (lastName: string) => {
    return {
      payload: {
        lastName
      },
      type: registerTypes.UPDATE_LAST_NAME
    }
  }

export const register = (e: React.FormEvent<HTMLFormElement>, credentials: any) => {
  return (dispatch: any) => {
    e.preventDefault();
  }
}