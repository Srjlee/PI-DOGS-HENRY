import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const SEARCH_DOG = "SEARCH_DOG";
export const CLEAR_SEARCH = "CLEAR_SEARCH"
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const CREATE_DOG = "CREATE_DOG";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const CLEAR_ALLDOG = "CLEAR_ALLDOG";
export const FILTER_TEMPERAMENTS = "FILTER_TEMPERAMENTS";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const ORDER_WEIGHT_ASC = "ORDER_WEIGHT_ASC";
export const ORDER_WEIGHT_DESC = "ORDER_WEIGHT_DESC";
export const ORDER_AZ = "ORDER_AZ";
export const ORDER_ZA = "ORDER_ZA";

const URL_SRJLEE = process.env.REACT_APP_API_URL||"http://localhost:3001"
const URL_DOGS = URL_SRJLEE + "/dogs"; 
const URL_DB = URL_SRJLEE + "/dog";
const URL_TEMPERAMENT = URL_SRJLEE + "/temperament";

export function filterTemperament(temp) {
    return { type: FILTER_TEMPERAMENTS, payload: temp }
}
export function filterOrigin(origin) {

    console.log(origin)
    return { type: FILTER_ORIGIN, payload: origin }
}
export function orderWeightAsc() {
    return { type: ORDER_WEIGHT_ASC }
}
export function orderWeightDesc() {
    return { type: ORDER_WEIGHT_DESC }
}
export function orderAZ() {
    return { type: ORDER_AZ }
}
export function orderZA() {
    return { type: ORDER_ZA }
}

export function getAlldogs() {  // ok!
    return async function (dispatch) {
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

export function clearAllDogs() { // ok!
    return { type: CLEAR_ALLDOG }
}

export function clearDetail() {
    return { type: CLEAR_DETAIL }
}

export function searchbar(name) {
    return async function (dispatch) {
        try {
            const r = await fetch(`${URL_DOGS}?name=${name}`);
            const res = await r.json();
            return dispatch({ type: SEARCH_DOG, payload: res });
        } catch (error) {
            return console.log("ERROR--->", error);
        }
    }
}

export function createDog(dog) {
    return async function (dispatch) {
        try {
            let perro = {                
                name: dog.name,
                height: `${dog.heightMin} - ${dog.heightMax}`,
                weight: `${dog.weightMin} - ${dog.weightMax}`,
                life_span: `${dog.life_spanMin} - ${dog.life_spanMax}`,
                image: dog.image,
                temperamentos: dog.temperament.map(t=> parseInt(t.id)) ///  1
            }
            

            let resp = ''
            await axios.post(URL_DB, perro)
            .then(r => resp = r.data )
            
                      
            return dispatch({
            type: CREATE_DOG, payload: resp
        })
    } catch (error) {
            return console.log(error)
    }
}
}
export function getTemperaments() {
    return async function (dispatch) {
        try {
            const r = await axios(URL_TEMPERAMENT)
            const res = r.data
            return dispatch({ type: GET_TEMPERAMENTS, payload: res })
        } catch (error) {

        }
    }
}

export function clearSearch() {
    return { type: CLEAR_SEARCH }
}
