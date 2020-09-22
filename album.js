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
    
    addTrack(newTrack){
        this.tracks.push(newTrack);
    }

    isTrackIncluded(idTrack){
        return  this.tracks.some(track => track.id ==idTrack)
    }

    deleteTrack(idTrack){
        for (let index = 0; index < this.tracks.length; index++) {
            const album = this.tracks[index]
            if(track.id == idTrack){
                this.tracks.splice(index,1);   
            }
        };
    }
}
module.exports=Album;