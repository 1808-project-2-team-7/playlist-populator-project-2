import { playlistTypes } from "../actions/playlist/playlist.type";
import { IPlaylistState } from ".";

const initialState: IPlaylistState = {
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

export const playlistReducer = (state= initialState, action: any) => {
    switch (action.type) {
        case playlistTypes.GET_PUBLIC_LIST:
        return {
            ...state,
            publicPlaylist: action.payload.publicPlaylist
        }
        case playlistTypes.GET_USERS_LISTS:
        return {
            ...state,
            usersPlaylist: action.payload.usersPlaylist
        }
        case playlistTypes.LOAD_LIST:
        return {
            ...state,
            playlist: action.payload.playlist
            }
        }
    return state;
}