import history from '../../history';
import { currentUserTypes } from "./current-user.types";

export const logout = () => {
  history.push('/');
  return {
    payload: {
      currentUser: null
    },
    type: currentUserTypes.LOGOUT
  }
}