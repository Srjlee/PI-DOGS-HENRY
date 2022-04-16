import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div>
        <h1>Bienvenidos!!</h1>
    
    <Link to="dogs">
        <button type="button">Click para Comenzar</button>
    </Link>

        
    </div>
  )
}
