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
