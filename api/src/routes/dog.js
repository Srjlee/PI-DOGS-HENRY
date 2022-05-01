const { Router } = require('express');
const { Dog, Temperamento} = require('../db');
const router = Router();


router.post('/', async(req, res)=>{ // hecha!!
    let {name, height, weight, life_span, image, temperamentos} = req.body
    if(!name || !height || !weight) return res.status(404).send({mensaje: 'Required data missing'})
    try {        
        const [nuevoPerro, created] = await Dog.findOrCreate( {
            where: {name: name},
            defaults: {
                name: name,
                height: height,
                weight: weight,
                life_span: life_span,
                image: image
            }
        })
        if(created) {            
            const temps = await Temperamento.findAll({
                where: {
                    id: temperamentos
                }
            })            
            await nuevoPerro.addTemperamentos(temps)
            return res.send({mensaje: 'Breed happily created!!'})
        }             
        res.send({mensaje: `The breed already exists ... and it's angry. Find it through the search bar`})        
    } catch (error) {
        console.log(error)
        res.status(404).send(error)        
    }
})

module.exports = router;