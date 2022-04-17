import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clearAllDogs } from '../redux/actions/actions';
import {useDispatch } from 'react-redux';



export default function Landing() { 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAllDogs())
  }, [])
  
  return (
    <div>
        <h1>Bienvenidos!!</h1>
    
    <Link to="dogs">
        <button type="button"  >Click para Comenzar</button>
    </Link>

        
    </div>
  )
}
