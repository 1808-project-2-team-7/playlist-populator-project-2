import { userTypes } from "../actions/user/user.types";
import { IUserState } from ".";
import { createPlaylistTypes } from "../actions/create-playlist/create-playlist.types";

export const initialState: IUserState = {
    doneLoading: false,
    page: 0,
    userPlaylists: []
}

export const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case userTypes.FETCH_USER_PLAYLISTS:
            return {
                ...state,
                doneLoading: action.payload.doneLoading,
                page: state.page + 1,
                userPlaylists: [...state.userPlaylists, ...action.payload.userPlaylists]
            }
        case createPlaylistTypes.SAVE_PLAYLIST_TO_DATABASE:
            return {
                ...state,
                userPlaylists: [...state.userPlaylists, action.payload.savedPlaylist]
            }
    }
    return state;
}