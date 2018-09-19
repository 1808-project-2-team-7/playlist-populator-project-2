import { playlistTypes } from "./playlist.type";

const url = "http://localhost:8080/"
export const loadPlaylist = (id: number) => (dispatch: any) => {
    fetch(`${url}playlists/${id}`, {
        credentials: 'include',
    })
    .then(resp => resp.json())
    .then(playlist => {
        dispatch({
            payload: {
                playlist
            },
            type: playlistTypes.LOAD_LIST
        })
        return playlist;
    })
    .catch(err => {
        console.log(err);
    })

}
