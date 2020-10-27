// -reciben lista de generos y duracion maxima y name
// -se deben borrar los tracks de la playList,cuando se borre un 
// artista,album o track de unqfy
// -se deben poder eliminar las playList desde unqfy


class PlayList{

    constructor(id, name, maxDuration, tracks){
        this._id = id;
        this._name = name;
        this._maxDuration = maxDuration;
        this._tracks = tracks;
    }

    get id(){return this._id;}

    get name(){return this._name;}

    get maxDuration(){return this._maxDuration;}

    get tracks(){return this._tracks;}

    duration(){
        const durationOfTracks = this.tracks.map(track => track.duration);
        const duration = durationOfTracks.reduce((a, b) => a + b, 0);
        return duration;
    }

    hasTrack(aTrack){
        return this.tracks.includes(aTrack);
    }
    isTrackIncluded(anId){
        return this.tracks.some(track=> track.id === anId);
    }
    
    deleteTrack(idTrack){
        for (let index = 0; index < this.tracks.length; index++) {
            const track = this.tracks[index]
            if(track.id === idTrack){
                this.tracks.splice(index,1);
            }
        }
    }
    updateTrackName(idTrack,name){
        this._tracks.forEach(track => {
            if ( track.id === idTrack){
                track.changeName(name);
            }
        });
    }
    updateTrackDuration(idTrack,duration){
        this._tracks.forEach(track => {
            if ( track.id === idTrack){
                track.changeDuration(duration);
            }
        });
    }

    toJSON(){
        return {
            id: this.id,
            name: this.name,
            duration: this.duration(),
            tracks: this.tracks.map(track => track.toJSON())
        };
    }
}
module.exports = PlayList;
