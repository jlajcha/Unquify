const {getUNQfy, saveUNQfy} = require('../persistenceUNQfy');
const express = require('express');
const notifications     = express.Router();

//subscribirse a las notificaciones
notifications.route('/subscribe')
.post((req, res) => {
    const unqfy = getUNQfy();
    const data = req.body;
        if(data.name === undefined || data.email==undefined){
            const err = new BadRequestException();
            errorHandler(err, req, res);
            return;
        }           
    //resolver como consultar que exista el artista sino que falle

    const subscriberRes = notifier.addSubscriber(data.name,data.email);
    saveNotify(notify);
    res.status(201);
    res.json(subscriberRes.toJSON());
});
