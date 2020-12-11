const bodyParser = require('body-parser');
const express  = require('express');
const app = express();
const {
    common,
    other,
    errorHandler,
    BadRequestException,
} = require('../api/apiMethods')

const port = 8082; 

app.use((req, res,next) => {
    bodyParser.json()(req, res, err =>{
        if(err){
            err = new BadRequestException();
            errorHandler(err, req,res);
            return;
        }
        next();
    });
});
app.use('/api', common);
app.use('*', other);
app.use(errorHandler);
app.listen(port, () => {
    console.log("Server listen");
});

console.log("Servicio de logs corriendo en el puerto", port);