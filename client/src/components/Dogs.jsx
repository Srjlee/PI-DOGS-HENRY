import React,{useEffect} from 'react';
import Dog from './Dog';
import { getAlldogs } from '../redux/actions/actions';
import {useDispatch, useSelector} from 'react-redux';


export default function Dogs() {
  // if(!dogs) return <h2>No hay perros cargados</h2>
  const dispatch =useDispatch()

  useEffect(() => {
    dispatch(getAlldogs())
  }, [])

  const dogs = useSelector(state => state.allDogs) 
  
  return (
    <div>
        <h1>Perros</h1>

       {
         dogs.map(p=> (
           <Dog 
           imagen={p.imagen}
           nombre= {p.nombre}
           temperamento= {p.temperamento}
           peso= {p.peso}

           />
         ))
       }

    </div>
  )
}
