const {getUNQfy, saveUNQfy} = require('./persistenceUNQfy');
//const unqfy = require('./unqfy');
// const unqfy = require('./unqfy');
const Printer = require('./printer.js');
const MissingArguments = require('./exceptions.js')

class CommandHandler{
    constructor(commandAndArgs){
        this.command = commandAndArgs[0];
        this.paramets = commandAndArgs.slice(1);
        this._printer = new Printer();
    }

    execute(){
        try{
            this.insufficientArguments(this.stackOfCommands()[this.command].paramsRequired)
            const unq = getUNQfy();
            this.stackOfCommands()[this.command].exec(unq);
            saveUNQfy(unq);
        }catch(exception){
            this._printer.printException(exception);
        }
        
    }

    stackOfCommands(){
        const functionParams = this.paramets;
        const printer = this._printer;
        return {
            addArtist: {
                exec : function(unqfy){
                            const data = {
                                name: functionParams[0],
                                country: functionParams[1],
                            };
                            try{
                                const artistAdder = unqfy.addArtist(data);
                                printer.printMessage(`Se agrego el nuevo artista con nombre ${artistAdder.name}`);
                            }catch (exception){
                                printer.printException(exception);
                            }
                        },
                paramsRequired: 2
            },

            getArtistById: {
                exec: function(unqfy) {
                            try{
                                const artist = unqfy.getArtistById(Number(functionParams[0]));
                                printer.printEntity(`Artista con id ${functionParams[0]}`, artist)
                            }catch (exception){
                                printer.printException(exception);
                            }                           
                        },
                paramsRequired: 1
            },

            deleteArtist: {
                exec : function(unqfy){
                            const id = Number(functionParams[0]);
                            const deletedArtist = unqfy.deleteArtistWithId(id)                         
                            printer.printMessage(`Se eliminó correctamente el artista con id ${id}`);
                },
                paramsRequired:1
            },
             
            addAlbum: {
                exec : function(unqfy){
                            const idArtist = Number(functionParams[0]);
                            const data = {
                                name: functionParams[1],
                                year: Number(functionParams[2]),
                                 };
                                 try{                                  
                                    const albumAdder = unqfy.addAlbum(idArtist,data);
                                    printer.printMessage(`Se agrego el album con nombre ${albumAdder.name}`)
                                 }catch(exception){
                                    printer.printException(exception)
                                 }
                        },
                    paramsRequired: 3
                },
                    
            getAlbumById: {
                exec: function(unqfy) {
                        try{
                            const album = unqfy.getAlbumById(Number(functionParams[0]));
                            printer.printEntity(`Album con id ${functionParams[0]}`, album)
                        }catch(exception){
                            printer.printException(exception)
                        }                            
                        },
                    paramsRequired: 1
            },

            addTrack: {
                exec : function(unqfy){
                            const albumId = Number(functionParams[0]);
                            const data = {
                                name: functionParams[1],
                                duration: Number(functionParams[2]),
                                genres: functionParams[3]
                                 };
                                try{
                                    const trackAdder = unqfy.addTrack(albumId,data)
                                    printer.printMessage(`Se agrego la cancion con nombre ${trackAdder.name}`)
                                }catch(exception){
                                    printer.printException(exception)
                                }                                
                        },
                    paramsRequired: 4
                    },

            deleteTrack: {
                exec : function(unqfy){
                            const id = Number(functionParams[0]);
                            const deletedtrack = unqfy.deleteArtistWithId(id)                         
                            printer.printMessage(`Se eliminó correctamente el track con id ${id}`);
                },
                paramsRequired: 1
            },

            addUser: {
                exec : function(unqfy){
                   const user = unqfy.addUser(functionParams[0]);
                    printer.printMessage(`Se agrego el user con nombre ${user.name}`)
                },
                paramsRequired: 1
            },

            getUserById: {
                exec : function(unqfy){
                    try{
                        const user = unqfy.getUserById(Number(functionParams[0]));
                        printer.printEntity(`User con id ${functionParams[0]}`, user)
                    }catch(exception){
                        printer.printException(exception)
                    }
                },
                paramsRequired: 1
            },

            userListenTrack: {
                exec : function(unqfy){
                    try{
                        unqfy.userListenTrack(Number(functionParams[0]),Number(functionParams[1]));
                        printer.printMessage(`El usuario con id ${functionParams[0]} escucho el track con id ${functionParams[1]}`)
                    }catch(exception){
                        printer.printException(exception);
                    }
                    
                },
                paramsRequired: 2
            },

            threeMostListenedByArtist: {
                exec : function(unqfy){
                    try{
                        const tracksTop3 = unqfy.threeMostListenedByArtist(Number(functionParams[0]));
                        printer.printArray(`Top 3 mas escuchados del artista con id ${functionParams[0]}`,tracksTop3)
                    }catch(exception){
                        printer.printException(exception);
                    }
                },
                paramsRequired: 1
            },

            getArtistTracks: {
                exec : function(unqfy){
                    try{
                        const tracks = unqfy.getArtistTracks(Number(functionParams[0]));
                        printer.printArray(`Los tracks del artista ${functionParams[0]} son `, tracks)
                    }catch(exception){
                        printer.printException(exception)
                    }
                },
                paramsRequired: 1
            },

            getTracksMatchingGenres: {
                exec : function(unqfy){
                    const tracksWithGenres = unqfy.getTracksMatchingGenres([functionParams[0]]);
                    printer.printArray(`Los tracks por genero son ${functionParams[0]}`, unqfy.getTracksMatchingGenres(functionParams[0]));
                },
                paramsRequired: 1
            },

            createPlaylist: {
                exec : function(unqfy){
                    printer.printEntity('Playlist creada',unqfy.createPlaylist(functionParams[0],functionParams[1],Number(functionParams[2])))
                },
                paramsRequired: 3
            },

            searchByName: {
                exec : function(unqfy){
                    const resultSearches = unqfy.searchByName(functionParams[0]);
                    printer.printArray('Artistas encontrados', resultSearches.artists)
                    printer.printArray('Albums encontrados', resultSearches.albums)
                    printer.printArray('Tracks encontrados', resultSearches.tracks)
                    printer.printArray('Playlists encontradas', resultSearches.playlists)
                },
                paramsRequired: 1
            }


        };

    }

    insufficientArguments(quantity){
        if(this.paramets.length < quantity){
            throw new MissingArguments(this.command)
        }
    }

}

module.exports= CommandHandler;

