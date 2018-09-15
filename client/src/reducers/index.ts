import { combineReducers } from "redux";
import { createPlaylistReducer } from "./create-playlist.reducer";
import { Playlist } from "../models/Playlist";
import { signInReducer } from "./sign-in.reducer"
import { Song } from "../models/Song";

export interface ISignInState {
  credentials: {
    password: string,
    username: string
  },
  errorMessage: string
}

export interface ICreatePlaylistState {
  accessToken: string,
  songInput: string,
  artistInput: string,
  playlist: Playlist,
  suggestedSongs: Song[]
}

export interface IState {
  createPlaylist: ICreatePlaylistState,
  signIn: ISignInState
}

const reducer = combineReducers<IState>({
  createPlaylist: createPlaylistReducer,
  signIn: signInReducer
})

export const state = (newState: any, action: any) => {
  return reducer(newState, action)
}