import { IPlaylistState } from ".";
import { User } from "../models/User";
import { playlistTypes } from "../actions/playlist/playlist.types";

export const initialState: IPlaylistState = {
    playlist: {
        bucketKey: '',
        category: {},
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
    }
    return state;
}