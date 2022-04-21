const { json } = require('body-parser');
const { Router } = require('express');
const { Dog } = require('../db');

const router = Router();
router.post('/', async(req, res)=>{ // hecha!!
    let {name, height, weight, life_span, image, temperamentos} = req.body
    if(!name || !height || !weight) return res.status(404).send('Faltan datos necesarios')
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
            await nuevoPerro.addTemperamentos(temperamentos)
            return res.send('Perro felizmente creado!')
        }             
        res.send('la raza ya existe. Por favor piensa una nueva ...')        
    } catch (error) {
        res.status(404).send(error)        
    }
})

module.exports = router;