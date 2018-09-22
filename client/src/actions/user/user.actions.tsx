import { userTypes } from './user.types';
import { environment } from '../../environment';
export const fetchUserPlaylists = (id:number) => (dispatch: any) => {
    fetch(`${environment.context}users/${id}`)
        .then(resp => {
            if (resp.status === 200) {
                return resp.json();
            } else {
                throw new Error('Failed to fetch playlists');
            }
        }).then(resp => {
            dispatch({
                payload: {
                    playlists: resp
                },
                type: userTypes.FETCH_USER_PLAYLISTS
            })
        })
        .catch(err => {
            console.log(err);
        });
}