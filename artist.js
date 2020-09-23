const Album = require('./album.js');
const {ExistAlbumOfArtist} = require('./exceptions.js');

class Artist{
    
    constructor(id,name, country){

        this._id = id;
        this._name = name;
        this._country = country;
        this._albums = [];
    }

    get id(){ return this._id; }

    get name(){ return this._name; }
    
    get country(){ return this._country; }
    
    get albums(){return this._albums;}

    hasTheAlbum(anAlbum){
        return this._albums.some(
            album => album.name === anAlbum.name
        );
    }

    addAlbum(anAlbum){
        if(this.hasTheAlbum(anAlbum)){
            throw new ExistAlbumOfArtist(anAlbum.name, this._id);
        }
        this.albums.push(anAlbum);
    }

    addTrackToAlbum(idAlbum,track){
        for (let i = 0; i < this.albums.length; i++) {
            const album = this.albums[i];  
            if (album.id ===idAlbum) {
             album.addTrack(track);
            }
        }
    }
    //devuelve todos los tracks de un artista
    getTracks(){
        const tracks = this.albums.map((album)=>album.tracks).flat();
        return tracks;
    }
}
module.exports=Artist;
