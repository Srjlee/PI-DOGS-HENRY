export const  util = {
    validate: (dog, item) => {
        let errors = {}      
        if(item === "name") {
          if(!dog.name) errors.name = "Name is required"
    }      
    if(item === 'image') {
        if(!dog.image) errors.image = 'Image is required'    
    }
        if(item === "heightMin") {
            if(!dog.heightMin || isNaN(dog.heightMin))  errors.heightMin = "must be a number and not be null"
        }         
        
        if(item === "heightMax") {            
            if(!dog.heightMax || isNaN(dog.heightMax) || (+dog.heightMax < +dog.heightMin)) errors.heightMax = "HeightMax must be greater than HeightMin and not be null"
            
        }
        if(item === "weightMin") {
            if(!dog.weightMin || isNaN(dog.weightMin))  errors.weightMin = "must be a number and not be null"
            }         
        if(item === "weightMax") {            
          if(!dog.weightMin || isNaN(dog.weightMin) || (+dog.weightMax < +dog.weightMin)) errors.weightMax = "WeightMax must be greater than WeightMin and not be null"
        }
        if(item === "life_spanMin") {
            if(!dog.life_spanMin || isNaN(dog.life_spanMin)) errors.life_spanMin = "must be a number and not be null"
            }    
        if(item === "life_spanMax") {
          if(+dog.life_spanMax < +dog.life_spanMin) errors.life_spanMax = "LifeSpanMax must be greater than LifeSpanMin and not be null"
        }
        return errors;
      },

   

    
}