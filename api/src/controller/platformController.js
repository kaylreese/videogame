require('dotenv').config();
const axios = require ('axios');
const { API_KEY } = process.env;
const { Platform } = require('../db.js');

const createPlatform = async (estado, names) => {
    if(estado === 2){
        for (let i = 0; i < names.length; i++) {
            const insert = await Platform.findOrCreate({ 
                where: {
                    name: names[i] 
                }
            });
        }
    }else{
        return await Platform.findOrCreate({ 
            where: { name: names }
        });
    }
}

const getAllPlatforms = async() => {
    // Buscamos en la API
    const platformsApi = await getPlatformsApi();
 
    const newPlatforms = await createPlatform(2, platformsApi);
 
    const platforms = await Platform.findAll();
 
    return platforms;
}

const getPlatformsApi = async () => {
    const platformsapi = (await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)).data;
    const platforms = platformsapi.results.map(e=> e.name);
    return platforms;
};

module.exports = { createPlatform, getAllPlatforms }