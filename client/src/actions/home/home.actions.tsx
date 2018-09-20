import { homeTypes } from "./home.types";
import { environment } from '../../environment';
export const fetchPlaylists = () => (dispatch: any) => {
    fetch(`${environment.context}playlists`)
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
                type: homeTypes.FETCH_PLAYLISTS
            })
        })
        .catch(err => {
            console.log(err);
        });
}