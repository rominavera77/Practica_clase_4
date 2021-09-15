const Sequelize = require('sequelize');
//const { UPDATE } = require('sequelize/types/lib/query-types');

const sequelize = new Sequelize('libreria', 'root', '123', {
  host: 'localhost',
  dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Model = Sequelize.Model;
class Libreria extends Model{}
Libreria.init({
    producto: Sequelize.STRING,
    precio: Sequelize.INTEGER,
    stock: Sequelize.INTEGER
}, {sequelize, modelName: 'productos'});

/* crea producto*/
sequelize.sync()
    .then( () => Libreria.create({
            producto: 'cuaderno',
            precio: 150,
            stock: 100
        })
    )
    .then(producto =>{
        console.log(producto.toJSON());
    })
    .then( () => 
      Libreria.update({ precio: 170 }, {
        where: {
          producto: 'cuaderno'
        }
      }))
      .then(() => {
        console.log("Done");
      });
;