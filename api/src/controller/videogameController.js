require('dotenv').config();
const { Op } = require('sequelize');
const axios = require ('axios');
const { API_KEY } = process.env;
const { Videogame, Genre, Platform } = require('../db.js');

const createVideogame = async (name, description, platforms, image, rating, genres) => {
    const videogame = await Videogame.create({ name, description, image, rating });

    for(let i=0; i < genres.length; i++) {
        const [datos, estado] = await Genre.findOrCreate({
            where: {
                name: genres[i]
            }
        });
        const result = await videogame.addGenre(datos.id, {through: { selfGranted: false }});
    }
  
    for(let j=0; j < platforms.length; j++) {
        const [datos1, estado1] = await Platform.findOrCreate({
            where: {
                name: platforms[j]
            }
        });
        const result = await videogame.addPlatform(datos1.id, {through: { selfGranted: false }});
    }

    return videogame;
}

const getVideogameById = async (source, id) => {
    const videogame = 
        source === "api" 
            ? await getVideogameApi(id)
            : await Videogame.findByPk(id, {
                include: [ Platform, Genre ]
            });

    return videogame;
}

const getAllVideogames = async() => {
    // Buscamos en la DB
    const videogamesDB = await getVideogamesDB();

    // Buscamos en la API
    const videogamesApi = await getVideogamesApi();
    
    // Unificamos
    const results = [...videogamesDB, ...videogamesApi];

    return results;
}

const buscarNameVideogame = async (name) => {
    console.log(name);
    const videogamesDB = await Videogame.findAll({
        include: [ Genre, Platform ],
        where: { 
            name: { [Op.iLike]: `%${name}%`} 
        }
    });
    console.log(videogamesDB);
    const videogamesApi = await getVideogamesApi();
    
    // Filtro pokemonsApi
    const filterApi = videogamesApi.filter(videogame => {
        return videogame.name.toLowerCase().includes(name.toLowerCase());
    });
    
    // Unificamos
    const results = [...videogamesDB, ...filterApi];
    console.log("Filtro: ",results);
    return results;
}

const buscarGenreVideogame = async (genre) => {
    const videogamesDB = await getVideogamesDB();
    const videogamesApi = await getVideogamesApi();

    const allVideogames = [...videogamesDB, ...videogamesApi];
    
    // Filtro videogamesApi
    const filterApi = allVideogames.filter(elem => elem.genres.some((e) => e.name.toLowerCase() === genre.toLowerCase()));
    console.log(filterApi);

    return filterApi;
}

// const getVideogamesApi = async () => {
//     return await axios.get(`https://api.rawg.io/api/games?page_size=50&key=${API_KEY}`)
//         .then((res) => {
//             return Promise.all(
//                 res.data.results.map((videogame) => {
//                     return {
//                         id: Number(videogame.id),
//                         name: videogame.name,
//                         description: videogame.slug,
//                         platforms: videogame.platforms.map((platform) => {
//                             return { name: platform.platform.name };
//                         }),
//                         image: videogame.background_image,
//                         rating: videogame.rating,
//                         genres: videogame.genres.map((genre) => {
//                             return { name: genre.name };
//                         })
//                         // created: false,
//                     };
//                 })
//             );
//         });
// };

const getVideogamesApi = async () => {
    let allVideogames = [];
    let link = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);

    for (let i = 1; i <= 5; i++) {
        i > 1 ? link = await axios.get(link.data.next) : '';

        let videogames = link.data.results.map((videogame) => {
            return {
                id: Number(videogame.id),
                name: videogame.name,
                description: videogame.slug,
                platforms: videogame.platforms.map((platform) => {
                    return { name: platform.platform.name };
                }),
                image: videogame.background_image,
                rating: videogame.rating,
                genres: videogame.genres.map((genre) => {
                    return { name: genre.name };
                })
            };
        })
        allVideogames = await allVideogames.concat(videogames);
    }
    return Promise.all(allVideogames);
};

const getVideogameApi = async (id) => {
    return await axios.get(`https://api.rawg.io/api/games/${id}?&key=${API_KEY}`)   // El Axios viene en data
        .then((res) => {
            return {
                id: Number(res.data.id),
                name: res.data.name,
                description: res.data.description,
                platforms: res.data.platforms.map((platform) => {
                    return { name: platform.platform.name };
                }),
                image: res.data.background_image,
                rating: res.data.rating,
                released: res.data.released,
                genres: res.data.genres.map((genre) => {
                    return { name: genre.name };
                })
            };
        });
};

const getVideogamesDB = async() => {
    const videogameDB = await Videogame.findAll({
        include: [ Genre, Platform ]
    });

    return videogameDB.map((videogame) => {
        return {
            id: videogame.id,
            name: videogame.name,
            description: videogame.description,
            platforms: videogame.platforms.map((platform) => {
                return { name: platform.name };
            }),
            image: videogame.image,
            released: videogame.released,
            rating: videogame.rating,
            genres: videogame.genres.map((genre) => {
                return { name: genre.name };
            }),
            createDB: videogame.createDB
        }
    });
}

module.exports = { createVideogame, getAllVideogames, getVideogameById, buscarNameVideogame, buscarGenreVideogame }