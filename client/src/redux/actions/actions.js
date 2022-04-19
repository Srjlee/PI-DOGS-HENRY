import axios from "axios";

export const GET_ALL_DOGS ="GET_ALL_DOGS";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const SEARCH_DOG = "SEARCH_DOG";
export const CLEAR_SEARCH = "CLEAR_SEARCH"
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const CREATE_DOG = "CREATE_DOG";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const CLEAR_ALLDOG = "CLEAR_ALLDOG";
export const FILTER_TEMPERAMENTS = "FILTER_TEMPERAMENTS";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const ORDER_WEIGHT = "ORDER_WEIGHT";
export const ORDER_AZ = "ORDER_AZ";
export const ORDER_ZA = "ORDER_ZA";

const URL_DOGS = "http://localhost:3001/dogs";
// const URL_DOG = "http://localhost:3001/dog";
const URL_TEMPERAMENT = "http://localhost:3001/temperament" 

export function filterTemperament(temp) {
    return {type: FILTER_TEMPERAMENTS, payload: temp}
}
export function filterOrigin(){
    return {type: FILTER_ORIGIN}
}
export function orderWeight(){
    return {type: ORDER_WEIGHT}
}
export function orderAZ(){
    return {type: ORDER_AZ}
}
export function orderZA(){
    return {type: ORDER_ZA}
}

export function getAlldogs(){  // ok!
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


export const getDogDetail = (id) => async dispatch => { // ok!!
    try {
        const response = await axios(`${URL_DOGS}/${id}`);
        return dispatch({ type: GET_DOG_DETAIL, payload: response.data });
    } catch (error) {
        return console.log("ERROR--->", error);
    }

}

export function clearAllDogs(){ // ok!
    return {type: CLEAR_ALLDOG}
} 

export function clearDetail(){
    return {type: CLEAR_DETAIL}
} 

export function searchbar(name){
    return async function (dispatch){
        try {
            const r = await fetch(`${URL_DOGS}?name=${name}`);
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
export function getTemperaments () {
    return async function (dispatch){
        try {
            const r = await axios(URL_TEMPERAMENT)
            const res = r.data
            return dispatch({type: GET_TEMPERAMENTS, payload: res})
        } catch (error) {
            
        }
    }
}

export function clearSearch (){
    return {type: CLEAR_SEARCH}
}
