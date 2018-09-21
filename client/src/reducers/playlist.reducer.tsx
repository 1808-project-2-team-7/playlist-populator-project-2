import { IPlaylistState } from ".";
import { User } from "../models/User";
import { playlistTypes } from "../actions/playlist/playlist.types";
import { Category } from "../models/Category";

export const initialState: IPlaylistState = {
    playlist: {
        bucketKey: '',
        category: new Category,
        id: 0,
        name: '',
        owner: new User,
        songs: []
    },
    publicPlaylist: [],
    usersPlaylist: []
}

export const playlistReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case playlistTypes.FETCH_SONGS:
            return {
                ...state,
                playlist: {
                    ...state.playlist,
                    songs: action.payload.songs
                }
            }
        case playlistTypes.USERS_PLAYLIST:
        return{
            ...state,
            usersPlaylist: action.payload
        }
    }
    return state;
}