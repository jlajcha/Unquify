
class Track{


    constructor(id,name,duration,genres){
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.genres = genres;       
    }

    id(){return this.id;}
    name(){return this.name;}
    duration(){return this.duration;}
    genres(){return this.genres;}

    includeAnyGenres(listOfGenres){
        return this.genres.some(gen=>listOfGenres.includes(gen));
    }
}
module.exports=Track;