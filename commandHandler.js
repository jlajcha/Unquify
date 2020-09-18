const {getUNQfy, saveUNQfy} = require('./persistenceUNQfy');
//const unqfy = require('./unqfy');
// const unqfy = require('./unqfy');

class CommandHandler{
    constructor(commandAndArgs){
        this.command = commandAndArgs[0];
        this.paramets = commandAndArgs.slice(1);
    }

    execute(){
        const unq = getUNQfy();
        this.stackOfCommands()[this.command].exec(unq);
        saveUNQfy(unq);
    }

    stackOfCommands(){
        const functionParams = this.paramets;
        return {
            addArtist: {
                exec : function(unqfy){
                            const data = {
                                name: functionParams[0],
                                country: functionParams[1],
                            };

                                const artistAdder = unqfy.addArtist(data);
                                //despues de las validaciones se puede devolver unicamente el nombre del artista
                                console.log('se guardo el estado de '+ JSON.stringify(artistAdder));
                        }
            },

            getArtistById: {
                exec: function(unqfy) {
                            const artist = unqfy.getArtistById(Number(functionParams[0]));
                            console.log(JSON.stringify(artist) );     
                        }
            }
        };

    }

}

module.exports= CommandHandler;

// agregar todos los mensajes de unqfy en stackOfCommands 
//falta validar la cantidad de args y q el comando exista
