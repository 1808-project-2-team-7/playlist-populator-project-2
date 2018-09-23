import { userTypes } from "../actions/user/user.types";
import { IUserState } from ".";

export const initialState: IUserState = {
    doneLoading: false,
    userPlaylists: []
}

export const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case userTypes.FETCH_USER_PLAYLISTS:
            return {
                ...state,
                doneLoading: action.payload.doneLoading,
                userPlaylists: [...state.userPlaylists,, ...action.payload.userPlaylists]
            }
    }
    return state;
}