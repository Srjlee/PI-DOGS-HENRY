import React, { useEffect, useState } from 'react'
import { getTemperaments,
          filterTemperament,
        filterOrigin,
        orderAZ,
        orderZA} from '../redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
export default function Nav() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTemperaments())
  }, []);
  const temps = useSelector(state => state.temps)
  const dogs = useSelector(state => state.allDogs)
      const filter = (e)=>{
           dispatch(filterTemperament(e.target.value)) 

      }

  return (
    <div>
      {!dogs?.length ? <p></p> :  <>
      <select onChange={filter}>
            <option defaultValue >Filtrar por temperamento</option> 
            {temps?.map(t=>(
              <option key={t.id} value={t.id} >{t.nombre}</option>
            ))}
        </select>
        <form>
            <input placeholder="Buscar por raza"></input>
            <button>Buscar</button>
        </form></>
      }
    </div>
  )
}

