import { userTypes } from "../actions/user/user.types";
import { IUserState } from ".";

export const initialState: IUserState = {
    userPlaylists: []
}

export const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case userTypes.FETCH_USER_PLAYLISTS:
            return {
                ...state,
                userPlaylists: action.payload.playlists
            }
    }
    return state;
}