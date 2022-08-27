import React, { useEffect, useState } from "react";
import {
  getTemperaments,
  clearAllDogs,
  filterTemperament,
  filterOrigin,
  orderAZ,
  clearSearch,
  orderWeightAsc,
  orderWeightDesc,
  orderZA,
  searchbar,
} from "../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Nav() {
  const [buscar, setBuscar] = useState({
    name: "",
  });

  const selects = "DEFAULT";
  const search = (e) => {
    setBuscar({ name: e.target.value });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTemperaments());
  }, []);
  const temps = useSelector((state) => state.temps);
  const dogs = useSelector((state) => state.allDogs);

  const filter = (e) => {
    dispatch(filterTemperament(e.target.value.toLowerCase()));
  };
  const query = (e) => {
    e.preventDefault();
    dispatch(searchbar(buscar.name));
    setBuscar({ name: "" });
  };
  const vertodos = () => dispatch(clearSearch());

  const orderRaza = (e) => {
    if (e.target.value === "asc") return dispatch(orderAZ());
    if (e.target.value === "des") return dispatch(orderZA());
    return;
  };
  const origin = (e) => {
    if (e.target.value === "all") return dispatch(clearSearch());
    return dispatch(filterOrigin(e.target.value));
  };

  const orderWeight = (e) => {
    if (e.target.value === "asc") return dispatch(orderWeightAsc());
    if (e.target.value === "des") return dispatch(orderWeightDesc());
    return;
  };
  return (
    <div className="navegacion">
      {!dogs?.length ? null : (
        <>
          <nav className="navbar">
            <Link to="/dogs">
              <div className="imgNavBar" onClick={vertodos}>
                <img src="./favicoDog.ico" alt="perritos" />
              </div>
            </Link>

            <div className="navDiv">
              <ul className="list-ul">
                <li className="list-li">
                  <select
                    onChange={origin}
                    defaultValue={"DEFAULT"}
                    className="select-control"
                  >
                    <option value="all">Show All</option>
                    <option value="api">Existing Breeds</option>
                    <option value="db">Breeds Created</option>
                  </select>
                </li>
                <li className="list-li">
                  <select
                    className="select-control"
                    onChange={filter}
                    value={selects}
                  >
                    <option value="DEFAULT">Filter of Temperament</option>
                    {temps?.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </li>
              </ul>
              <ul className="list-ul">
                <li className="list-li">
                  <select
                    className="select-control"
                    onChange={orderWeight}
                    defaultValue={selects}
                  >
                    <option value="DEFAULT">Order by weight</option>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendente</option>
                  </select>
                </li>
                <li className="list-li">
                  <select
                    className="select-control"
                    onChange={orderRaza}
                    value={selects}
                  >
                    <option value="DEFAULT">Order by Name</option>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendente</option>
                  </select>
                </li>
              </ul>
            </div>
            <div className="line2">
              <div>
                <form className="form-inline" onSubmit={query}>
                  <input
                    className="form-control"
                    placeholder="Buscar por raza"
                    onChange={search}
                    value={buscar.name}
                  ></input>
                  <button className="btn primary">Buscar</button>
                </form>
              </div>
              <div>
                <Link to="/dog">
                  <button
                    className="btn primary"
                    onClick={() => dispatch(clearAllDogs())}
                  >
                    Crear Nueva Raza
                  </button>
                </Link>
              </div>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
