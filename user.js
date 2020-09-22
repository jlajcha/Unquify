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
hasListenedTheTrackWith(anId){
    return this.timesTrackListened>0
}

deleteTrack(idTrack){
    for (let index = 0; index < this.tracksListened.length; index++) {
        const track = this.tracksListened[index];
        if (track.id == idTrack) {
            this.tracksListened.splice(index,1);   
        }
      }
    }

}

module.exports= User;