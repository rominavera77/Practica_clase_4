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
    .then( () => Libreria.create({
        producto: 'boligrafo',
        precio: 50,
        stock: 50
        })
    )
    .then( () => Libreria.create({
        producto: 'mapas n°3',
        precio: 10,
        stock: 1000
        })
    )
    .then(producto =>{
        console.log(producto.toJSON());
    })
    .then( () => actualizarPrecio(2)); 
    
;

const actualizarPrecio = (id) => (
    Libreria.update({ precio: 70}, {
        where: {
            id: id
        }
    }))
    .then(() => {
        console.log("Actualizado");
});

