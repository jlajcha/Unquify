
class Track{


    constructor(id,name,duration,genres){
        this._id = id;
        this._name = name;
        this._duration = duration;
        this._genres = genres;  
        this._lyrics = "";     
    }

    get id(){return this._id;}
    get name(){return this._name;}
    get duration(){return this._duration;}
    get genres(){return this._genres;}
    get lyrics(){return this._lyrics;}

//ver si es necesario o se lo paso por constructor    
    lyrics(lyrics){
        return this._lyrics = lyrics;
    }

    includeAnyGenres(listOfGenres){
        return listOfGenres.some(gen=>this._genres.includes(gen));
    }
    changeName(aName){
        this._name = aName;
    }

    changeDuration(duration){
        this._duration = duration;
    }

    toJSON(){
        return {
            id: this.id,
            name: this.name,
            duration: this.duration,
            genres: this.genres,
            lyrics: this.lyrics
        };
    }
}
module.exports=Track;