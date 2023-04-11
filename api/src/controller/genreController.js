require('dotenv').config();
const axios = require ('axios');
const { API_KEY } = process.env;
const { Genre } = require('../db.js');

const createGenre = async (estado, names) => {
    if(estado === 2){
       for (let i = 0; i < names.length; i++) {
          const insert = await Genre.findOrCreate({ 
             where: {
                name: names[i] 
             }
          });
       }
    }else{
       return await Genre.findOrCreate({ 
          where: { name: names }
       });
    }
}

const getAllGenres = async() => {
    // Buscamos en la API
    const genresApi = await getGenresApi();
 
    const newGenres = await createGenre(2, genresApi);
 
    const genres = await Genre.findAll();
 
    return genres;
}

const getGenresApi = async () => {
    const typesapi = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data;
    const types = typesapi.results.map(e=> e.name);
    return types;
 };

module.exports = { createGenre, getAllGenres }