class ExistException extends Error{
    constructor(name, ...entity){
        if(entity.length === 1){
            super('Ya existe el ${entity[0]} con nombre ${name}');            
        }else{
            super('Ya existe el ${entity[0]} con nombre ${name} para el ${entity[1]} con id ${entity[2]}')
        }
    }
}

class ExistArtistException extends ExistException{
    constructor(artistName){
        super(artistName, 'artista');
        this.name = 'ExistArtistException';
    }
}

class ExistAlbumOfArtist extends ExistException{
    constructor(albumName, idArtist){
        super(albumName, 'album', 'artista', idArtist);
        this.name = 'ExistAlbumOfArtist';
    }
}

class ExistTrackInAlbumException extends ExistException{
    constructor(trackName, idAlbum){
        super(trackName, 'track', 'album', idAlbum);
        this.name = 'ExistTrackInAlbumException';
    }
}

class NoExistEntityException extends Error{
    constructor(id, entity){
        super('No existe el ${entity} con id ${id}');
    }
}

class NoExistArtistException extends NoExistEntityException{
    constructor(idArtist){
        super(idArtist, 'artista');
        this.name = 'NoExistArtistException';
    }
}

class NoExistAlbumException extends NoExistEntityException{
    constructor(idAlbum){
        super(idAlbum, 'album');
        this.name = 'NoExistAlbumException';
    }
}

class NoExistTrackException extends NoExistEntityException{
    constructor(idTrack){
        super(idTrack, 'track');
        this.name = 'NoExistTrackException';
    }
}

class NoExistPlayListException extends NoExistEntityException{
    constructor(idPlayList){
        super(idPlayList, 'Playlist');
        this.name = 'NoExistPlayListException';
    }
}

class NoExistUserException extends NoExistEntityException{
    constructor(idUser){
        super(idUser, 'User');
        this.name = 'NoExistUserException';
    }
}

class NoFindArtistException extends Error{
    constructor(artistName){
        super('No se encontro el artista con el nombre ${artistName}');
    }
}

class MissingArguments extends Error{
    constructor(id){
        super('Argumentos insuficientes para la ejecucion del comando "${id}"');
        this.name = 'MissingArguments';
    }
}

module.exports = {
    ExistArtistException,
    ExistTrackInAlbumException,
    ExistAlbumOfArtist,
    NoExistArtistException,
    NoExistAlbumException,
    NoExistTrackException,
    NoExistPlayListException,
    NoExistUserException,
    NoFindArtistException,
    MissingArguments
};