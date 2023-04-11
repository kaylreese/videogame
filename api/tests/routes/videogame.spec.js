/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const request = require('supertest');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  description: 'Mario Bros fue un juego favorito de muchas personas.',
  image: 'https://wallpapers.com/images/featured/assassins-creed-valhalla-tiswxpekr3su98uv.jpg',
  rating: 4
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/videogames').expect(200)
    );
  });
});

describe('GET /videogames', () => {
  test('should respond with a 200 status code', async() => {
    const response = await app.request(app).get('/videogames').send();
    console.log(response);
  })
});
