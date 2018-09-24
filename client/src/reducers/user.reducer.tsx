import { userTypes } from "../actions/user/user.types";
import { IUserState } from ".";
import { createPlaylistTypes } from "../actions/create-playlist/create-playlist.types";
import { Playlist } from "../models/Playlist";

export const initialState: IUserState = {
    doneLoading: false,
    page: 0,
    userPlaylists: []
}

export const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case userTypes.FETCH_USER_PLAYLISTS:
            const newPlaylists = action.payload.userPlaylists;
            const nonDupPlaylists = newPlaylists.filter((playlist: Playlist) => state.userPlaylists.map((oldPlaylist: Playlist) => oldPlaylist.id).indexOf(playlist.id) === -1);
            return {
                ...state,
                doneLoading: action.payload.doneLoading,
                page: state.page + 1,
                userPlaylists: [...state.userPlaylists, ...nonDupPlaylists]
            }
        case createPlaylistTypes.SAVE_PLAYLIST_TO_DATABASE:
            return {
                ...state,
                doneLoading: false,
                page: 0
            }
        case createPlaylistTypes.GET_SONGS_FROM_DATABASE:
            return {
                ...state,
                doneLoading: false,
                page: 0
            }
        case createPlaylistTypes.CLEAR_PLAYLIST:
            const playlistId = action.payload.oldPlaylistId
            if (playlistId) {
                const userPlaylists = state.userPlaylists.filter((playlist: Playlist) => playlistId !== playlist.id);
                return {
                    ...state,
                    userPlaylists
                }
            }
    }
    return state;
}