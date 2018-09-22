import { combineReducers } from "redux";
import { currentUserTypes } from "../actions/current-user/current-user.types";
import { Category } from "../models/Category";
import { Playlist } from "../models/Playlist";
import { Song } from "../models/Song";
import { User } from "../models/User";
import { categoryReducer } from "./category.reducer";
import { createPlaylistReducer } from "./create-playlist.reducer";
import { currentUserReducer } from "./current-user.reducer";
import { homeReducer } from "./home.reducer";
import { playlistListReducer } from "./playlist-list.reducer";
import { playlistReducer } from "./playlist.reducer";
import { registerReducer } from "./register.reducer";
import { signInReducer } from "./sign-in.reducer";

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
  errorMessage: string
}

export interface IHomeState {
  playlists: Playlist[],
  doneLoading: boolean
}

export interface IPlaylistListState {
  filteredPlaylists: Playlist[],
  categoryFilter: Category[],
  categoriesFetched: boolean,
  isLoading: boolean,
  page: number,
  nameFilter: string
}

export interface IPlaylistState {
<<<<<<< HEAD
  playlist:Playlist
=======
  playlist: Playlist,
  publicPlaylist: any[],
  usersPlaylist: any[]
>>>>>>> fdb516946ba0b2c5e84cb9aed69bede3e4b894ba
}

export interface IRegisterState {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  errorMessage: string
}

export interface IState {
  categories: Category[],
  createPlaylist: ICreatePlaylistState,
  currentUser: User | null,
  home: IHomeState,
  playlist: IPlaylistState,
  playlistList: IPlaylistListState,
  register: IRegisterState,
  signIn: ISignInState

}

const reducer = combineReducers<IState>({
  categories: categoryReducer,
  createPlaylist: createPlaylistReducer,
  currentUser: currentUserReducer,
  home: homeReducer,
  playlist: playlistReducer,
  playlistList: playlistListReducer,
  register: registerReducer,
  signIn: signInReducer
})

export const state = (newState: any, action: any) => {
  if (action.type === currentUserTypes.LOGOUT) {
    newState = undefined
  }

  return reducer(newState, action)
}
