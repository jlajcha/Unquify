const express = require('express');
const bodyParser    = require('body-parser');
const Service = require('./service');
const DiscordConnector = require('./discordConnector');
const discordConnector = new DiscordConnector()
const monitor = express.Router();
const rp    = require('request-promise');
//const monitor = require('axios');

const localhostURL = 'http://localhost';
const unqfyPort = '8080';
const newsletterPort = '8083';
//const loggingPort = '8083';

class Monitor {
    constructor() {
        this._isOnline = false;
        this._intervalId = null;
        this._services = [
            new Service(`${localhostURL}:${unqfyPort}/api`, "UNQfy"),
            new Service(`${localhostURL}:${newsletterPort}/api`, "Newsletter")
           // new Service(`${localhostURL}:${loggingPort}/api`, "Logging")
        ];
        this._discordConnector = discordConnector;
        this.turnOn();
    };

    get isOnline() { return this._isOnline; }
    get services() { return this._services; }
    get discordConnector() { return this._discordConnector; }

    checkServicesStatus() {
        const wentOnlineHandler = (service, currentTime) => {
            if (!service.isOnline) {
                service.isOnline = true;
                if (service.isFreshInstance) {
                    service.isFreshInstance = false;
                    return;
                }
            }
                const wentUpMsg = `[${currentTime}] El servicio ${service.name} ha vuelto a la normalidad`;
                console.log(wentUpMsg);
                this.discordConnector.postMessage(wentUpMsg);
            
        };
        
        const formatTime = date => `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;

        return this._services.map(service => {

            const options = {
                uri: service.url,
                json: true
            };
            rp.get(options)
            .then(res => {
                console.log('entro aca ' + res )
                const currentDatetime = new Date();
                const currentTime = formatTime(currentDatetime);
                wentOnlineHandler(service, currentTime);
            })
            .catch(err => {
                const currentDatetime = new Date();
                const currentTime = formatTime(currentDatetime);
                // if (service.isOnline) {
                //     const wentDownMsg = `[${currentTime}] El servicio ${service.name} ha dejado de funcionar`;
                //     console.log(wentDownMsg);
                //     this.discordConnector.postMessage(wentDownMsg);
                // }
                // //caso que este levantado el servicio pero de 400 por que la ruta no existe
                if (err.response!=undefined && err.response.status !== 500) {
                    wentOnlineHandler(service, currentTime);
                
                } else {
                    
                    if (( err.cause != undefined) && err.cause.code === "ECONNREFUSED") {
                        if (service.isOnline) {
                            service.isOnline = false;
                            const wentDownMsg = `[${currentTime}] El servicio ${service.name} ha dejado de funcionar`;
                            console.log(wentDownMsg);
                            this.discordConnector.postMessage(wentDownMsg);
                        }
                     else { const wentDownMsg = `[${currentTime}] El servicio ${service.name} ha dejado de funcionar`;
                            console.log(wentDownMsg);
                            this.discordConnector.postMessage(wentDownMsg);
                            //console.error(`Fallo de forma inesperada la api del servicio ${service.name}`);
                     }
                    }
                }
            });
            return service;
        });
    };

    turnOn() {
        if (!this._isOnline) {
            this._intervalId = setInterval(this.checkServicesStatus.bind(this), 10000);
            this._isOnline = true;
        }
    };
    
    turnOff() {
        if (this._isOnline) {
            clearInterval(this._intervalId);
            this._intervalId = null;
            this._isOnline = false;
        }
    };

    addService(service) {
        this._services.push(service);
    };
};

module.exports = new Monitor();