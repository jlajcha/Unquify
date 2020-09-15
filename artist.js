class Artist{
    
    constructor(id,name, country){

        this.id = id;
        this.name = name;
        this.country = country;
    }
    id(){
        return this.id
    }
    name(){
        return this.name
    }
    country(){
        return this.country
    }
}
module.exports= Artist 