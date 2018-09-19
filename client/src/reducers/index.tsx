import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer"
import { registerReducer } from "./register.reducer"
import { playlistCardReducer } from "./playlist-card-reducer";
import { Playlist } from "../models/Playlist";

export interface IPlaylistCardState{
  playlists: Playlist[]
}

export interface ISignInState {
  credentials: {
    password: string,
    username: string
  },
  currentUser: any,
  errorMessage: string
}

export interface IRegisterState {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  errorMessage: string,
  currentUser: any
}

export interface IState {
  register: IRegisterState,
  signIn: ISignInState
  playlistCard: IPlaylistCardState
}

const reducer = combineReducers<IState>({
  playlistCard: playlistCardReducer,
  register: registerReducer,
  signIn: signInReducer
})

export const state = (newState: any, action: any) => {

  return reducer(newState, action)
}