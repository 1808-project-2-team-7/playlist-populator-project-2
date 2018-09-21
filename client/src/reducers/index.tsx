import { combineReducers } from "redux";
import { createPlaylistReducer } from "./create-playlist.reducer";
import { playlistReducer } from "./playlist.reducer"
import { playlistListReducer } from "./playlist-list.reducer"
import { homeReducer } from "./home.reducer"
import { signInReducer } from "./sign-in.reducer"
import { registerReducer } from "./register.reducer"
import { categoryReducer } from "./category.reducer"
import { currentUserReducer } from "./current-user.reducer"
import { currentUserTypes } from "../actions/current-user/current-user.types";
import { User } from "../models/User";
import { Song } from "../models/Song";
import { Playlist } from "../models/Playlist";
import { Category } from "../models/Category";

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

export interface IHomeState {
  playlists: Playlist[]
}

export interface IPlaylistListState {
  filteredPlaylists: Playlist[],
  categoryFilter: Category[],
  categoriesFetched: boolean,
  nameFilter: string
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
