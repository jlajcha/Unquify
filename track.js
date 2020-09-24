
class Track{


    constructor(id,name,duration,genres){
        this._id = id;
        this._name = name;
        this._duration = duration;
        this._genres = genres;       
    }

    get id(){return this._id;}
    get name(){return this._name;}
    get duration(){return this._duration;}
    get genres(){return this._genres;}

    includeAnyGenres(listOfGenres){
         const bool =  this._genres.some((gen)=>listOfGenres.includes(gen));
         return bool
    }
    changeName(aName){
        this._name = aName
    }

    changeDuration(duration){
        this._duration = duration
    }
}
module.exports=Track;