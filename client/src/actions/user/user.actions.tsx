import { userTypes } from './user.types';
import { environment } from '../../environment';
import { Playlist } from '../../models/Playlist';
export const fetchUserPlaylists = (page: number, id: number) => (dispatch: any) => {
    const size = 30;
    fetch(`${environment.context}playlists/user/${id}?page=${page}&size=${size}`)
        .then(resp => {
            if (resp.status === 200) {
                return resp.json();
            } else {
                throw new Error('Failed to fetch playlists');
            }
        }).then(resp => {
            const playlists: Playlist[] = resp;
            dispatch({
                payload: {
                    doneLoading: resp && resp.constructor === Array && resp.length < size,
                    userPlaylists: playlists
                },
                type: userTypes.FETCH_USER_PLAYLISTS
            })
        })
        .catch(err => {
            console.log(err);
        });
}