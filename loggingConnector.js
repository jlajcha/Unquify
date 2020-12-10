let rp = require('request-promise');

class LoggingConnector {
    constructor(){
        this._BASE_URL = 'http://localhost:8082/api';
    }

    logEventPost(message, level){
        const options = {
            uri: this._BASE_URL + '/logging',
            body: {
                message: message,
                level: level
            },
            json: true
        };
        rp.post(options)
    }
}

module.exports = {
    LoggingConnector
};