class User{

constructor(id, name){
    this._id = id;
    this._name = name;
    this._tracksListened = [];
}

get id(){return this._id;}

get name(){return this._name;}

// eslint-disable-next-line no-undef
get tracksListened(){return [...new Set(this._tracksListened)];}

    listen(track){
        this._tracksListened.push(track);
    }

    timesTrackListened(track){
        return this._tracksListened.reduce(
                (cant, trackListen)=> cant + (track === trackListen ? 1 : 0), 0
            );
    }

    hasListenedTheTrackWith(aTrack){    
        return this.timesTrackListened(aTrack) > 0;
    }

    deleteTrack(aTrack){
        for (let index = 0; index < this._tracksListened.length; index++) {
            const track = this._tracksListened[index];

            if (track.id === aTrack.id) {
                this._tracksListened.splice(index,1);   
            }
        }
    }

    updateTrackName(aTrack,newName){
        this._tracksListened.forEach(track => {
           if (track.id === aTrack.id) {
               track.changeName(newName);   
           }
        });
    }

    updateTrackDuration(aTrack,duration){
       this._tracksListened.forEach(track => {
                if (track.id === aTrack.id) {
                    track.changeDuration(duration);   
                }
        });
    }
/////////////////

updateTrackLyrics(aTrack,lyrics){
    this._tracksListened.forEach(track => {
             if (track.id === aTrack.id) {
                 track.changeLyrics(lyrics);   
             }
     });
 }
 
 //////////////////


    toJSON(){
        return{
            id: this.id,
            name: this.name,
            tracksListened: this.tracksListened.map(track => track.toJSON())
        };
    }    
}

module.exports= User;