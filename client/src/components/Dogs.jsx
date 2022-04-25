import React, { useEffect, useState } from 'react';
import Dog from './Dog';
import Pagination from './Pagination';
import { getAlldogs } from '../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import './Dogs.css'

export default function Dogs() {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;
  useEffect(() => {
    dispatch(getAlldogs())
  }, [])
  const dogs = useSelector(state => state)

  // Traigo los perros de la paginate
  const indexPostAnterior = currentPage * dogsPerPage;
  const indexPrimerPost = indexPostAnterior - dogsPerPage;
  const currentDogs = !dogs.searchDog ? dogs.allDogs?.slice(indexPrimerPost, indexPostAnterior) :
    dogs.searchDog?.slice(indexPrimerPost, indexPostAnterior)





  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div>
      <div className="perros">

        {
          !dogs.searchDog ? !dogs.allDogs ? <img src="https://i2.wp.com/revista.weepec.com/wp-content/uploads/2017/04/caminar.gif?zoom=1.5&resize=500%2C317&ssl=1" alt="Cargando" /> :
            <>
            <div className="container">
              <div className="dogs">
                {currentDogs?.map(p => (
                  <Dog
                    key={p.id}
                    image={p.image}
                    name={p.name}
                    temperament={p.temperament}
                    weight={p.weight}
                    id={p.id}
                  />
                ))}
              </div>

              <div className="botonera">

                <Pagination
                  dogsPerPage={dogsPerPage}
                  totalDogs={dogs.allDogs.length}
                  paginate={paginate} />
                
              </div>
            </div>
            </>
            :
            dogs.searchDog.length === 0 ?<>
            <div className="container">
              <div className="notFind">
                <div className="notFindImg">
                  <img src="https://c.tenor.com/ZaAuxQ8MxMkAAAAC/dog-what-fuck-all.gif" alt="" />
                </div>
                <h2>The breed you were looking for was not found ...</h2>
              </div>

            </div>
            
            </>  :
              <>
              <div className="container">
              <div className="dogs">
                {currentDogs?.map(p => (
                  <Dog
                    key={p.id}
                    image={p.image}
                    name={p.name}
                    temperament={p.temperament}
                    weight={p.weight}
                    id={p.id}
                  />))}
                  </div>
        <div className="botonera">
                <Pagination
                  dogsPerPage={dogsPerPage}
                  totalDogs={dogs.searchDog.length}
                  paginate={paginate} />
            </div>
            </div>
              </>

        }
      </div>

    </div>
  )
}
