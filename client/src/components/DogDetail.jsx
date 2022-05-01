import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { clearDetail } from '../redux/actions/actions';
import './DogDetail.css';



export default function DogDetail() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const p = useSelector(state => state.DogDetail)

  useEffect(() => {
    return () => {
      dispatch(clearDetail())
    }
  }, [])



  return (
    <div className="dogDetail">
      {p ? <>
              <div className="imagenDetail">
                <div className="imgContain">

              <img src={p.image} alt="" className="pDetailImg" />
                </div>
              </div>
              <div className="nombreDetail">
                <h2>{p.name}</h2>
              </div>
              <div className="datosDetail">              
                <p>Temperament: {p.temperament}</p>
                <p>Weight: {p.weight}</p>
                <p>Height: {p.height}</p>
                <p>Life Span:{p.life_span}</p>
              </div>
              <div className="botonDetail">
                <button onClick={()=> navigate('/dogs')}>Volver</button>
              </div>
              
              </>
        : <p>Cargando detalle</p>}



    </div>
  )
}
