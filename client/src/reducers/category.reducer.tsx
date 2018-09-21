
import { ICategoryState} from ".";
import { categoryTypes } from "../actions/category/category.type";

export const initialState: ICategoryState = {
  categories: [],

}
export const categoryReducer = (state = initialState, action:any)=>{
  switch(action.type) {
    case categoryTypes.LOAD_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }
    case categoryTypes.CHECK_STATE:
      console.log(state);
      return state;
  }  
  return state;
}