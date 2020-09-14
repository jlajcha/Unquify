class IdManager{
    constructor(){
    this.artistCounter = 0;
    this.trackCounter = 0;
    
    }

    nextIdForArtist(){
    this.artistCounter = artistCounter++
    return this.artistCounter
    }

    nextIdForTrack(){
    this.trackCounter = trackCounter++
    return this.trackCounter    
    }
}
module.exports.IdManager = IdManager