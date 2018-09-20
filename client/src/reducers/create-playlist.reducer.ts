import { ICreatePlaylistState } from ".";
import { createPlaylistTypes } from "../actions/create-playlist/create-playlist.types";
import { Category } from "../models/Category";
import { User } from "../models/User";


const initialState: ICreatePlaylistState= {
    accessToken: '',
    artistInput: '',
    errorMessage: '',
    playlist: {
        bucketKey: '',
        category: new Category(),
        id: 0,
        name: '',
        owner: new User(),
        songs: []
    },
    songInput: '',
    suggestedSongs: []
}

export const createPlaylistReducer= (state= initialState, action: any) => {

    switch(action.type){
        case createPlaylistTypes.ADD_INPUT_TO_PLAYLIST:
            return {
                ...state,
                playlist: {
                    ...state.playlist,
                    songs: [...state.playlist.songs, action.payload.song]
                }
            }
        case createPlaylistTypes.CLEAR_SONG_FROM_SUGGESTED_SONGS:
            return {
                ...state,
                suggestedSongs: action.payload.newSuggestedSongs
            }
        case createPlaylistTypes.CLEAR_SUGGESTED_SONGS:
            return {
                ...state,
                suggestedSongs: action.payload
            }
        case createPlaylistTypes.GET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload.accessToken
            }
        case createPlaylistTypes.GET_SONGS_FROM_DATABASE:
            return {
                ...state,
                playlist: {
                    ...state.playlist,
                    songs: action.payload.songsToReturn
                }
            }
        case createPlaylistTypes.GET_SONGS_FROM_SPOTIFY_API:
            return {
                ...state,
                playlist: {
                    ...state.playlist,
                    songs: [...state.playlist.songs, ...action.payload.songsToAddToPlaylist]
                }
            }
        case createPlaylistTypes.GET_SUGGESTED_SONGS:
            return {
                ...state,
                suggestedSongs: [...state.suggestedSongs, ...action.payload.suggestedSongs]
            }
        case createPlaylistTypes.SET_PLAYLIST_OWNER:
            return {
                ...state,
                playlist: {
                    ...state.playlist,
                    owner: action.payload.owner
                }
            }
        case createPlaylistTypes.REMOVE_SONG_FROM_PLAYLIST:
            return {
                ...state,
                playlist: {
                    ...state.playlist,
                    songs: action.payload.playlistWithSongRemoved
                }
            }
        case createPlaylistTypes.UPDATE_ARTIST_INPUT:
            return {
                ...state,
                artistInput: action.payload.artistInput
            }
        case createPlaylistTypes.UPDATE_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.payload.message
            }
        case createPlaylistTypes.UPDATE_SONG_INPUT:
            return {
                ...state,
                songInput: action.payload.songInput
            }
    }
    return state;
}