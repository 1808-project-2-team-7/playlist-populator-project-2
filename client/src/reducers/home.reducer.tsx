import { IHomeState } from ".";
import { homeTypes } from "../actions/home/home.types";

export const initialState: IHomeState = {
    doneLoading: false,
    page: 0,
    playlists: []
}

export const homeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case homeTypes.FETCH_PLAYLISTS:
            return {
                ...state,
                doneLoading: action.payload.doneLoading,
                page: state.page + 1,
                playlists: [...state.playlists, ...action.payload.playlists]
            }
    }
    return state;
}