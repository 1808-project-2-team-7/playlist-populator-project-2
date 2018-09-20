import history from '../../history';
import { User } from "../../models/User";
import { currentUserTypes } from "./current-user.types";

export const updateCurrentUser = (currentUser: User) => {
  return {
    payload: {
      currentUser
    },
    type: currentUserTypes.UPDATE_CURRENT_USER
  }
}

export const logout = () => {
  history.push('/');
  return {
    payload: {
      currentUser: null
    },
    type: currentUserTypes.LOGOUT
  }
}