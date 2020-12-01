const rp    = require('request-promise');

class UnqfyConnector{
    constructor(){
        this._BASE_URL = 'http://localhost:8080/api';
    }
    existArtist(artistId){
        const options = {
            uri: this._BASE_URL + '/artists/' + artistId,
            json: true
        };
        return rp.get(options);
    }
}

module.exports = {
    UnqfyConnector
  };