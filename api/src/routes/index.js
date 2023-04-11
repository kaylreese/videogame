const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogameRouter = require('./videogameRouter');
const genreRouter = require('./genreRouter');
const platformRouter = require('./platformsRouter');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogameRouter);
router.use('/genres', genreRouter);
router.use('/platforms', platformRouter);

module.exports = router;
