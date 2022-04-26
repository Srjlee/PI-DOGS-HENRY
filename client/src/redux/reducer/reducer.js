import { GET_ALL_DOGS, GET_DOG_DETAIL, CREATE_DOG, ORDER_WEIGHT_ASC, ORDER_WEIGHT_DESC, CLEAR_SEARCH, SEARCH_DOG, CLEAR_DETAIL,CLEAR_ALLDOG, GET_TEMPERAMENTS, FILTER_TEMPERAMENTS, ORDER_AZ,ORDER_ZA} from "../actions/actions";
import { store } from "../store/store";

const initialState ={
    allDogs: [],
    DogDetail:{},
    temps: [],
    searchDog:[],
    
}

function ordenar(arr, prop) {   
    let ordenado = [] 
    if(prop === 'name') {
        ordenado = arr.sort(function (a, b) {        
            if (a[prop] < b[prop]) { return -1; }
            if (a[prop] > b[prop]) { return 1; }
            return 0;
        });
    } else 
    {
        ordenado = arr.sort(function (a, b) {            
            if (a[prop][0] < b[prop][0]) { return -1; }
            if (a[prop][0] > b[prop][0]) { return 1; }
            return 0;
        });
    
    }
    return ordenado
}
function reducer(state=initialState, {type, payload}){
    switch(type){
        case CREATE_DOG:{
            return {...state}
        }
        case FILTER_TEMPERAMENTS:{
            if(payload === '') return {...state}
            let copia = [...state.allDogs]
            let filtrado = copia.filter(p=> p.temperament?.toLowerCase().includes(payload))
            return {...state, searchDog: filtrado }
        }
        case CLEAR_SEARCH:{
            delete state.searchDog
            return {...state}
        }
        
        case ORDER_WEIGHT_ASC:{
            if(!state.searchDog) {

                let ordenado = ordenar([...state.allDogs], 'weight' )
                return {...state, allDogs: ordenado}
            } else {
                let ordenado = ordenar([...state.searchDog], 'weight')
                return {...state, searchDog: ordenado}
            }
        }        
        case ORDER_WEIGHT_DESC:{
            if(!state.searchDog) {                
                let ordenado = ordenar([...state.allDogs], 'weight' ).reverse()
                return {...state, allDogs: ordenado}
            } else {
                let ordenado = ordenar([...state.searchDog], 'weight').reverse()
                return {...state, searchDog: ordenado}
            }
        }        
        case ORDER_AZ:{
            if(!state.searchDog) {                
                let ordenado = ordenar([...state.allDogs], 'name' )
                return {...state, allDogs: ordenado}
            } else {
                let ordenado = ordenar([...state.searchDog], 'name')
                return {...state, searchDog: ordenado}
            }

        }
        case ORDER_ZA:{
            if(!state.searchDog) {                
                let ordenado = ordenar([...state.allDogs], 'name' ).reverse()
                return {...state, allDogs: ordenado}
            } else {
                let ordenado = ordenar([...state.searchDog], 'name').reverse()
                return {...state, searchDog: ordenado}
            }

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