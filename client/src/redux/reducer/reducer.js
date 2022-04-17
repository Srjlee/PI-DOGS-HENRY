import { GET_ALL_DOGS, GET_DOG_DETAIL, SEARCH_DOG, CLEAR_DETAIL,CLEAR_ALLDOG, GET_TEMPERAMENTS, FILTER_TEMPERAMENTS,FILTER_ORIGIN,ORDER_WEIGHT,ORDER_AZ,ORDER_ZA} from "../actions/actions";
import { store } from "../store/store";

const initialState ={
    allDogs: [],
    DogDetail:{},
    temps: [],
    searchDog:[]
}

function order(arr, prop) {
    let result = arr.sort(function (a, b) {
        if (a[prop] < b[prop]) { return -1; }
        if (a[prop] > b[prop]) { return 1; }
        return 0;
    });
    return result
}

function reducer(state=initialState, {type, payload}){
    switch(type){
        case FILTER_TEMPERAMENTS:{
            
        }
        case FILTER_ORIGIN:{

        }
        case ORDER_WEIGHT:{

        }
        case ORDER_AZ:{

        }
        case ORDER_ZA:{

        }
        case CLEAR_ALLDOG:{
            return {
                ...state,
                allDogs: []
            }
        }

        case GET_ALL_DOGS:{
            return {
            ...state,
            allDogs: payload
        }
    }

        case GET_DOG_DETAIL:{
            return {
                ...state,
                DogDetail: payload
            }
        }

        case CLEAR_DETAIL:{
            return {
                ...state,
                DogDetail:{}
            }
        }

        case SEARCH_DOG:{
            return {
                ...state,
                searchDog: payload
            }
        }
        case GET_TEMPERAMENTS:{
            return {
                ...store,
                temps: payload
            }
        }

        
        default:  return state
        
    }
}

export default reducer;