import { combineReducers } from "redux";
import { signInReducer } from "../reducers/signin.reducer"

export interface ISignInState {
    credentials: {
      password: string,
      username: string
    },
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