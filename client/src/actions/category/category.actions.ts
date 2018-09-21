import { categoryTypes } from "./category.types";
import { environment } from '../../environment';

export const fetchCategories = (dispatch: any) => {
    fetch(`${environment.context}categories`)
        .then(resp => {
            if (resp.status === 200) {
                return resp.json();
            } else {
                throw new Error('Failed to fetch categories');
            }
        }).then(resp => {
            dispatch({
                payload: {
                    categories: resp
                },
                type: categoryTypes.FETCH_CATEGORIES
            })
        })
        .catch(err => {
            console.log(err);
        });
}