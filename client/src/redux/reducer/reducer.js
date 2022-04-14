import { GET_ALL_CHARACTERS, GET_CHARACTER_DETAIL, SEARCH_CHARACTER , CLEAR_DETAIL} from "../actions/actions";

const initialState ={
    allCharacters: [],
    characterDetail:{},
    searchChar:[]
}

function reducer(state=initialState, {type, payload}){
    switch(type){

        case GET_ALL_CHARACTERS:{
            return {
            ...state,
            allCharacters: payload
        }
    }

        case GET_CHARACTER_DETAIL:{
            return {
                ...state,
                characterDetail: payload
            }
        }

        case CLEAR_DETAIL:{
            return {
                ...state,
                characterDetail:{}
            }
        }

        case SEARCH_CHARACTER:{
            return {
                ...state,
                searchChar: payload
            }
        }

        
        default:  return state
        
    }
}

export default reducer;