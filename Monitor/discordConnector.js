const express = require('express');
const discord = express.Router();
const rp    = require('request-promise');


class DiscordConnector {
    constructor() {
        this._hookUrl = 'https://discord.com/api/webhooks/783469450652549191/qz3mamONhsdy9rwKmYgm0aJkNOiI8lkDmoc4EX4eHeN9IKYTXYsFLNSTHkvGs5Kpmnip';
    }

    get hookUrl() { return this._hookUrl; }
    set hookUrl(newHookUrl) { return this._hookUrl = newHookUrl; }

    postMessage(message) {
        const options = {
            uri: this.hookUrl,
            body:{content: message},
            json: true
            
        };
        rp.post(options)
        .then(res => {
            console.log("Respuesta de discord: ", res);
        })
        .catch(err => {
            console.error("Fallo el post a discord: ", err);
        });
    }
};

module.exports = DiscordConnector;