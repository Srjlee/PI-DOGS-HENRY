import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearDetail } from '../redux/actions/actions';
import './Dog.css'


export default function DogDetail() {
    const dispatch = useDispatch()
    const p = useSelector(state=> state.DogDetail)

useEffect(() => {
  return () => {
  dispatch(clearDetail())
  }
}, [])


    
  return (
    <div>
      {  p ?  <div className="perroDetail">
            <img src={p.image} alt="" className="pDetailImg" />
            <div className="pDetailDatos">
                <h2>{p.name}</h2>
                <p>Temperament: {p.temperament}</p>
                <p>Weight: {p.weight}</p>
                <p>Height: {p.height}</p>
                <p>Life Span:{p.life_span}</p>
            </div>
            <Link to='/dogs'>
            <button>Volver</button>
            </Link>
        </div>
             : <p>Cargando detalle</p>}



    </div>
  )
}