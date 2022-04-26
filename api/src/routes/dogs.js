require('dotenv').config();
const { json } = require('body-parser');
const { Router } = require('express');
const axios = require('axios')
const { Dog, Temperamento } = require('../db');
const { Op } = require("sequelize");

const {
    URL_API
} = process.env;

const router = Router();

function validarPeso(peso) {
    let [min, max] = peso.split("-");
    min = isNaN(min) ? "x" : parseInt(min);
    max = isNaN(max) ? "x" : parseInt(max);
    return [min, max];
  }

router.get('/', async (req, res) => {  // Back 1 y 2
    let { name } = req.query
    if (!name) {
        try {
            const perros = await axios(`${URL_API}`)
            const datosApi = perros.data.map(p => {
                let perro = {
                    id: p.id,
                    image: p.image.url,
                    name: p.name,
                    temperament: p.temperament,
                    weight: validarPeso(p.weight.metric)
                }
                return perro
            })
            const datosDB = (await Dog.findAll(            
            {
                include: {
                        model: Temperamento,
                        attributes: ["name"],
                        through: { attributes: [] },
                }
            }
            )).map(p=>{                 
                let pdb = {
                    id: p.id,
                    image: p.image,
                    name: p.name, 
                    weight: validarPeso(p.weight),
                    temperament: p.temperamentos.map(t=> t.name).join(', ')                    
                }
                return pdb                
            })
            const unidos = datosDB.concat(datosApi)
            res.json(unidos)

        } catch (error) {
            res.status(404).send(error)
        }
    } else {
        try {
            const perros = await axios(URL_API)
            const filtrados = perros.data.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))
            const final = filtrados.map(p => {
                let perro = {
                    id: p.id,
                    image: p.image.url,
                    name: p.name,
                    temperament: p.temperament,
                    weight: validarPeso(p.weight.metric)
                }
                return perro
            })
            
            const perrosDB = (await Dog.findAll({
                where:{name: {[Op.iLike]: `%${name}%`}},
                include: {
                    model: Temperamento,
                    attributes: ["name"],
                    through: { attributes: [] },
            }})).map(p=>{
                return {
                    id: p.id,
                    image: p.image,
                    name: p.name, 
                    weight: p.weight,
                    temperament: p.temperamentos.map(t=> t.name).toString()                    
                }
            })

            

            res.json(perrosDB.concat(final));
        } catch (error) {
            res.status(404).json([{name: 'No hay datos con ese nombre'}])
        }
    }
})

router.get('/:id', async (req, res) => {    ///  Hecha!
    let { id } = req.params
    if(id.length === 36) {
        try {
            let buscoPerro = await Dog.findOne({
                    attributes: ["name", "height", "weight", "life_span", "image"], 
                    where: {
                        id: id
                    },
                    include: {
                            model: Temperamento,
                            attributes: ["name" ],
                            through: { attributes: [] },
                    }
                })
                if(!buscoPerro) return res.status(404).send(`No existe un perro con el "${id}"`)
                let temps = buscoPerro.temperamentos.map(t=> t.name)

                buscoPerro1 = { 
                    id: buscoPerro.id,
                    name: buscoPerro.name,
                    weight: buscoPerro.weight,                    
                    height: buscoPerro.height,
                    life_span: buscoPerro.life_span,
                    image: buscoPerro.image,                                       
                    temperament: temps.toString()
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
                id: buscado.id,       
                image: buscado.image.url,
                name: buscado.name, 
                temperament: buscado.temperament,
                height: buscado.height.metric,
                weight: validarPeso(buscado.weight.metric),
                life_span: buscado.life_span,
                temperament: buscado.temperament
            }   
    
            return res.json(resp)
        } catch (error) {
            return res.status(404).send('hubo un error.')
        }
    }
})

module.exports = router;