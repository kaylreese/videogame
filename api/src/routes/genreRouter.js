const { Router } =  require('express');

const { 
    createGenre, getAllGenres
} = require('../controller/genreController.js');

const genreRouter = Router();

const createGenreHandler = async (req, res) => {
    try {
        const { name } = req.body;
        const newGenre = await createGenre(1, name);
        console.log(newGenre);
        res.status(200).send(newGenre);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

const getGenreHandler = async (req, res) => {
    try {
        const genres = await getAllGenres();
        res.status(200).send(genres);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

genreRouter.get('/',getGenreHandler);
genreRouter.post('/',createGenreHandler);

module.exports = genreRouter;