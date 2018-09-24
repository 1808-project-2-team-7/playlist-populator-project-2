import { IHomeState } from ".";
import { homeTypes } from "../actions/home/home.types";
import { createPlaylistTypes } from "../actions/create-playlist/create-playlist.types";

export const initialState: IHomeState = {
    doneLoading: false,
    page: 0,
    playlists: []
}

export const homeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case homeTypes.FETCH_PLAYLISTS:
            return {
                ...state,
                doneLoading: action.payload.doneLoading,
                page: state.page + 1,
                playlists: [...state.playlists, ...action.payload.playlists]
            }
        case createPlaylistTypes.SAVE_PLAYLIST_TO_DATABASE:
            return {
                ...state,
                playlists: [...state.playlists, action.payload.savedPlaylist]
            }
    }
    return state;
}