
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Artist = require('./artist.js');
const IdManager = require('./idManager.js');
const Album = require('./album.js');
const Track = require('./track.js');



class UNQfy {
  constructor(){
    this._artists = [];
    this._idManager = new IdManager();//cuidado de esto no hay getter
     }

  // artistData: objeto JS con los datos necesarios para crear un artista
  //   artistData.name (string)
  //   artistData.country (string)
  // retorna: el nuevo artista creado
  addArtist(artistData) {
  /* Crea un artista y lo agrega a unqfy.
  El objeto artista creado debe soportar (al menos):
    - una propiedad name (string)
    - una propiedad country (string)
  */
    const id = this._idManager.nextIdForArtist();
    const name = artistData.name;
    const country = artistData.country;
    const newArtist = new Artist(id,name,country);
    this._artists.push(newArtist);
    return newArtist;
  }


  get artists(){
    return this._artists;
  }
   
  
  
  //"aca ver algún metodo que solo actulice el artista agregando el album. "
  addAlbumToArtist(artistId,album){
      
    for (let i = 0; i < this._artists.length; i++) {
      const art = this._artists[i];
      if (art.id === artistId) {
        art.addAlbum(album); 
        break;
      }
    }
  }

  addTrackToAlbum(idAlbum,track){
//separar mejor esta busqueda,osea primero preguntar por cada artista si tiene el album,ojo q esto ya se esta haciendo en artist OOOOOOJJJOOOO
    // const album = this.getAlbumById(idAlbum);
    // console.log('q habria aca'+ JSON.stringify(album))
    // album.addTrack(track);
    for (let i = 0; i < this._artists.length; i++) {
      const art = this.artists[i];  
      // if (art.albums.includes(album)) {
        art.addTrackToAlbum(idAlbum,track); 
        // break;
      // }
    }
    // console.log(this.artists)
  }
  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  addAlbum(artistId, albumData) {
  /* Crea un album y lo agrega al artista con id artistId.
    El objeto album creado debe tener (al menos):
     - una propiedad name (string)
     - una propiedad year (number)
  */
    const id = this._idManager.nextIdForAlbum();
    const newAlbum = new Album(id,albumData.name,albumData.year);
    // console.log('esto tiene id'+JSON.stringify(newAlbum))
    this.addAlbumToArtist(artistId,newAlbum);
    return newAlbum;
  }
  // trackData: objeto JS con los datos necesarios para crear un track
  //   trackData.name (string)
  //   trackData.duration (number)
  //   trackData.genres (lista de strings)
  // retorna: el nuevo track creado
  addTrack(albumId, trackData) {
  /* Crea un track y lo agrega al album con id albumId.
  El objeto track creado debe tener (al menos):
      - una propiedad name (string),
      - una propiedad duration (number),
      - una propiedad genres (lista de strings)
  */
    const trackID = this._idManager.nextIdForTrack();
    const newTrack = new Track(trackID,trackData.name,trackData.duration,trackData.genres);
    // console.log('esto tiene id'+JSON.stringify(newTrack))
    this.addTrackToAlbum(albumId,newTrack);
    return newTrack;

  }


  getArtistByName(name) {
    const artistsFound = this._artists.filter((artist)=> artist.name === name);
    // console.log(' artista con name es ' + JSON.stringify(artistsFound[0].name) );
    // console.log('el artista buscado '+ artistsFound.name)

    return artistsFound[0];
  }

  getArtistById(id) {
    const artistsFound = this._artists.filter((artist)=> artist.id === id);
    // console.log(' artista con id disponible es ' + JSON.stringify(this._artists[0]) )
    // console.log('el artista buscado '+ artistsFound.name)

    return artistsFound[0];
  }

  getAlbumById(id) {
    // const albumFound = 
    //       this.artists.filter(
    //                     (artist)=> (artist.albums.filter((album)=> album.id===id)))
    const albumFound = 
          this._artists.map(
                        (artist)=> (artist.albums.filter((album)=> album.id===id)))
    // console.log('album con id '+JSON.stringify(albumFound[0]))                        
    return albumFound[0];
        
  }

  getTrackById(id) {
    // const trackFound = 
    //       this.artists.filter(
    //                     (artist)=> (artist.albums.filter(
    //                                             (album)=> album.filter((track)=>track.id = id ))));
    // console.log('q tengo aca'+JSON.stringify(trackFound))                        
    const allTracks = this.allTracksOnApp();
    const trackFound = allTracks.filter(track =>track.id === id);
    // console.log('q tengo aca'+JSON.stringify(allTracks))                        
    return trackFound;
  }
  
  getPlaylistById(id) {

  }
  getArtistTracks(idArtist){
    // console.log('las canciones de este'+JSON.stringify(this.getArtistById(idArtist).getTracks()))                        
    return this.getArtistById(idArtist).getTracks();
  }

  allTracksOnApp(){
    const tracks = this._artists.map((artist)=>artist.getTracks()).flat();
    // console.log('todos los tracks de unqfy' +JSON.stringify(tracks) );
    return tracks;
  }
  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres


  allTracksWithGenders(){
    const allTracks = this.allTracksOnApp();
    // console.log('todos los tracks son ' + JSON.stringify(allTracks) );
    return allTracks.filter((track)=>track.genres.length>0);
  }
  getTracksMatchingGenres(genres) {
//ver como hacer esto mas eficientemente.

    const allTracks = this.allTracksWithGenders();
    // console.log('todos los tracks son ' + JSON.stringify(allTracks) );
    // let trackOfGender= [];
    return allTracks.filter(track=> track.includeAnyGenres(genres));

  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {
   const artist= this.getArtistByName(artistName);
   return artist.getTracks;
  }


  // name: nombre de la playlist
  // genresToInclude: array de generos
  // maxDuration: duración en segundos
  // retorna: la nueva playlist creada
  createPlaylist(name, genresToInclude, maxDuration) {
  /*** Crea una playlist y la agrega a unqfy. ***
    El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
  */

    
    return //retornar la playlist nueva
  }

  searchByName(name){
    //TODO
  }

  save(filename) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy,Artist,IdManager,Album,Track];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy: UNQfy,
  Artist: Artist,
  IdManager:IdManager,
  Album: Album,
  Track: Track,
};

