import React from 'react'
import { Link } from 'react-router-dom'
import { getDogDetail } from '../redux/actions/actions';
import {useDispatch} from 'react-redux';
import './Dog.css'

export default function Dog ({id, image, name, temperament, weight}) {
    const dispatch = useDispatch()

    const pDetail = (e)=> {
        dispatch(getDogDetail(id))    
    }


    return (
        

            <div className="perro" key={id}>
                <img src={image} alt="aun no cargo" className="perroImg"/>
                <div className="perroDatos">
                    
                    <Link to={`/dogs/${id}`}>
                    <h4 className="perroN" onClick={pDetail}> {name} </h4>
                    </Link>
                    <p className="perroT">Temperamento: {temperament}</p>
                    <p className="perroP">Peso: {weight}</p>
                </div>
            </div>
            

        
    )
}
