const Album = require('./album.js');

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

    addAlbum(anAlbum){
        this.albums.push(anAlbum);
    }

    addTrackToAlbum(idAlbum,track){
        for (let i = 0; i < this.albums.length; i++) {
            const album = this.albums[i];  
            if (album.id ===idAlbum) {
             album.addTrack(track);
            //  console.log('q hay aca ahora'+ JSON.stringify(album.tracks));
            }
        }
    }
    //devuelve todos los tracks de un artista
    getTracks(){
        const tracks = this.albums.map((album)=>album.tracks).flat();
        // console.log('el artista tiene todos estos tracks' + JSON.stringify(tracks))
        return tracks;
    }
}
module.exports=Artist;
