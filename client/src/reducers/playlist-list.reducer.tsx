import { IPlaylistListState } from ".";
import { playlistListTypes } from "../actions/playlist/playlist-list.types";

export const initialState: IPlaylistListState = {
    categoryFilter: [],
    filteredPlaylists: [],
    nameFilter: ''
}

export const playlistListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case playlistListTypes.FILTER_PLAYLISTS:
            return {
                ...state,
                categoryFilter: action.payload.categoryFilter,
                filteredPlaylists: action.payload.filteredPlaylists,
                nameFilter: action.payload.nameFilter
            }
    }
    return state;
}