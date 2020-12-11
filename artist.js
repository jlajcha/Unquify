const Album = require('./album.js');
const {ExistAlbumOfArtist} = require('./exceptions.js');
const {ObserverManager} = require('./unquifyPublisher');
const observer = new ObserverManager();
const {NewsletterObserver} = require('./NewsletterObserver');
const nw  = new NewsletterObserver();
const {LoggingObserver} = require('./LoggingObserver');
const lg = new LoggingObserver();

 observer.subscribe(nw);
observer.subscribe(lg)

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
        
        observer.notifyAll({entityName:anAlbum.name,artist:this.name,artistId:this._id,accion:'Album creado',entityId:anAlbum.id,level:'info',typeOfAccion:'addAlbum'})     
        this.albums.push(anAlbum);
        return anAlbum
    }

    addTrackToAlbum(idAlbum,track){
        for (let i = 0; i < this._albums.length; i++) {
            const album = this._albums[i];  
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

    isOwnerOfTrack(idTrack){
        const newT = []
        this.getTracks().forEach(track => {
            if (track.id ===idTrack){
                newT.push(track)
            }
        });
        return !(newT.length===0)
    }
    getAlbumBy(id){
         return this.albums.filter((album)=>album.id === id);
    }

    isAlbumRelatedTo(idAlbum){
        return this.albums.some(album=>album.id ===idAlbum);
    }

    deleteAlbum(idAlbum){
        for (let index = 0; index < this.albums.length; index++) {
            const album = this.albums[index];
            if(album.id ===idAlbum){
                this.albums.splice(index,1);
                observer.notifyAll({entityName:album.name,accion:'Album borrado',entityId:album.id,level:'info'})     
            }
        }
    }
    deleteTrack(idTrack){
        for (let index = 0; index < this.albums.length; index++) {
            const album = this.albums[index];
            if(album.isTrackIncluded(idTrack)){
                album.deleteTrack(idTrack);
            }
        }
    }

    changeName(newName){this._name = newName;}

    changeCountry(newCountry){this._country = newCountry;}

    updateAlbumName(idAlbum, aName){
        this._albums.forEach(album => {
            if(album.id ===idAlbum){
                album.changeName(aName);
          }
        });

    }
    updateAlbumYear(idAlbum,year){
        this._albums.forEach(album => {
            if(album.id ===idAlbum){
                album.changeYear(year)
            }
        });
    }

    updateTrackName(idTrack,newName){
        this._albums.forEach(album => {
            if(album.isTrackIncluded(idTrack)){
                album.updateTrackName(idTrack,newName);
          }  
        });

    }

    updateTrackDuration(idTrack,duration){

        this._albums.forEach(album => {
            if(album.isTrackIncluded(idTrack)){
                album.updateTrackDuration(idTrack,duration);
          }  
        });
    }

///////////////

updateTrackLyrics(idTrack,lyrics){

    this._albums.forEach(album => {
        if(album.isTrackIncluded(idTrack)){
            album.updateTrackLyrics(idTrack,lyrics);
      }  
    });
}

//////////////////
    toJSON(){
        return {
            id: this.id,
            name: this.name,
            country: this.country,
            albums: this.albums.map(album => album.toJSON())
        };
    }
}

module.exports=Artist;
