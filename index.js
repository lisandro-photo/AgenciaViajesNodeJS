import express from 'express';// const express = require('express'); Es lo mismo que está escrito abajo sólo que esta es la versión de comon js
import router from './routes/index.js';
import db from './config/db.js';



const app = express();


// Conectar la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada') )
    .catch( error => console.log(error) )
    

// Definir puerto. El process.env.PORT busca el puerto que se nos asignará en el servidor, ó el puerto 4000.
const port = process.env.PORT || 4000;

// habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    return next();
});

// Agregar Body Parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Agregar la carpeta pública
app.use(express.static('public'));

// Agregar Router
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port} `)
} )

