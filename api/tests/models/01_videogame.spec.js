const { Association } = require('sequelize');
const { Videogame, Genres, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({ 
          name: 'Super Mario Bros',
          rating: 5,
          platforms: ["PC", "Android"],
          genres: ["Acción", "Aventura"],
          image: "https://testimage.com",
          description: "Test description"
        });
      });
    });

    describe('Associations', () => {
      context('check associations', () => {
        // const OtherModel = 'some other model' // it doesn't matter what
        before(() => {
          Videogame.associate({ Genres })
        })
        it('defined a belongsTo association with Genres Model', () => {
          expect(Simple.belongsTo).to.have.been.calledWith(Genres)
        });
      });
    });
  });
});
