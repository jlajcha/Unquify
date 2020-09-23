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
            const track = this.tracks[index]
            if(track.id == idTrack){
                this.tracks.splice(index,1);   
            }
        };
    }
    changeName(aName){
        this._name = aName
    }
    changeYear(aYear){
        this._year = aYear
    }
    updateTrackName(idTrack,newName){
        this._tracks.forEach(track => {
            if(track.id == idTrack){
            track.changeName(newName)
            }
        });
    }

    updateTrackDuration(idTrack,duration){
        this._tracks.forEach(track => {
            if(track.id == idTrack){
            track.changeDuration(duration)
            }
        });
    }
}
module.exports=Album;