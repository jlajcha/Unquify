const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const {
    artists
} = require('./apiUnqfy');

const port = 8080;

app.use(bodyParser.json());

app.use('/api', artists);

const server = app.listen(port, () => {
    console.log("Server listen");
});

console.log("Servicio corriendo en el puerto", port)