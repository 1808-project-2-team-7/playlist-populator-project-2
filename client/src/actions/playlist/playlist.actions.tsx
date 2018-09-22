import { environment } from '../../environment';
import { playlistTypes } from "./playlist.types";

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
