import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearDetail } from '../redux/actions/actions';

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
            <img src={p.imagen} alt="" className="pDetailImg" />
            <div className="pDetailDatos">
                <h2>{p.nombre}</h2>
                <p>{p.temperamento}</p>
                <p>{p.peso}</p>
                <p>{p.altura}</p>
                <p>{p.años_de_vida}</p>
            </div>
            <Link to='/dogs'>
            <button>Volver</button>
            </Link>
        </div>
             : <p>Cargando detalle</p>}



    </div>
  )
}
