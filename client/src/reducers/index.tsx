import { combineReducers } from "redux";
import { createPlaylistReducer } from "./create-playlist.reducer";
import { playlistReducer } from "./playlist.reducer"
import { signInReducer } from "./sign-in.reducer"
import { registerReducer } from "./register.reducer"
import { currentUserReducer } from "./current-user.reducer"
import { currentUserTypes } from "../actions/current-user/current-user.types";
import { User } from "../models/User";
import { Song } from "../models/Song";
import { Playlist } from "../models/Playlist";
import { playlistCardReducer } from "./playlist-card-reducer";

export interface ICreatePlaylistState {
  accessToken: string,
  errorMessage: string,
  songInput: string,
  artistInput: string,
  playlist: Playlist,
  suggestedSongs: Song[]
}

export interface ISignInState {
  credentials: {
    password: string,
    username: string
  },
  currentUser: User | null,
  errorMessage: string
}

export interface IPlaylistCardState {
  playlists: Playlist[]
}

export interface IPlaylistState {
  playlist: {
    bucketKey: string,
    category: any,
    id: number,
    name: string,
    owner: User,
    songs: Song[]
  },
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
  createPlaylist: ICreatePlaylistState,
  currentUser: User | null,
  playlist: IPlaylistState,
  register: IRegisterState,
  signIn: ISignInState
  playlistCard: IPlaylistCardState
}

const reducer = combineReducers<IState>({
  createPlaylist: createPlaylistReducer,
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
