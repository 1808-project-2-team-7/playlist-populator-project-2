import { combineReducers } from "redux";
import { playlistReducer} from "./playlist.reducer"
import { signInReducer } from "./sign-in.reducer"
import { registerReducer } from "./register.reducer"
import { Playlist } from "../models/Playlist";

export interface ISignInState {
  credentials: {
    password: string,
    username: string
  },
  currentUser: any,
  errorMessage: string
}



  export interface IPlaylistState {
    playlist: Playlist,
    allPlaylist: Playlist[],
    displayedPlaylist: Playlist[]
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
  currentUser: any
}


const reducer = combineReducers<IState>({
  playlist: playlistReducer,
  register: registerReducer,
  signIn: signInReducer
})

export const state = (newState: any, action: any) => {

  return reducer(newState, action)
}