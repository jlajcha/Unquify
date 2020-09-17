
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Artist = require('./artist.js');
const IdManager = require('./idManager.js');
const Album = require('./album.js');
const Track = require('./track.js');



class UNQfy {
  constructor(){
    this.artists = []
 //   var idManager = new IdManager()
//    this.manager = idManager
    this.idManager = new IdManager()
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
    const id = this.idManager.nextIdForArtist()
    const name = artistData.name
    const country = artistData.country
    const newArtist = new Artist(id,name,country)
    this.artists.push(newArtist)
    return newArtist
  }


  artists(){
    return this.artists
  }
   
  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  
  //"aca ver algún metodo que solo actulice el artista agregando el album. "
  addAlbumToArtist(artistId,album){
      
    for (var i = 0; i < this.artists.length; i++) {
      var art = this.artists[i]
      if (art.id == artistId) {
        art.addAlbum(album); 
          break;
      }
    }
  }

  addTrackToAlbum(idAlbum,track){

    var album = this.getAlbumById(idAlbum)
    for (var i = 0; i < this.artists.length; i++) {
      var art = this.artists[i]  
      if (art.albums.includes(album)) {
        art.addTrackToAlbum(idAlbum,track); 
          break;
      }
    }
    console.log(this.artists)
  }
  
  addAlbum(artistId, albumData) {
  /* Crea un album y lo agrega al artista con id artistId.
    El objeto album creado debe tener (al menos):
     - una propiedad name (string)
     - una propiedad year (number)
  */
    const id = this.idManager.nextIdForAlbum();
    const newAlbum = new Album(id,albumData.name,albumData.year);
    this.addAlbumToArtist(artistId,newAlbum);
    return newAlbum
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
    const trackID = this.idManager.nextIdForTrack
    const newTrack = new Track(trackID,trackData.name,trackData.duration,trackData.genres)
    this.addTrackToAlbum(albumId,newTrack)
    return newTrack

  }


  getArtistByName(name) {
    const artistsFound = this.artists.filter((artist)=> artist.name == name)
    // console.log('los artistas disponibles son ' + this.artists)
    // console.log('el artista buscado '+ artistsFound.name)

    return artistsFound[0]
  }

  getArtistById(id) {
    const artistsFound = this.artists.filter((artist)=> artist.id == id)
    // console.log('los artistas disponibles son ' + this.artists)
    // console.log('el artista buscado '+ artistsFound.name)

    return artistsFound[0]
  }

  getAlbumById(id) {
    const albumFound = 
          this.artists.filter(
                        (artist)=> (artist.albums.filter((album)=> album.id===id)))
    return albumFound
        
  }

  getTrackById(id) {
    const trackFound = 
          this.artists.filter(
                        (artist)=> (artist.albums.filter(
                                                (album)=> albumtracks.filter((track)=>track.id = id ))))
    
    return trackFound
  }

  getPlaylistById(id) {

  }
  getArtistTracks(idArtist){
    return this.getArtistById(idArtist).getTracks
  }

  allTracksOnApp(){
    const tracks = this.artists.map((artist)=>artist.getTracks)
    return tracks
  }
  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres


  allTracksWithGender(){
    const allTracks = this.allTracksOnApp()
    return allTracks.filter((track)=>track.genres.length()>0)
  }
  getTracksMatchingGenres(genres) {
//ver como hacer esto menos inecificientemente.

    const allTracks = this.allTracksWithGender()
    console.log('todos los tracks son ' + allTracks)
    const trackOfGender= new Set

    for (let index = 0; index < genres.length; index++) {
      const gen = genres[index];
      trackOfGender.push( allTracks.filter(
                            (track)=> genres.includes(gen)))
                      
    }
    return trackOfGender

  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {
   const artist= this.getArtistByName(artistName)
   return artist.getTracks
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
  Album,
  Track,
};

