class Album{

    constructor(id,name,year){
        this.id = id;
        this.name = name;
        this.year = year;
        this.tracks = [];
    }

    id(){return this.id;}
    name(){return this.name;}
    year(){return this.year;}
    tracks(){return this.tracks;}
    
    addTrack(newTrack){
       this.tracks.push(newTrack);
    //    console.log('ahora tengo estos tracks'+ JSON.stringify(this.tracks));
    }

}
module.exports=Album;