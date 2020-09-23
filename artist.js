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
        this._albums.push(anAlbum);
    }

    addTrackToAlbum(idAlbum,track){
        for (let i = 0; i < this._albums.length; i++) {
            const album = this._albums[i];  
            if (album.id ===idAlbum) {
             album.addTrack(track);
            //  console.log('q hay aca ahora'+ JSON.stringify(album.tracks));
            }
        }
    }
    //devuelve todos los tracks de un artista
    getTracks(){
        const tracks = this.albums.map((album)=>album.tracks).flat();
        return tracks;
    }

    isOwnerOfTrack(idTrack){
        const newT = []
        this.getTracks().forEach(track => {
            if (track.id ===idTrack){
                newT.push(track)
            }
        });
        return !(newT.length==0)
    }
    getAlbumBy(id){
         return this.albums.filter((album)=>album.id == id)
    }

    isAlbumRelatedTo(idAlbum){
        return this.albums.some(album=>album.id ==idAlbum)
    }

    delteAlbum(idAlbum){
        for (let index = 0; index < this.albums.length; index++) {
            const album = this.albums[index]
            if(album.id ==idAlbum){
                this.albums.splice(index,1);
            }
        };
    }
    deleteTrack(idTrack){
        for (let index = 0; index < this.albums.length; index++) {
            const album = this.albums[index]
            if(album.isTrackIncluded(idTrack)){
                album.deleteTrack(idTrack)
            }
        };
    }

    changeName(newName){this._name = newName}

    changeCountry(newCountry){this._country = newCountry}

    updateAlbumName(idAlbum, aName){
        this.albums.forEach(album => {
            if(album.id ==idAlbum){
                album.changeName(aName)
          };  
        });

    }
    updateAlbumYear(idAlbum,year){
        this.albums.forEach(album => {
            if(album.id ==idAlbum){
                album.changeYear(year)
            }
        });
    }

    updateTrackName(idTrack,newName){
        this.albums.forEach(album => {
            if(album.isTrackIncluded(idTrack)){
                album.updateTrackName(idTrack,newName)
          };  
        });

    }

    updateTrackDuration(idTrack,duration){

        this._albums.forEach(album => {
            if(album.isTrackIncluded(idTrack)){
                album.updateTrackDuration(idTrack,duration)
          };  
        });
    }
}

module.exports=Artist;
