import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clearAllDogs } from '../redux/actions/actions';
import { useDispatch } from 'react-redux';




export default function Landing() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAllDogs())
  }, [])

  return (
    <div>
      <div className="container" >


        <div className="bienvenida">
            <div className="datos">

              <h1>PI - Pablo Di Pietro</h1>

              <Link to="dogs">
                <button className='btn primary' type="button"  >Start</button>
              </Link>
            </div>

        </div>

      </div>


    </div>
  )
}
