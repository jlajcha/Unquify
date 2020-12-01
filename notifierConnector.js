let rp = require('request-promise');

class NotifyConnector {
  constructor() {
    this._BASE_URL = 'http://localhost:8083/api';
  }

  notifySubscribers(artistId, subject, message) {
    const options = {
      uri: this._BASE_URL + '/notify',
      body: {
        artistId: artistId,
        subject: subject,
        message: message
      },
      json: true
    };
    rp.post(options);
  }

}

module.exports = {
  NotifyConnector
};