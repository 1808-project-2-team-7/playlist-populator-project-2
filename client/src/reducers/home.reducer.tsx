import { IHomeState } from ".";
import { homeTypes } from "../actions/home/home.types";

export const initialState: IHomeState = {
    doneLoading: false,
    playlists: []
}

export const homeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case homeTypes.FETCH_PLAYLISTS:
            return {
                ...state,
                doneLoading: action.payload.doneLoading,
                playlists: [...state.playlists, ...action.payload.playlists]
            }
    }
    return state;
}