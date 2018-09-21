import { Playlist } from "../../models/Playlist";
import { playlistListTypes } from "./playlist-list.types";

export const filterPlaylists = (playlists: Playlist[], categoryFilter: string[], nameFilter: string) => {
    let filteredPlaylists = playlists.filter(playlist => categoryFilter.indexOf(playlist.category.categoryName) >= 0);
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