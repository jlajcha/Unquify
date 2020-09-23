const {ExistTrackInAlbumException} = require('./exceptions.js');

class Album{

    constructor(id,name,year){
        this._id = id;
        this._name = name;
        this._year = year;
        this._tracks = [];
    }

    get id(){return this._id;}
    get name(){return this._name;}
    get year(){return this._year;}
    get tracks(){return this._tracks;}
    
    hasTheTrack(aTrack){
        return this._tracks.some(
            track => track.name === aTrack.name
        );
    }
    
    addTrack(newTrack){
       if(this.hasTheTrack(newTrack)){
           throw new ExistTrackInAlbumException(newTrack.name, this._id);
       } 
       this.tracks.push(newTrack);    
    }

}
module.exports=Album;