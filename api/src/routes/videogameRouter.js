const { Router} = require('express');

const {
    getAllVideogames, 
    createVideogame, 
    getVideogameById, 
    buscarNameVideogame,
    buscarGenreVideogame
} = require('../controller/videogameController.js');

const videogameRouter = Router();

const getVideogamesHandler = async(req, res) => {
    
    const { name, genre } = req.query;

    if(name || genre) {
        let resultado = name ? await buscarNameVideogame(name) : await buscarGenreVideogame(genre);
        res.status(200).send(resultado);
    } else {
        const resultado = await getAllVideogames();
        res.status(200).send(resultado);
    }
}

const getVideogameHandler = async (req, res) => {
    const { id } = req.params;

    const source = isNaN(id) ? "db" : "api";    // es un ternario
    
    try {
        const videogame = await getVideogameById(source, id);
        res.status(200).send(videogame);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

const createVideogameHandler = async(req, res) => {
    // console.log(req.body);
    try {
        const { name, description, platforms, image, rating, genres } = req.body;
        const newVideogame = await createVideogame(name, description, platforms, image, rating, genres);

        res.status(200).send("Videogame Creado Correctamente");
    } catch (error) {
        res.status(404).send(error.message);
    }
}

videogameRouter.get('/', getVideogamesHandler);
videogameRouter.get('/:id', getVideogameHandler);
videogameRouter.post('/', createVideogameHandler);

module.exports = videogameRouter