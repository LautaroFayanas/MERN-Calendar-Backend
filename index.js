
//Importando express
const express = require('express');  
const { dbConnection } = require('./database/config');

const cors = require('cors');

require('dotenv').config();


console.log(process.env);

//Crear el servidor de express
const app = express();

//BASE DE DATOS
dbConnection()

//CORS
app.use(cors());

//Directorio publico ( Es lo que le quiero mostrar al usuario )
//El use es como un meddlewere.
app.use( express.static('public'))

//Lectura y parseo del body
app.use( express.json() );

//Rutas
//Cuando alguien solicite esta ruta, esto es lo que quiero responder.
app.use('/api/auth',  require('./routes/auth'))
app.use('/api/events',  require('./routes/events'))

//Escuchando petisiones de express. Primer argumento es el puerto, este debe ser distinto al de mi app front.
app.listen( process.env.PORT , () => {
    console.log(`Servidor corriendo en puerto ${3001} `);
});