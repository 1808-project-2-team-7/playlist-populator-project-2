import { combineReducers } from "redux";
import { playlistReducer } from "./playlist.reducer"
import { signInReducer } from "./sign-in.reducer"
import { registerReducer } from "./register.reducer"
import { Playlist } from "../models/Playlist";
import { currentUserReducer } from "./current-user.reducer"
import { currentUserTypes } from "../actions/current-user/current-user.types";
import { User } from "../models/User";
// import { Song } from "../models/Song";
import { playlistCardReducer } from "./playlist-card-reducer";
import { Category } from "../models/Category";
import { categoryReducer } from "./category.reducer";

export interface ISignInState {
  credentials: {
    password: string,
    username: string
  },
  currentUser: User | null,
  errorMessage: string
}

export interface ICategoryState{
  categories: Category[]
}

export interface IPlaylistCardState {
  playlists: Playlist[]
}

export interface IPlaylistState {
  playlist:Playlist,
  publicPlaylist: any[],
  usersPlaylist: any[]
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
  categories: ICategoryState,
  currentUser: User | null,
  playlist: IPlaylistState,
  register: IRegisterState,
  signIn: ISignInState
  playlistCard: IPlaylistCardState
}

const reducer = combineReducers<IState>({
  categories: categoryReducer,
  currentUser: currentUserReducer,
  playlist: playlistReducer,
  playlistCard: playlistCardReducer,
  register: registerReducer,
  signIn: signInReducer
})

export const state = (newState: any, action: any) => {
  if (action.type === currentUserTypes.LOGOUT) {
    newState = undefined
  }

  return reducer(newState, action)
}
