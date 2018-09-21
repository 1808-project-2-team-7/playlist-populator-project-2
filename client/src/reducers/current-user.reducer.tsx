import { currentUserTypes } from "../actions/current-user/current-user.types";
import { User } from "../models/User";
import { signInTypes } from "../actions/sign-in/sign-in.types";
import { registerTypes } from "../actions/register/register.types";

const initialState: User | null = null

export const currentUserReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case currentUserTypes.UPDATE_CURRENT_USER:
        case currentUserTypes.LOGOUT:
        case signInTypes.LOGIN:
        case registerTypes.REGISTER:
            return action.payload.currentUser;
    }
    return state;
}