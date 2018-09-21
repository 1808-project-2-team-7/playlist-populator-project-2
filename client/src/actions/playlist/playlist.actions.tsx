import { environment } from '../../environment';
import { playlistTypes } from "./playlist.types";
import { Playlist } from '../../models/Playlist';

export const fetchSongs = (playlistId: number) => (dispatch: any) => {
    let fetchUrl = '';
    fetchUrl = `${environment.context}playlists/${playlistId}`;
    fetch(fetchUrl)
        .then(resp => {
            if (resp.status === 200) {
                return resp.json();
            } else {
                throw new Error('Failed to fetch playlist songs');
            }
        }).then(resp => {
            dispatch({
                payload: {
                    songs: resp.songs
                },
                type: playlistTypes.FETCH_SONGS
            })
        })
        .catch(err => {
            console.log(err);
        });
}

export const userPlaylists = (playlists: Playlist[], userId: number) => (dispatch: any) => {
    const  list = playlists.filter(lists => lists.owner.userId === userId );
    dispatch({
        payload: {
            usersPlaylists: list
        }, type: playlistTypes.USERS_PLAYLIST
    })
}