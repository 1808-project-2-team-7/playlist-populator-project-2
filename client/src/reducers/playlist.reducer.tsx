import { IPlaylistState } from ".";
import { User } from "../model/User";

export const initialState: IPlaylistState = {
    playlist: {
        bucketKey: '',
        category: {},
        id: 0,
        name: '',
        owner: new User,
        songs: []
    },
    publicPlaylist: [],
    usersPlaylist: []
}

export const playlistReducer = (state = initialState, action: any) => {
    return state;
}