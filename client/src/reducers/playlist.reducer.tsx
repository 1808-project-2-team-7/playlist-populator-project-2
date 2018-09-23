import { IPlaylistState } from ".";
import { playlistTypes } from "../actions/playlist/playlist.types";
import { Playlist } from "../models/Playlist";

export const initialState: IPlaylistState = {
    playlist: new Playlist()
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