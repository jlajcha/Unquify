class IdManager{
    constructor(){

    this._artistCounter= 1;
    this._trackCounter= 1;
    this._albumCounter= 1;
    this._playListCounter= 1;
    this._userCounter= 1;
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