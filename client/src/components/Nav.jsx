import React, { useEffect, useState } from 'react'
import {
  getTemperaments,
  filterTemperament,
  filterOrigin,
  orderAZ, clearSearch, orderWeightAsc, orderWeightDesc,
  orderZA,
  searchbar
} from '../redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Nav() {

  const [buscar, setBuscar] = useState({
    name: '',
  })

  const search = (e) => {
    setBuscar({ name: e.target.value })
  }



  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTemperaments())
  }, []);
  const temps = useSelector(state => state.temps)
  const dogs = useSelector(state => state.allDogs)
  
  const filter = (e) => {
    dispatch(filterTemperament((e.target.value).toLowerCase()))

  }
  const query = (e) => { e.preventDefault(); dispatch(searchbar(buscar.name)); setBuscar({ name: '' }) }
  const vertodos = () => dispatch(clearSearch())

  const orderRaza = (e)=> {
    if((e.target.value) === 'asc') return dispatch(orderAZ());
    if((e.target.value) === 'des') return dispatch(orderZA());
    return
    }
    const orderWeight = (e)=> {
      if((e.target.value) === 'asc') return dispatch(orderWeightAsc());
      if((e.target.value) === 'des') return dispatch(orderWeightDesc());
      return
      }
  return (
    <div>
      <Link to='/dogs'>
        <button onClick={vertodos}>Ver Todos</button>
      </Link>


      {!dogs?.length ? <p></p> : <>
        <select onChange={filter}>
          <option defaultValue>Filtrar por temperamento</option>
          {temps?.map(t => (
            <option key={t.id} value={t.name} >{t.name}</option>
          ))}
        </select>
        <select onChange={orderWeight} >
          <option defaultValue='' >Ordena por Peso</option>
          <option value='asc'>Ascendente</option>
          <option value='des'>Descendente</option>
        </select>
        <select onChange={orderRaza}>
          <option defaultValue=''>Ordena por Nombre</option>
          <option value='asc'>Ascendente</option>
          <option value='des'>Descendente</option>
        </select>
        <form onSubmit={query}>
          <input placeholder="Buscar por raza" onChange={search} value={buscar.name}></input>
          <button >Buscar</button>
        </form>
        <Link to="/dog">
          <button>Crear Nueva Raza</button>
        </Link>
        </>
        

      }
    </div>
  )
}

