import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function DogCreate() {
   const temps = useSelector(state => state.temps)
    const [dog, setDog] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        life_spanMin: '',
        life_spanMax: '',
        temperament: []
    })

    const handleInputChange = (e)=> {
      e.preventDefault();
      if((e.target.name === "temperamento")) {
        let temper  = temps.find(t=> t.id == e.target.value)
        if(!dog.temperament.includes(temper)) setDog({...dog, temperament: [...dog.temperament, temper]});
      } else {
        setDog({...dog, [e.target.name] : e.target.value});
      }
    }
    const quitar = (e) => {
      e.preventDefault()
      setDog({...dog, temperament:dog.temperament.filter(d=>parseInt(d.id) !== parseInt(e.target.value))})
    }  

    const validate = (dog) => {
      let errors = {}
      if(!dog.name)  errors.name = "Name is required"
      if(dog.heightMax < dog.heightMin) error.heightMax = "HeightMax must be greater than HeightMin"
      if(dog.weightMax < dog.weightMin) error.weightMin = "WeightMax must be greater than WeightMin"
      if(life_spanMax < dog.lifeSpanMin) error.life_Span = "LifeSpanMax must be greater than LifeSpanMin"      
    }

    const handleSubmit = (e) => {
      e.preventDefault()
    }

  return (
    <div>
        <form  onSubmit={handleSubmit}>
        <div className="datos">
        <label htmlFor="name">Name: </label>
        <input
        type="text"
        name="name"
        value={dog.name}
        onChange={handleInputChange}        
        placeholder="Name of New Breed"
        />
        <br />
        <label htmlFor="height">Height: </label>
        <input
        type="number"
        name="heightMin"
        value={dog.heightMin} 
        onChange={handleInputChange}
        placeholder="Minimum Height"
        />        <p> - </p>
        <input
        type="number"
        name="heightMax"
        value={dog.heightMax} 
        onChange={handleInputChange}
        placeholder="Maximun Height"
        />

        <br />
        <label htmlFor="weight">Weight: </label>
        <input
        type="text"
        name="weightMin"
        value={dog.weightMin} 
        onChange={handleInputChange}
        placeholder="Minimum Weight"
        />
        <p> - </p>        
        <input
        type="text"
        name="weightMax"
        value={dog.weightMax} 
        onChange={handleInputChange}
        placeholder="Maximun Weight"
        />
        <br />
        <label htmlFor="life_span">Life Span: </label>
        <input
        type="text"
        name="life_spanMin"
        value={dog.life_spanMin} 
        onChange={handleInputChange}
        placeholder="Minimun Life Span"
        />
        <p> - </p>        
        <input
        type="text"
        name="life_spanMax"
        value={dog.life_spanMax} 
        onChange={handleInputChange}
        placeholder="Maximun Life Span"
        />
        <br />
          <select multiple name="temperamento" onChange={handleInputChange} className="">
          
          {temps.map(t => (
           <option key={t.id} value={t.id} >{t.name}</option> 
          ) )}
          </select>
        </div> 
        <div className="temperamentos">
          {dog.temperament.map(btn=> (           
            <div key={btn.id} className="">
              <button type="button" onClick={quitar} value={btn.id} className="onClose">{btn.name}</button>               
            </div>
          ))}
        </div>
        <br />
        <br />
        <button type="submit" >Create Breed</button>


        </form>
    </div>
  )
}
