import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearSearch } from '../redux/actions/actions'
import {  useNavigate } from 'react-router-dom';

export default function Mensaje() {

    const msj = useSelector(state => state.searchDog)
    const [datos, setDatos] = useState({})

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        renderStrategy(msj?.mensaje)
    }, [msj])

    const btnOk = () => {
        dispatch(clearSearch());
        navigate('/dogs')
    }
    const newCreate = () => {
        dispatch(clearSearch());
        navigate('/dog')
    }

    const renderStrategy = (msj) => {
        if (msj === 'Required data missing') return setDatos(renderObj.dataMissing)
        if (msj === 'Breed happily created!!') return setDatos(renderObj.createOk)
        if (msj === `The breed already exists ... and it's angry. Find it through the search bar`) return setDatos(renderObj.breedExist)
    }
    const renderObj = {
        dataMissing: {
            mensaje: msj?.mensaje,
            img: 'https://i.makeagif.com/media/7-31-2018/01nLwv.gif',
            btn: 'Try again'
        },
        createOk: {
            mensaje: msj?.mensaje,
            img: 'https://t1.ea.ltmcdn.com/es/posts/1/3/2/como_hacer_feliz_a_tu_perro_24231_600.jpg',
            btn: 'New Breed'
        },
        breedExist: {
            mensaje: msj?.mensaje,
            img: 'https://www.clarin.com/img/2022/01/14/el-perro-enojado-se-volvio___W0KHBml7U_1256x620__1.jpg',
            btn: 'Try again'
        }


    }

    return (
        <div className="contain">
            <div className="cuadro">            
            {!datos ? null : <>

                <div className="mensaje">
                    <div className="msjImg">
                        <img src={datos.img} alt="img" />
                    </div>
                    <div className="msg">
                        <h2>{datos.mensaje} </h2>
                    </div>
                    <div className="botonesMsj">
                        <button className='btn primary' onClick={btnOk}>Go Dogs</button>
                        <button className='btn primary' onClick={newCreate}>{datos.btn}</button>
                    </div>
                </div>


                
            
            </>}

            </div>


        </div>
    )
}
