require('dotenv').config();
const { json } = require('body-parser');
const { Router } = require('express');
const axios = require('axios')
const {dogs, Dog} = require('../db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    URL_API
  } = process.env;



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/dogs', async (req, res)=> {  // Back 1 y 2
    let {name} =req.query
    if(!name) {
        try {
            const perros = await axios(`${URL_API}`) 
            const datos = perros.data.map(p => {
                let perro = {
                    imagen: p.image.url,
                    nombre: p.name,
                    temperamento: p.temperament, 
                    peso: p.weight 
                } 
               return perro 
            })

         res.json(datos)
    
        } catch (error) {
            res.status(404).send('Algo salio mal, intenta en unos minutos')
        }        
    } else {
        try {
            const perros = await axios(`${URL_API}`)
            const filtrados = perros.data.filter(p=> p.name.toLowerCase().includes(name.toLowerCase()))
            const final = filtrados.map(p => {
                let perro = {
                    imagen: p.image.url,
                    nombre: p.name,
                    temperamento: p.temperament, 
                    peso: p.weight 
                } 
               return perro 
            })
            res.json(final)            
        } catch (error) {
            res.status(404).send('No hay datos con ese nombre')
        }
    }
    })

router.get('/dogs/:id', async(req, res) => {
        let {id} = req.params    
        try {
            let perros = await axios(URL_API) 
            let buscado= perros.data.find(p=> p.id = id)                
            
            res.json(buscado)
        } catch (error) {
            res.status(404).send('hubo un error.')
        }    
})

router.get('/temperament', async(req, res)=> {    
    try {        
        const perros = await axios(URL_API)
        const tempApi = perros.data.map((p)=> p.temperament ? p.temperament : '').map(s=>  s?.split(', ')).flat()
        const result = tempApi.reduce((acc,item)=>{
            if(!acc.includes(item) && item !== ''){
                acc.push(item);
            }
            return acc;
          },[])              
          res.json(result)

    } catch (error) {
        res.status(404).send(error)
    }

    

})

    




module.exports = router;
