import { homeTypes } from "./home.types";
import { environment } from '../../environment';
export const fetchPlaylists = (page: number) => (dispatch: any) => {
    const size = 30;
    fetch(`${environment.context}playlists?page=${page}&size=${size}`)
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
                type: homeTypes.FETCH_PLAYLISTS
            })
        })
        .catch(err => {
            console.log(err);
        });
}