import React from "react";
import { Link } from "react-router-dom";
import { getDogDetail } from "../redux/actions/actions";
import { useDispatch } from "react-redux";
import "./Dog.css";

export default function Dog({ id, image, name, temperament, weight }) {
  return (
    <div className="perro" key={id}>
      <div className="perroImg">
        <img src={image} alt="aun no cargo" />
      </div>
      <div className="perroDatos">
        <div className="perroN">
          <Link to={`/dogs/${id}`}>
            <h4 className=""> {name} </h4>
          </Link>
        </div>
        <div className="perroT">
          <p className="">Temperament: {temperament}</p>
          <p className="">
            weight: {weight[0]} - {weight[1]}
          </p>
        </div>
      </div>
    </div>
  );
}
