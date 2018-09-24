import { IHomeState } from ".";
import { homeTypes } from "../actions/home/home.types";
import { createPlaylistTypes } from "../actions/create-playlist/create-playlist.types";
import { Playlist } from "../models/Playlist";

export const initialState: IHomeState = {
    doneLoading: false,
    page: 0,
    playlists: []
}

export const homeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case homeTypes.FETCH_PLAYLISTS:
            const newPlaylists = action.payload.playlists;
            const nonDupPlaylists = newPlaylists.filter((playlist: Playlist) => state.playlists.map((oldPlaylist: Playlist) => oldPlaylist.id).indexOf(playlist.id) === -1);
            return {
                ...state,
                doneLoading: action.payload.doneLoading,
                page: state.page + 1,
                playlists: [...state.playlists, ...nonDupPlaylists]
            }
        case createPlaylistTypes.SAVE_PLAYLIST_TO_DATABASE:
            return {
                ...state,
                doneLoading: false,
                page: 0
            }
    }
    return state;
}