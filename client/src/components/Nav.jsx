import React from 'react'
import {useDispatch, useSelector} from 'react-redux';

export default function Nav() {
  const dogs = useSelector(state => state.allDogs) 

  
  return (

      
    <div>
        <select>
            <option defaultValue >Filtra por temperamento</option>            
        </select>
        <form>
            <input placeholder="Buscar por raza"></input>
        </form>

    </div>
  )
}

