import { GET_ALL_DOGS, GET_DOG_DETAIL, SEARCH_DOG, CLEAR_DETAIL} from "../actions/actions";

const initialState ={
    allDogs: [],
    DogDetail:{},
    searchDog:[]
}

function reducer(state=initialState, {type, payload}){
    switch(type){

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

        
        default:  return state
        
    }
}

export default reducer;