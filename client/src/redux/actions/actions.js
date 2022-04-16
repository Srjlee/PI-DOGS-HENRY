import axios from "axios";

export const GET_ALL_DOGS ="GET_ALL_DOGS";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const SEARCH_DOG = "SEARCH_DOG";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const CREATE_DOG = "CREATE_DOG";

const URL_DOGS = "http://localhost:3001/dogs";
// const URL_DOG = "http://localhost:3001/dog";
// const URL_TEMPERAMENT = "http://localhost:3001/temperament" 

export function getAlldogs(){
    return async function (dispatch){
        try {
            const r = await fetch(URL_DOGS);
            const res = await r.json();
            return dispatch({ type: GET_ALL_DOGS, payload: res });
        } catch (error) {
            return console.log("ERROR--->", error);
        }
    }
}

export const getDogDetail = (id) => async dispatch => {
    try {
        const response = await axios(`${URL_DOGS}/${id}`);
        return dispatch({ type: GET_DOG_DETAIL, payload: response.data });
    } catch (error) {
        return console.log("ERROR--->", error);
    }

}

export function clearDetail(){
    return {type: CLEAR_DETAIL}
} 

export function searchbar(name){
    return async function (dispatch){
        try {
            const r = await fetch(`${URL_DOGS}`);
            const res = await r.json();
            return dispatch({ type: SEARCH_DOG, payload: res });
        } catch (error) {
            return console.log("ERROR--->", error);
        }
    } 
}

// export function CREATE_DOG(input) { 
//     return async function (dispatch) {
//         try {
//             const r = await fetch(URL + dog)

//         } catch (error) {
            
//         }
//     }
// }