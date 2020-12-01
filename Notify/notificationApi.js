const express = require('express');
const bodyParser    = require('body-parser');
const { UnqfyConnector } = require('./unquifyConnector');
const { NoFindArtistException } = require('../exceptions');
const unqfyConnector   = new UnqfyConnector();
const notifications = express.Router();
const app  = express();
const { getNotify, saveNotify } = require('./persistenceNotifier.js');
let notifier   = getNotify();
const sendMail      = require('./sendMail.js');


//subscribirse a las notificaciones
notifications.route('/subscribe')
.post((req, res,next) => {
    const data = req.body;
        if(data.artistId === undefined || data.email==undefined){
            const err = new BadRequestException();
            errorHandler(err, req, res);
            return;
        }           
        unqfyConnector.existArtist(data.artistId)
        .then(result => {
            notifier.subscribe(data.artistId, data.email);
            saveNotify(notifier);
            notifier = getNotify();
            res.status(200);
            res.send({
                Body: ""
            })
        })
        .catch(err => (
            next(new NoFindArtistException()))
        );

});

notifications.route('/notify')
.post((req, res, next) => {
    const data = req.body;
    if (data.artistId === undefined || data.subject === undefined || data.message === undefined){
        next(new BadRequestException());
        return;
    }
    unqfyConnector.existArtist(data.artistId)
    .then(result => {
        let emails = notifier.subscribers.map(subs => { 
            if (subs.artistId === data.artistId) {
                return subs.email;
            }
        })
        try {        
            emails.forEach(email => {
                
                sendMail.sendMessage(email, data.subject, data.message);});
            res.status(200);
            res.send({
                Body: ""
            })
        } catch(err){
            next(new NotificationFailureException());
        }
    })
    .catch(err => (
        next(new NoFindArtistException()))
    );
})




const port = 8083;  // set our port

app.use((req, res, next) => {
    bodyParser.json()(req, res, err => {
        if (err) {
            err = new BadRequestException();
            errorHandler(err, req, res);
            return;
        }
        next();
    });
});
app.use('/api', notifications);
app.use(errorHandler);
const server = app.listen(port, () => {
    console.log("Server running");
});


function errorHandler(err, req, res, next) {

    if (err.type === 'entity.parse.failed'){
        res.status(err.status);
        res.json({status: err.status, errorCode: 'INVALID_JSON'});
    }else if (
        err instanceof NoFindArtistException){
                res.status(404);
                res.json({
                    status: 404,
                    errorCode: "RESOURCE_NOT_FOUND"});
    } else {
        res.status(500);
        res.json({status: 500, errorCode: 'INTERNAL_SERVER_ERROR'});
    }
}
 