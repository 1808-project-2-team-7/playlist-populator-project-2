import { environment } from "../../environment";
import { categoryTypes } from "./category.type";


export const loadCategories = () => (dispatch: any) => {
    const fetchUrl = `${environment.context}categories`;
    fetch(fetchUrl)
        .then(resp => {
            if (resp.status === 200) {
                return resp.json();
            } else {
                throw new Error('Categories could not be retrieved')
            }
        }).then(resp => {
            console.log(resp);
            dispatch({
                payload: {
                    categories: resp
                },
                type: categoryTypes.LOAD_CATEGORIES
            })
        })
        .catch (err => {
            console.log(err);
        });
}

export const stateCheck = () => (dispatch: any) => {
    dispatch({ type: categoryTypes.CHECK_STATE})
}