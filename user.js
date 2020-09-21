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



}

module.exports= User;