import React, { useState } from 'react'

export default function DogCreate() {

    
    const [perro, setPerro] = useState({
        nombre: '',
        altura: '',
        peso: '',
        años_de_vida: '',
        imagen: '',
    })


  return (
    <div>
        <form action="">
          <label for="nombre">
            <input type="text" name="nombre" placeholder="Elige el nombre de tu raza"></input>

          </label>
            <input type="text" name="altura" placeholder="Pon tu rango de altura"></input>
            <input type="text" name="peso" placeholder="Pon el rango de peso"></input>
            <input type="text" name="años_de_vida" placeholder="Cual es el promedio de vida?"></input>
            <input type="file" name="imagen" placeholder="elige una foto de tu raza"></input>

            <button>Crear Perro</button>

        </form>
    </div>
  )
}
