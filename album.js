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
    //    console.log('ahora tengo estos tracks'+ JSON.stringify(this.tracks));
    }

}
module.exports=Album;