import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearSearch } from '../redux/actions/actions'
import { Link, useNavigate } from 'react-router-dom';
export default function Mensaje() {   

    const msj = useSelector(state => state.searchDog)
    const [datos, setDatos] = useState({})
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        renderStrategy(msj?.mensaje)
    },[msj])

    const btnOk = () => {
        dispatch(clearSearch());
        navigate('/dogs')
    }
    const newCreate = () => {
        dispatch(clearSearch());
        navigate('/dog')
    }

    const renderStrategy = (msj) => {
        if(msj === 'Required data missing') return setDatos(renderObj.dataMissing)
        if(msj === 'Breed happily created!!') return setDatos(renderObj.createOk)
        if(msj === 'The breed already exists... Look for it through our APP!!') return setDatos(renderObj.breedExist)

    }
    

    const renderObj = {
        dataMissing: {
            mensaje: msj?.mensaje,
            img: 'https://i.makeagif.com/media/7-31-2018/01nLwv.gif',            
            btn: 'Try again'
        },
        createOk: {
            mensaje: msj?.mensaje,
            img: 'https://c.tenor.com/UPYp0YKSOT4AAAAS/sonrisa-emocion.gif',
            btn: 'New Breed'
        },
        breedExist: {
            mensaje: msj?.mensaje,
            img: 'https://www.clarin.com/img/2022/01/14/el-perro-enojado-se-volvio___W0KHBml7U_1256x620__1.jpg',
            btn: 'Try again'
        }


    }



    return (
        <div>
            {!datos ? null : <>

                <dialog open>
                    <img src={datos.img} alt="imagen" />
                    <h2>{datos.mensaje}</h2>
                    <button onClick={btnOk}>Go Dogs</button>
                    <button onClick={newCreate}>{datos.btn}</button>
                </dialog>
            </>}




        </div>
    )
}
