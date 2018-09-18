import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer"

export interface ISignInState {
    credentials: {
      password: string,
      username: string
    },
    currentUser: any,
    errorMessage: string
  }

  export interface IState {
    signIn: ISignInState
  }

const reducer = combineReducers<IState>({
    signIn: signInReducer
  })

  export const state = (newState: any, action: any) => {

    return reducer(newState, action)
  }