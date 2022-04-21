import React,{useEffect, useState} from 'react';
import Dog from './Dog';
import Pagination from './Pagination';
import { getAlldogs } from '../redux/actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import './Dog.css'

export default function Dogs() {
  const dispatch =useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;  
  useEffect(() => {
    dispatch(getAlldogs())
  }, [])
  const dogs = useSelector(state =>state)  

  // Traigo los perros de la paginate
  const indexPostAnterior = currentPage * dogsPerPage;
  const indexPrimerPost = indexPostAnterior - dogsPerPage;
  const currentDogs = !dogs.searchDog ? dogs.allDogs?.slice(indexPrimerPost, indexPostAnterior) : 
  dogs.searchDog?.slice(indexPrimerPost, indexPostAnterior)

  



  const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
    <div>
        <h1>Perros</h1>
    <div className="perros">

       {
        !dogs.searchDog ? !dogs.allDogs ? <img src="https://i2.wp.com/revista.weepec.com/wp-content/uploads/2017/04/caminar.gif?zoom=1.5&resize=500%2C317&ssl=1" alt="Cargando" /> :  
        <>
        <div className="perros">
        {currentDogs?.map(p=> (
           <Dog 
           key={p.id}
           image={p.image}
           name= {p.name}
           temperament= {p.temperament}
           weight= {p.weight}
           id= {p.id}
           />
         )) }
          </div>        

         <div className="botonera">
           <button > ◀️ </button>
         <Pagination 
         dogsPerPage={dogsPerPage} 
         totalDogs={dogs.allDogs.length} 
         paginate= {paginate}/>
        <button> &gt; </button>
         </div>
         </>         
         : 
         dogs.searchDog.length === 0 ? <p>No se encontraron Resultados</p> :
          <>
          {currentDogs?.map(p=> (
           <Dog 
           key={p.id}
           image={p.image}
           name= {p.name}
           temperament= {p.temperament}
           weight= {p.weight}
           id= {p.id}
           /> ))}

      <Pagination 
      dogsPerPage={dogsPerPage} 
      totalDogs={dogs.searchDog.length}
      paginate= {paginate}/>
          
          </>
         
       }
    </div>

    </div>
  )
}
