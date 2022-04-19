import React, { useEffect, useState } from 'react'
import { getTemperaments,
          filterTemperament,
        filterOrigin,
        orderAZ, clearSearch,
        orderZA,
        searchbar} from '../redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Nav() {

  const [buscar, setBuscar] = useState({
    name: '',
  })

  const search = (e)=>{
    setBuscar({name: e.target.value})
  }

  
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTemperaments())
  }, []);
  const temps = useSelector(state => state.temps)
  const dogs = useSelector(state => state.allDogs)
  const searchDog = useSelector(state => state.searchDog)
  const filter = (e)=>{
    dispatch(filterTemperament((e.target.value).toLowerCase())) 
    
  }
  const query = (e)=> {e.preventDefault(); dispatch(searchbar(buscar.name)); setBuscar({name:''})}
  const vertodos = ()=> dispatch(clearSearch())
  return (
    <div>
      <Link to='/dogs'>
      <button onClick={vertodos}>Ver Todos</button>
      </Link>
      

      {!dogs?.length ? <p></p> :  <>
      <select onChange={filter}>
            <option defaultValue >Filtrar por temperamento</option> 
            {temps?.map(t=>(
              <option key={t.id} value={t.name} >{t.name}</option>
            ))}
        </select>
        <form onSubmit={query}>
            <input placeholder="Buscar por raza" onChange={search} value={buscar.name}></input>
            <button >Buscar</button> 
        </form></>
      }
    </div>
  )
}

