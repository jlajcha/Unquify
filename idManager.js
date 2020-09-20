class IdManager{
    constructor(){

    this._artistCounter= 0;
    this._trackCounter= 0;
    this._albumCounter= 0;
    this._playListCounter= 0;
    this._userCounter= 0;
    }

    nextIdForArtist(){
    return this._artistCounter++;
    }

    nextIdForTrack(){
    return this._trackCounter++;    
    }

    nextIdForAlbum(){
    return this._albumCounter++;    
    }

    nextIdForPlayList(){
        return this._playListCounter++;
    }

    nextIdForUser(){
        return this._userCounter++;
    }
}
module.exports=IdManager;