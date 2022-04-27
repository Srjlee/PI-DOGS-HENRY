export const  util = {
    validate: (dog, item) => {
        let errors = {}      
        if(item === "name") {
          if(!dog.name) errors.name = "Name is required"
    }      
    // if(item === 'image') {
    //     if(!dog.image) errors.image = 'Image is required'    
    // }
        if(item === "heightMin") {
            if(!dog.heightMin || isNaN(dog.heightMin) || dog.heightMin < 1)  errors.heightMin = "Must be a number and not be null"
        }         
        
        if(item === "heightMax") {            
            if(!dog.heightMax || isNaN(dog.heightMax) || (+dog.heightMax < +dog.heightMin) || dog.heightMax < 1) errors.heightMax = "HeightMax must be greater than HeightMin"
            
        }
        if(item === "weightMin") {
            if(dog.weightMin < 1 || !dog.weightMin || isNaN(dog.weightMin))  errors.weightMin = "Must be a number and not be null"
            }         
        if(item === "weightMax") {            
          if(!dog.weightMax || dog.weightMax < 1 || isNaN(dog.weightMax) || (+dog.weightMax < +dog.weightMin)) errors.weightMax = "WeightMax must be greater than WeightMin"
        }
        if(item === "life_spanMin") {
            if(!dog.life_spanMin || isNaN(dog.life_spanMin) || dog.life_spanMin < 1) errors.life_spanMin = "must be a number and not be null"
            }    
        if(item === "life_spanMax") {
          if(+dog.life_spanMax < +dog.life_spanMin || dog.life_spanMax < 1) errors.life_spanMax = "LifeSpanMax must be greater than LifeSpanMin and not be null"
        }
        return errors;
      }

    
}