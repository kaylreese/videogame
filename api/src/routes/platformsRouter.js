const { Router } =  require('express');

const { 
    createPlatform, getAllPlatforms
} = require('../controller/platformController.js');

const platformRouter = Router();

const createPlatformHandler = async (req, res) => {
    try {
        const { name } = req.body;
        const newPlatform = await createPlatform(1, name);
        console.log(newPlatform);
        res.status(200).send(newPlatform);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

const getPlatformHandler = async (req, res) => {
    try {
        const platforms = await getAllPlatforms();
        res.status(200).send(platforms);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

platformRouter.get('/',getPlatformHandler);
platformRouter.post('/',createPlatformHandler);

module.exports = platformRouter;