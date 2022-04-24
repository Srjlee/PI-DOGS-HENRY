export const  util = {
    validate: (dog, item) => {
        let errors = {}      
        if(item === "name") {
          if(!dog.name) {errors.name = "Name is required"
        } else {errors.name = ''}        
    }      
    if(item === 'image') {
        if(!dog.image) {errors.image = 'Image is required'
    } else {errors.image = ''}
    }
        if(item === "heightMin") {
            if(!dog.heightMin || isNaN(dog.heightMin))  {errors.heightMin = "must be a number and not be null"
        } else {errors.heightMin = ''}          
        
        }         
        
        if(item === "heightMax") {            
            if(!dog.heightMax || isNaN(dog.heightMax) || (+dog.heightMax < +dog.heightMin)) {errors.heightMax = "HeightMax must be greater than HeightMin and not be null"} else {
                errors.heightMax = ''
            }
        }
        if(item === "weightMin") {
            if(!dog.weightMin || isNaN(dog.weightMin))  {errors.weightMin = "must be a number and not be null"} else {
                errors.weightMin = ''}
            }         
        if(item === "weightMax") {            
          if(!dog.weightMin || isNaN(dog.weightMin) || (+dog.weightMax < +dog.weightMin)) {errors.weightMax = "WeightMax must be greater than WeightMin and not be null"} else {
              errors.weightMax = ''     
          }
        }
        if(item === "life_spanMin") {
            if(!dog.life_spanMin || isNaN(dog.life_spanMin)){ errors.life_spanMin = "must be a number and not be null"} else {
                errors.life_spanMin = ''}
            }    
        if(item === "life_spanMax") {
          if(+dog.life_spanMax < +dog.life_spanMin) {errors.life_spanMax = "LifeSpanMax must be greater than LifeSpanMin and not be null"} else {
              errors.life_spanMax =''

          }          
            
        }
        return errors;
      },

   

    
}