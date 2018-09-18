import { combineReducers } from "redux";
import { signInReducer } from "../reducers/signin.reducer"
import { playlistReducer} from "./playlist.reducer"

export interface ISignInState {
    credentials: {
      password: string,
      username: string
    },
    errorMessage: string
  }



  export interface IPlaylistState {
    playlist: {
      bucketKey: '',
      category: {},
      id: 0,
      name: '',
      owner: {},
      songs: []
    },
    publicPlaylist: [],
    usersPlaylist: []
  }

  export interface IState {
    signIn: ISignInState,
    playlist: IPlaylistState
  }

const reducer = combineReducers<IState>({
    playlist: playlistReducer,
    signIn: signInReducer,
  })

  export const state = (newState: any, action: any) => {

    return reducer(newState, action)
  }