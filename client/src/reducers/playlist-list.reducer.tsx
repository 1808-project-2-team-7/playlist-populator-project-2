import { IPlaylistListState } from ".";
import { playlistListTypes } from "../actions/playlist/playlist-list.types";
import { categoryTypes } from "../actions/category/category.types";

export const initialState: IPlaylistListState = {
    categoriesFetched: false,
    categoryFilter: [],
    filteredPlaylists: [],
    isLoading: false,
    nameFilter: '',
    page: 0
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
        case playlistListTypes.UPDATE_LOADING:
            const isLoading = action.payload.isLoading;
            return {
                ...state,
                isLoading,
                page: isLoading ? state.page : state.page + 1
            }
        case categoryTypes.FETCH_CATEGORIES:
            return {
                ...state,
                categoriesFetched: true,
                categoryFilter: action.payload.categories
            }
    }
    return state;
}