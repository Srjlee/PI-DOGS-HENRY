import React,{useEffect} from 'react';
import Dog from './Dog';
import { getAlldogs } from '../redux/actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import './Dog.css'


export default function Dogs() {
  // if(!dogs) return <h2>No hay perros cargados</h2>
  const dispatch =useDispatch()

  useEffect(() => {
    dispatch(getAlldogs())
  }, [])

  const dogs = useSelector(state =>state)  
    return (
    <div>
        <h1>Perros</h1>
    <div className="perros">

       {
        !dogs.searchDog ? !dogs.allDogs ? <img src="https://i2.wp.com/revista.weepec.com/wp-content/uploads/2017/04/caminar.gif?zoom=1.5&resize=500%2C317&ssl=1" alt="Cargando" /> :  dogs.allDogs?.map(p=> (
           <Dog 
           key={p.id}
           image={p.image}
           name= {p.name}
           temperament= {p.temperament}
           weight= {p.weight}
           id= {p.id}

           />
         )) : 
         dogs.searchDog.length === 0 ? <p>No se encontraron Resultados</p> :
         dogs.searchDog?.map(p=> (
          <Dog 
          key={p.id}
          image={p.image}
          name= {p.name}
          temperament= {p.temperament}
          weight= {p.weight}
          id= {p.id}

          />))
         
       }
    </div>

    </div>
  )
}
