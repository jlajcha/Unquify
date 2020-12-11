const loggingConnector = require('./loggingConnector');
const {LoggingConnector} = require('./loggingConnector');
const logging = new LoggingConnector();

class LoggingObserver{
    constructor(){}
    updateState(json){
        const message = json.accion+' en UNQfy - Codigo: '+json.entityId+' Nombre: '+json.entityName;
        logging.logEventPost(message,json.level)
    }
}

module.exports = {
    LoggingObserver
}