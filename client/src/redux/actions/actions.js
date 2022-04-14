import axios from "axios";

export const GET_ALL_CHARACTERS ="GET_ALL_CHARACTERS";
export const GET_CHARACTER_DETAIL = "GET_CHARACTER_DETAIL";
export const SEARCH_CHARACTER = "SEARCH_CHARACTER";
export const CLEAR_DETAIL = "CLEAR_DETAIL"

const URL = "https://rickandmortyapi.com/api/character"

export function getAllCharacters(){
    return function (dispatch){
        return fetch(URL)
        .then(r=>r.json())
        .then(res=> dispatch({type: GET_ALL_CHARACTERS, payload: res.results }))
        .catch(error=> console.log("ERROR--->",error))
    }
}

export const getCharacterDetail = (id) => dispatch => {
    return axios(`${URL}/${id}`)
    .then(response=>dispatch({type:GET_CHARACTER_DETAIL, payload: response.data}))
    .catch(error=> console.log("ERROR--->",error))

}

export function clearDetail(){
    return {type: CLEAR_DETAIL}
} 

export function searchbar(name){
    return function (dispatch){
        return fetch(URL+ "/?name=" + name)
        .then(r=>r.json())
        .then(res=> dispatch({type: SEARCH_CHARACTER, payload: res.results }))
        .catch(error=> console.log("ERROR--->",error))
    } 
}