import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDog } from '../redux/actions/actions';
import {util} from './util'

export default function DogCreate() {
   const temps = useSelector(state => state.temps)
   const [errors, setErrors] = useState({})
   const [dog, setDog] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        life_spanMin: '',
        image: '',
        life_spanMax: '',
        temperament: [],
        
    })
    
    const dispatch = useDispatch()  
    

    const handleInputChange = (e)=> {
      e.preventDefault();
      let item = e.target.name
      if(item === "temperamento") {
        let temper  = temps.find(t=> t.id == e.target.value)
        if(!dog.temperament.includes(temper)) setDog({...dog, temperament: [...dog.temperament, temper]});
      } else {
        setErrors({...errors, ...util.validate({...dog, [e.target.name] : e.target.value}, item)
      })
        
        setDog({...dog, [e.target.name] : e.target.value});
      }
    }
    const quitar = (e) => {
      e.preventDefault()
      setDog({...dog, temperament:dog.temperament.filter(d=>parseInt(d.id) !== parseInt(e.target.value))})
    }     

    const handleSubmit = (e) => {      
      e.preventDefault();
      dispatch(createDog(dog));
      setDog({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        life_spanMin: '',
        life_spanMax: '',
        temperament: []
      })
      
    }

  return (
    <div>
        <form  onSubmit={util.handleSubmit}>
        <div className="datos">

        <label htmlFor="name">Name: </label>
        <input
        type="text"
        name="name"
        value={dog.name}
        onChange={handleInputChange}        
        placeholder="Name of New Breed"
        />
        {errors.name === '' ? null : <p>{errors.name}</p>}

        <br />

        <label htmlFor="image">Image: </label>
        <input 
        type='text'
        name='image'
        value={dog.image}
        onChange={handleInputChange}
        placeholder="Select one image for the breed"/>
        {errors.image === '' ? null : <p>{errors.image}</p>}
        
        <br />
      <div className="heightMin-Max">

        <label htmlFor="height">Height: </label>
        <input
        type="number"
        name="heightMin"
        value={dog.heightMin} 
        onChange={handleInputChange}
        placeholder="Minimum"
        /> 

        <input
        type="number"
        name="heightMax"
        value={dog.heightMax} 
        onChange={handleInputChange}
        placeholder="Maximun"
        />
      </div>
      {errors.heightMin === '' ? null : <p>{errors.heightMin} </p>}
      {errors.heightMax === '' ? null : <p>{errors.heightMax}</p>}
      
        <br />
        <div className="weightMinMax">

        <label htmlFor="weight">Weight: </label>
        <input
        type="text"
        name="weightMin"
        value={dog.weightMin} 
        onChange={handleInputChange}
        placeholder="Minimum"
        />        
        <input
        type="text"
        name="weightMax"
        value={dog.weightMax} 
        onChange={handleInputChange}
        placeholder="Maximun"
        />
        </div>
        {errors.weightMin === '' ? null : <p>{errors.weightMin}</p>}
        {errors.weightMax === '' ? null : <p>{errors.weightMax}</p>}
        <br />
        
        <div className="life_spanMinMax">

        <label htmlFor="life_span">Life Span: </label>
        <input
        type="text"
        name="life_spanMin"
        value={dog.life_spanMin} 
        onChange={handleInputChange}
        placeholder="Minimun Life Span"
        />       
        
        <input
        type="text"
        name="life_spanMax"
        value={dog.life_spanMax} 
        onChange={handleInputChange}
        placeholder="Maximun Life Span"
        />
        </div>
        {errors.life_spanMin === '' ? null : <p>{errors.life_spanMin}</p>}
        {errors.life_spanMax === '' ? null : <p>{errors.life_spanMax}</p>}
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
        <button type="submit">Create Breed</button>


        </form>
    </div>
  )
}
