const bodyParser = require('body-parser');
const express = require('express');
const app = express();


const {
    artists,
    tracks,
    playlists,    
    albums,
    users,
    errorHandler,
    noRoute,
    BadRequestException
} = require('./Api/apiUnqfy');

const port = process.env.Port || 8080;

app.use((req, res, next) => {
    bodyParser.json()(req, res, err => {
        if(err){
            const err = new BadRequestException();
            errorHandler(err, req, res);
            return;
        }
        next();
    });
});
app.use('/api', artists,tracks,playlists,albums,users);
app.use('*', noRoute);
app.use(errorHandler);

app.listen(port, () => {
    console.log("Server listen");
});

console.log("Servicio corriendo en el puerto", port);