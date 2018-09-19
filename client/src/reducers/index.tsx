import { combineReducers } from "redux";
import { playlistReducer } from "./playlist.reducer"
import { signInReducer } from "./sign-in.reducer"
import { registerReducer } from "./register.reducer"
import { currentUserReducer } from "./current-user.reducer"
import { currentUserTypes } from "../actions/current-user/current-user.types";
import { User } from "../model/User";

export interface ISignInState {
  credentials: {
    password: string,
    username: string
  },
  currentUser: User | null,
  errorMessage: string
}



export interface IPlaylistState {
  playlist: {
    bucketKey: string,
    category: any,
    id: number,
    name: string,
    owner: User,
    songs: any[]
  },
  publicPlaylist: any[],
  usersPlaylist: any[]
}


export interface IState {
  playlist: IPlaylistState,
  register: IRegisterState,
  signIn: ISignInState
}

export interface IRegisterState {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  errorMessage: string,
  currentUser: User | null
}

export interface IState {
  currentUser: User | null,
  register: IRegisterState,
  signIn: ISignInState
}

const reducer = combineReducers<IState>({
  currentUser: currentUserReducer,
  playlist: playlistReducer,
  register: registerReducer,
  signIn: signInReducer
})

export const state = (newState: any, action: any) => {
  if (action.type === currentUserTypes.LOGOUT) {
    newState = undefined
  }

  return reducer(newState, action)
}
