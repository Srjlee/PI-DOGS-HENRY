require('dotenv').config();
const { json } = require('body-parser');
const { Router } = require('express');
const axios = require('axios')
const { dogs, Dog, Temperamento } = require('../db');
const { Op } = require("sequelize");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    URL_API, URL_NAME
} = process.env;



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/dogs', async (req, res) => {  // Back 1 y 2
    let { name } = req.query
    if (!name) {
        try {
            const perros = await axios(`${URL_API}`)
            const datosApi = perros.data.map(p => {
                let perro = {
                    imagen: p.image.url,
                    nombre: p.name,
                    temperamento: p.temperament,
                    peso: p.weight.metric
                }
                return perro
            })
            const datosDB = (await Dog.findAll(            
            {
                include: {
                        model: Temperamento,
                        attributes: ["nombre"],
                        through: { attributes: [] },
                }
            }
            )).map(p=>{ 
                let pdb = {
                    imagen: p.imagen,
                    nombre: p.nombre,                     
                    peso: p.peso,
                    temperamento: p.temperamentos.map(t=> t.nombre)                    
                }
                return pdb                
            })
            const unidos = datosDB.concat(datosApi)
            res.json(unidos)

        } catch (error) {
            res.status(404).send('Algo salio mal, intenta en unos minutos')
        }
    } else {
        try {
            const perros = await axios(URL_API)
            const filtrados = perros.data.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))
            const final = filtrados.map(p => {
                let perro = {
                    imagen: p.image.url,
                    nombre: p.name,
                    temperamento: p.temperament,
                    peso: p.weight.metric
                }
                return perro
            })
            res.json(final)
        } catch (error) {
            res.status(404).send('No hay datos con ese nombre')
        }
    }
})

router.get('/dogs/:id', async (req, res) => {    ///  Hecha!
    let { id } = req.params
    if(id.length === 36) {
        try {
            let buscoPerro = await Dog.findOne({
                    attributes: ["nombre", "altura", "peso", "años_de_vida", "imagen"], 
                    where: {
                        id: id
                    },
                    include: {
                            model: Temperamento,
                            attributes: ["nombre" ],
                            through: { attributes: [] },
                    }
                })
                if(!buscoPerro) return res.status(404).send(`No existe un perro con el "${id}"`)
                let temps = buscoPerro.temperamentos.map(t=> t.nombre)

                buscoPerro1 = { 
                    nombre: buscoPerro.nombre,
                    peso: buscoPerro.peso,                    
                    altura: buscoPerro.altura,
                    años_de_vida: buscoPerro.años_de_vida,
                    imagen: buscoPerro.imagen,                                       
                    temperamentos: temps.toString()
                }            
                
            res.json(buscoPerro1)

        } catch (error) {
            res.send(error)
        }

    } else {
        try {
            let perros = await axios(URL_API)
            let buscado = perros.data.find(p =>  p.id == id)
            if(!buscado) return res.status(201).send('No esta tu amigo en la lista!')
            let resp = {                
                imagen: buscado.image.url,
                nombre: buscado.name, 
                temperamento: buscado.temperament,
                altura: buscado.height.metric,
                peso: buscado.weight.metric,                
                años_de_vida: buscado.life_span,
                temperamento: buscado.temperament
            }
    
            return res.json(resp)
        } catch (error) {
            return res.status(404).send('hubo un error.')
        }
    }
})



router.get('/temperament', async (req, res) => { // hecha!!!
    try {
        const hayDatos = await Temperamento.findAll()
        if (!hayDatos.length) {
            const perros = await axios(URL_API)
            const tempApi = perros.data.map((p) => p.temperament ? p.temperament : '').map(s => s?.split(', ')).flat()
            const result = tempApi.reduce((acc, item) => {
                if (!acc.includes(item) && item !== '') {
                    acc.push(item);
                }
                return acc;
            }, [])
            let datos = result.map(c => {
                let dato = { nombre: c }
                return dato
            })
            await Temperamento.bulkCreate(datos)
        }
        return res.json(await Temperamento.findAll())
    } catch (error) {
        res.status(404).send(error)
    }
})

router.post('/dog', async(req, res)=>{ // hecha!!
    let {nombre, altura, peso, años_de_vida, imagen, temperamentos} = req.body
    if(!nombre || !altura || !peso) return res.status(404).send('Faltan datos necesarios')
    try {        
        const [nuevoPerro, created] = await Dog.findOrCreate( {
            where: {nombre: nombre},
            defaults: {
                nombre: nombre,
                altura: altura,
                peso: peso,
                años_de_vida: años_de_vida,
                imagen: imagen
            }
        })
        if(created) {
            await nuevoPerro.addTemperamentos(temperamentos)
            return res.send('Perro felizmente creado!')
        }             
        res.send('el perro ya existe culeado')        
    } catch (error) {
        res.status(404).send(error)        
    }
})


module.exports = router;
