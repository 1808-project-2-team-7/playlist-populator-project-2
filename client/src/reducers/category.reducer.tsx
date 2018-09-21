import { categoryTypes } from "../actions/category/category.types";
import { Category } from "../models/Category";

export const initialState: Category[] = []

export const categoryReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case categoryTypes.FETCH_CATEGORIES:
            return action.payload.categories;
    }
    return state;
}