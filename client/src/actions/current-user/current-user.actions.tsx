import history from '../../history';
import { currentUserTypes } from "./current-user.types";
import { getCategories } from '../../App';

export const logout = () => {
  history.push('/');
  return {
    payload: {
      categories: getCategories(),
      currentUser: null
    },
    type: currentUserTypes.LOGOUT
  }
}