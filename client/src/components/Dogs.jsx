import React, { useEffect, useState } from "react";
import Dog from "./Dog";
import Pagination from "./Pagination";
import { getAlldogs } from "../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

import "./Dogs.css";

export default function Dogs() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;
  const dogs = useSelector((state) => state);
  useEffect(() => {
    dispatch(getAlldogs());
  }, []);

  const indexPostAnterior = currentPage * dogsPerPage;
  const indexPrimerPost = indexPostAnterior - dogsPerPage;
  const currentDogs = !dogs.searchDog
    ? dogs.allDogs?.slice(indexPrimerPost, indexPostAnterior)
    : dogs.searchDog?.slice(indexPrimerPost, indexPostAnterior);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="containerDogs">
        {!dogs.searchDog ? (
          !dogs.allDogs ? (
            <>
              <div className="agrupador">
                <div className="notFind">
                  <div className="notFindImg">
                    <img
                      src="https://i2.wp.com/revista.weepec.com/wp-content/uploads/2017/04/caminar.gif?zoom=1.5&resize=500%2C317&ssl=1"
                      alt="Loading ..."
                    />
                  </div>
                  <div className="mensaje">
                    <h2>Loading ...</h2>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="agrupador">
                <div className="dogs">
                  {currentDogs?.map((p) => (
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
                    paginate={paginate}
                  />
                </div>
              </div>
            </>
          )
        ) : dogs.searchDog.length === 0 ? (
          <>
            <div className="agrupador">
              <div className="notFind">
                <div className="notFindImg">
                  <img
                    src="https://c.tenor.com/ZaAuxQ8MxMkAAAAC/dog-what-fuck-all.gif"
                    alt=""
                  />
                </div>
                <div className="mensaje">
                  <h2>The breed you were looking for was not found ...</h2>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="agrupador">
              <div className="dogs">
                {currentDogs?.map((p) => (
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
                  totalDogs={dogs.searchDog.length}
                  paginate={paginate}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
