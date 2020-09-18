class IdManager{
    constructor(){

    this.artistCounter= 0;
    this.trackCounter= 0;
    this.albumCounter= 0;
    
    }

    nextIdForArtist(){
    //this.artistCounter = artistCounter+1
    return this.artistCounter++;
    }

    nextIdForTrack(){
    //this.trackCounter = trackCounter++
    return this.trackCounter++;    
    }

    nextIdForAlbum(){
    return this.albumCounter++;    
    }
}
module.exports=IdManager;