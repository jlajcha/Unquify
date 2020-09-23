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
                                console.log('Se guardo el estado de '+ JSON.stringify(artistAdder.name));
                        }
            },

            getArtistById: {
                exec: function(unqfy) {
                            const artist = unqfy.getArtistById(Number(functionParams[0]));
                            console.log(JSON.stringify(artist) );     
                        }
            },

            deleteArtist: {
                exec : function(unqfy){
                            const id = Number(functionParams[0]);
                            const deletedArtist = unqfy.deleteArtistWithId(id)                         
                            console.log('Se eliminó correctamente el artista con id '+ JSON.stringify(id));
                }
            },
             
            addAlbum: {
                exec : function(unqfy){
                            const idArtist = Number(functionParams[0]);
                            const data = {
                                name: functionParams[1],
                                year: functionParams[2],
                                 };

                                const albumAdder = unqfy.addAlbum(idArtist,data);
                                console.log('Se guardo correctamente el album '+ JSON.stringify(albumAdder.name));
                        }
                    
                    },
                    
            getAlbumById: {
                exec: function(unqfy) {
                            const album = unqfy.getAlbumById(Number(functionParams[0]));
                            console.log('El album ' + JSON.stringify(album) );     
                        }
            },

            addTrack: {
                exec : function(unqfy){
                            const albumId = functionParams[0]
                            const data = {
                                name: functionParams[1],
                                duration: functionParams[2],
                                genres: functionParams[3]
                                 };

                                const trackAdder = unqfy.addAlbum(albumId,data)
                                console.log('Se guardo correctamente la canción '+ JSON.stringify(trackAdder.name));
                        }
                    
                    },
            deleteTrack: {
                exec : function(unqfy){
                            const id = Number(functionParams[0]);
                            const deletedtrack = unqfy.deleteArtistWithId(id)                         
                            console.log('Se eliminó correctamente el artista con id '+ JSON.stringify(id));
                }


            }

        };

    }

}

module.exports= CommandHandler;

// agregar todos los mensajes de unqfy en stackOfCommands 
//falta validar la cantidad de args y q el comando exista
