import { Playlist } from "../../models/Playlist";
import { playlistListTypes } from "./playlist-list.types";

export const filterPlaylists = (playlists: Playlist[], categoryFilter: string[]) => {
    const filteredPlaylists = playlists.filter(playlist => categoryFilter.indexOf(playlist.category.categoryName) >= 0);
    return {
        payload: {
            categoryFilter,
            filteredPlaylists
        },
        type: playlistListTypes.FILTER_PLAYLISTS
    }
}