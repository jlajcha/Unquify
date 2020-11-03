const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const {
    artists,
    albums,
    users
} = require('./Api/apiUnqfy');

const port = process.env.Port || 8080;

app.use(bodyParser.json());

app.use('/api', artists, albums, users);

const server = app.listen(port, () => {
    console.log("Server listen");
});

console.log("Servicio corriendo en el puerto", port);