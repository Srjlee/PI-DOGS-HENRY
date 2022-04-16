import React from 'react'

export default function Dog (props) {
    return (
        <div>

            <div className="card">
                <img src={props.imagen} alt="aun no cargo" />
                <div className="datos">
                    <p className="nombre">Raza: {props.nombre} </p>
                    <p className="temperamento">Temperamento: {props.temperamento}</p>
                    <p className="peso">Peso: {props.peso}</p>
                </div>
            </div>

        </div>
    )
}
