import { IHomeState } from ".";
import { homeTypes } from "../actions/home/home.types";

export const initialState: IHomeState = {
    playlists: []
}

export const homeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case homeTypes.FETCH_PLAYLISTS:
            return {
                ...state,
                playlists: action.payload.playlists
            }
    }
    return state;
}