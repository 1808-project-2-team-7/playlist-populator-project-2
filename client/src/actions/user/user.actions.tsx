import { userTypes } from './user.types';
import { environment } from '../../environment';
export const fetchUserPlaylists = (id:number, page: number) => (dispatch: any) => {
    const size = 30;
    fetch(`${environment.context}users/1?page=${page}&size=${size}`)
        .then(resp => {
            if (resp.status === 200) {
                return resp.json();
            } else {
                throw new Error('Failed to fetch playlists');
            }
        }).then(resp => {
            dispatch({
                payload: {
                    doneLoading: resp && resp.constructor === Array && resp.length < size,
                    playlists: resp
                },
                type: userTypes.FETCH_USER_PLAYLISTS
            })
        })
        .catch(err => {
            console.log(err);
        });
}