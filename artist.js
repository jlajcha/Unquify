const Album = require('./album.js');

class Artist{
    
    constructor(id,name, country){

        this.id = id;
        this.name = name;
        this.country = country;
        this.albums = []
    }

    id(){ return this.id }

    name(){ return this.name }
    
    country(){ return this.country }
    
    albums(){return this.albums}

    addAlbum(anAlbum){
        this.albums.push(anAlbum)
    }
    addTrackToAlbum(idAlbum,track){
        for (var i = 0; i < this.albums.length; i++) {
            var album = this.albums[i]  
            if (album.id ==idAlbum) {
             album.Album.addTrack(track)
            }
        }
    }
    //devuelve todos los tracks de un artista
    getTracks(){
        const tracks = new Set
        tracks =  this.albums.map((album)=>album.tracks)
        return tracks.flat()
    }
}
module.exports=Artist