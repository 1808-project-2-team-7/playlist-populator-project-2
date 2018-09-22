import { Playlist } from "../../models/Playlist";
import { playlistListTypes } from "./playlist-list.types";
import { Category } from "../../models/Category";

export const filterPlaylists = (playlists: Playlist[], categoryFilter: Category[], nameFilter: string) => {
    const categoryNames = categoryFilter.map(category => category.categoryName);
    let filteredPlaylists = playlists.filter(playlist => categoryNames.indexOf(playlist.category.categoryName) >= 0);
    if (nameFilter) {
        filteredPlaylists = filteredPlaylists.filter(playlist => playlist.name.toLowerCase().indexOf(nameFilter.toLowerCase()) >= 0);
        filteredPlaylists = filteredPlaylists.filter(playlist => playlist.name.toLowerCase() === nameFilter.toLowerCase()).concat(filteredPlaylists.filter(playlist => playlist.name.toLowerCase() !== nameFilter.toLowerCase()));
    }
    return {
        payload: {
            categoryFilter,
            filteredPlaylists,
            nameFilter
        },
        type: playlistListTypes.FILTER_PLAYLISTS
    }
}

export const updateLoading = (isLoading: boolean) => {
    return {
        payload: {
            isLoading
        },
        type: playlistListTypes.UPDATE_LOADING
    }
}