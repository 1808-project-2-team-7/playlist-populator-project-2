import { ICreatePlaylistState } from ".";
import { createPlaylistTypes } from "../actions/create-playlist/create-playlist.types";
import { Category } from "../models/Category";
import { User } from "../models/User";


const initialState: ICreatePlaylistState= {
    accessToken: '',
    artistInput: '',
    message: '',
    playlist: {
        bucketKey: '',
        category: new Category(),
        id: 0,
        name: '',
        owner: new User(),
        songs: []
    },
    populated: false,
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
        case createPlaylistTypes.CLEAR_CATEGORY:
            return {
                ...state,
                playlist: {
                    ...state.playlist,
                    category: action.payload.category
                }
            }
        case createPlaylistTypes.CLEAR_PLAYLIST:
            return {
                ...state,
                playlist: {
                    ...state.playlist,
                    songs: action.payload
                },
                suggestedSongs: action.payload
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
        case createPlaylistTypes.SAVE_PLAYLIST_TO_DATABASE:
            return {
                ...state,
                playlist: action.payload.savedPlaylist
            }
            
        case createPlaylistTypes.SEND_IMAGE_TO_DATABASE:
            return {
                ...state,
                playlist: {
                    ...state.playlist,
                    bucketKey: action.payload.bucketKey
                }
            }
        case createPlaylistTypes.SET_CATEGORY_INFORMATION:
            return {
                ...state,
                playlist: {
                    ...state.playlist,
                    category: action.payload.category
                }
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
        case createPlaylistTypes.UPDATE_MESSAGE:
            return {
                ...state,
                message: action.payload.message
            }
        case createPlaylistTypes.UPDATE_POPULATED:
            return {
                ...state,
                populated: action.payload.populated
            }
        case createPlaylistTypes.UPDATE_SONG_INPUT:
            return {
                ...state,
                songInput: action.payload.songInput
            }
    }
    return state;
}