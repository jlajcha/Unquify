
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Artist = require('./artist.js');
const IdManager = require('./idManager.js');
const Album = require('./album.js');
const Track = require('./track.js');
const PlayListGenerator = require('./playListGenerator');
const User = require('./user');
const PlayList = require('./playlist.js');
const {ExistArtistException,
       NoExistArtistException,
       NoExistAlbumException,
       NoExistTrackException,
       NoExistPlayListException,
       NoExistUserException,
       NoFindArtistException} = require('./exceptions.js');



class UNQfy {
  constructor(){
    this._artists = [];
    this._idManager = new IdManager();//cuidado de esto no hay getter
    this._playListGenerator = new PlayListGenerator();
    this._playLists = [];
    this._users = [];
     }

  get artists(){return this._artists;}

  get playLists(){return this._playLists;}

  get users(){return this._users;}

  // hecho en commandHandler
  addUser(name){

    const id = this._idManager.nextIdForUser();
    const newUser = new User(id, name);
    this._users.push(newUser);
    return newUser;
  }

  // hecho en commandHandler
  userListenTrack(idUser, idTrack){
    const user = this.getUserById(idUser);
    const track = this.getTrackById(idTrack);

    user.listen(track);
  }

  getTracksListenByUser(idUser){
    const user = this.getUserById(idUser);
    return user.tracksListened;
  }

  getTimesTrackListenedByUser(idUser,idTrack){
    const user = this.getUserById(idUser);
    const track = this.getTrackById(idTrack);

    return user.timesTrackListened(track);
  }

  // hecho en commandHandler
  getUserById(idUser){
    const user = this._users.find(user => user.id === idUser);
    if(user === undefined){
      throw new NoExistUserException(idUser);
    }
    return user;
  }

  // hecho en commandHandler
  threeMostListenedByArtist(idArtist){
    let tracksByArtist = this.getArtistTracks(idArtist);
    tracksByArtist = tracksByArtist.map(track => {
      return [track, this.timesTrackListened(track)];
    });

    tracksByArtist = tracksByArtist.sort((trackA, trackB) =>{
      if(trackA[1] < trackB[1]){
        return 1;
      }
      if(trackA[1] > trackB[1]){
        return -1;
      }
        return 0;
    });

    return tracksByArtist.slice(0,3).map(track => track[0]);
  }

  timesTrackListened(track){
    return this._users.reduce(
      (cant, user) => cant + user.timesTrackListened(track),0
    );
  }


// hecho en commandHandler
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
    const name = artistData.name;
  if(this.artistExist(name) !== undefined){
    throw new ExistArtistException(name);
  }
    const id = this._idManager.nextIdForArtist();
    const country = artistData.country;
    const newArtist = new Artist(id,name,country);
    this._artists.push(newArtist);
    return newArtist;
  }
//No va en commandHandler
  artistExist(name){
    return this._artists.find((artist)=> artist.name === name);
  }
  
//No va en commandHandler
  addAlbumToArtist(artistId,album){      
    for (let i = 0; i < this._artists.length; i++) {
      const art = this._artists[i];
      if (art.id === artistId) {
        art.addAlbum(album); 
      }
    }
  }
//No va en commandHandler
  addTrackToAlbum(idAlbum,track){    
    for (let i = 0; i < this._artists.length; i++) {
      const art = this.artists[i];  
        art.addTrackToAlbum(idAlbum,track);       
    }
  }

// hecho en commandHandler
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

  // hecho en commandHandler
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
    this.addTrackToAlbum(albumId,newTrack);
    return newTrack;

  }

  deleteArtist(idArtistData){    
    this.deleteArtistWithId(idArtistData.id)
  }
// hecho en commandHandler
  getArtistByName(name) {
    const artistFound = this._artists.find((artist)=> artist.name === name);
    if(artistFound === undefined){
      throw new NoFindArtistException(name);
    }
    return artistFound;
  }
// hecho en commandHandler
  getArtistById(id) {
    const artistsFound = this._artists.find(artist=> artist.id === id);
    if(artistsFound === undefined){
      throw new NoExistArtistException(id);
    }
    return artistsFound;
  }
// hecho en commandHandler
  getAlbumById(id) {
    const artistWithAlbum = this._artists.find((artist)=> (artist.isAlbumRelatedTo(id)));   
    if(artistWithAlbum === undefined){
      throw new NoExistAlbumException(id);
    }  
    return artistWithAlbum.getAlbumBy(id)[0];        
  }
// hecho en commandHandler
  getTrackById(id) {                       
    const allTracks = this.allTracksOnApp();
    const trackFound = allTracks.find(track =>track.id === id);
    if(trackFound === undefined){
      throw new NoExistTrackException(id);
    }
    return trackFound;
  }
  // hecho en commandHandler
  getPlaylistById(id) {
    const playlistFound = this._playLists.find(playlist => playlist.id === id);
    if(playlistFound === undefined){
      throw new NoExistPlayListException(id);
    }
    return playlistFound;
  }

  // hecho en commandHandler
  getArtistTracks(idArtist){
    return this.getArtistById(idArtist).getTracks();
  }

//No va en commandHandler
  allTracksOnApp(){
    const tracks = this._artists.map((artist)=>artist.getTracks()).flat();
    return tracks;
  }

//No va en commandHandler
  allTracksWithGenders(){
    const allTracks = this.allTracksOnApp();
    return allTracks.filter((track)=>track.genres.length>0);
  }

// hecho en commandHandler
  getTracksMatchingGenres(genres) {
    const allTracks = this.allTracksWithGenders();
    return allTracks.filter(track=> track.includeAnyGenres(genres));

  }

// hecho en commandHandler
  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {
   const artist= this.getArtistByName(artistName);
   return artist.getTracks();
  }

// hecho en commandHandler
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
    const idPlayList = this._idManager.nextIdForPlayList();
    const newPlayList = this._playListGenerator.createPlayList(this, idPlayList, name, genresToInclude, maxDuration);
    this._playLists.push(newPlayList);
    return newPlayList;
  }

  // getTracksMatchingArtist(aName){
  //   const artists = this.searchArtistsByName(aName)
  //   const artist = artists[0]
  //   return artist.getTracks()
  // }

  // hecho en commandHandler
  searchArtistsByName(name){
    return this._artists.filter(artist => artist.name.includes(name));
  }

  // hecho en commandHandler
  searchAlbumsByName(name){
    let albums = [];
    this._artists.forEach(
                          art => 
                            albums = albums.concat (art.albums.filter(
                                          album => album.name.includes(name))));
    return albums;                                          
  }

  // hecho en commandHandler
  searchTracksByName(name){
    const allTracks = this.allTracksOnApp();
    return allTracks.filter(track => track.name.includes(name));
  }

  // hecho en commandHandler
  searchPlayListsByName(name){
    return this._playLists.filter(playlist => playlist.name.includes(name));
  }

// hecho en commandHandler
  searchByName(name){
    const resultSearches = {artists: [], albums: [], tracks: [], playlists: []};

    resultSearches.artists = this.searchArtistsByName(name);
    resultSearches.albums = this.searchAlbumsByName(name);
    resultSearches.tracks = this.searchTracksByName(name);
    resultSearches.playlists = this.searchPlayListsByName(name);

    return resultSearches;
  }

//
  updateArtistName(id, newName){
    for (let index = 0; index < this.artists.length; index++) {
        const artist = this.artists[index];
        if(artist.id === id){
          artist.changeName(newName)
        }
      }
  }
  updateArtistNationality(id, newCountry){
    for (let index = 0; index < this.artists.length; index++) {
        const artist = this.artists[index];
        if(artist.id === id){
          artist.changeCountry(newCountry)
        }
      }
  }

  updateAlbumName(idAlbum, aName){ 
      for (let index = 0; index < this.artists.length; index++) {
        const artist = this.artists[index];
        if(artist.isAlbumRelatedTo(idAlbum)){
          artist.updateAlbumName(idAlbum,aName)
        }
        
      }
       
  }

  updateAlbumYear(idAlbum, year){ 
    for (let index = 0; index < this.artists.length; index++) {
      const artist = this.artists[index];
      if(artist.isAlbumRelatedTo(idAlbum)){
        artist.updateAlbumYear(idAlbum,year)
      }
      
    }
     
}

updateTrackName(idTrack, newName) {
  const track = this.getTrackById(idTrack)

  this.updateTrackNameOnArtist(idTrack,newName);
  this.updateTrackNameOnPlaylist(idTrack,newName);
  this.updateTrackNameOnUsers(track,newName);

}

//no commandHandler
updateTrackNameOnUsers(aTrack, newName) {
  for (let index = 0; index < this.users.length; index++) {
      const user = this.users[index];
      if (user.hasListenedTheTrackWith(aTrack)) {
        user.updateTrackName(aTrack,newName);
  }
}
}

//no commandHandler
updateTrackNameOnArtist(idTrack, newName) {

  for (let index = 0; index < this.artists.length; index++) {
    const artist = this.artists[index];
    if (artist.isOwnerOfTrack(idTrack)) {
      artist.updateTrackName(idTrack,newName);
    }
  }
}

//no commandHandler
updateTrackNameOnPlaylist(idTrack, newName) {
  for (let i = 0; i < this.playLists.length; i++) {
    const playlist = this.playLists[i];
    if (playlist.isTrackIncluded(idTrack)) {
      playlist.updateTrackName(idTrack,newName);
    }
  }
}


updateTrackDuration(idTrack, duration) {
  const track = this.getTrackById(idTrack)

  this.updateTrackDurationOnArtist(idTrack,duration);
  this.updateTrackDurationOnPlaylist(idTrack,duration);
  this.updateTrackDurationOnUsers(track,duration);
}


//no commandHandler
updateTrackDurationOnUsers(aTrack, duration) {
  this._users.forEach(user => {
    if (user.hasListenedTheTrackWith(aTrack)) {
      user.updateTrackDuration(aTrack,duration);
    }  
  });
}

//no commandHandler
updateTrackDurationOnArtist(idTrack, duration) {
  this._artists.forEach(artist => {
      if (artist.isOwnerOfTrack(idTrack)) {
        artist.updateTrackDuration(idTrack,duration);
          }
        });
  }

//no commandHandler
updateTrackDurationOnPlaylist(idTrack, duration) {
  this._playLists.forEach(playlist => {
    if (playlist.isTrackIncluded(idTrack)) {
      playlist.updateTrackDuration(idTrack,duration);
    }
  });     
}
// hecho en commandHandler
deleteArtistWithId(idArtist){
    for (let index = 0; index < this.artists.length; index++) {
      const artist = this.artists[index];
      if(artist.id == idArtist){
        console.log(artist)
        this.artists.splice(index,1);
      }
      
    }
  }

deleteAlbumWithId(idAlbum){
    for (let index = 0; index < this.artists.length; index++) {
      const artist = this.artists[index];
      if(artist.isAlbumRelatedTo(idAlbum)){
        artist.deleteAlbum(idAlbum)
      }
      
    }
  }


// hecho en commandHandler
  deleteTrack(idTrack){
    const track = this.getTrackById(idTrack)

    this.deleteTrackOnArtist(idTrack);
    this.deleteTrackOnPlaylist(idTrack);
    this.deleteTrackOnUsers(track);
}

//no commandHandler
  deleteTrackOnUsers(aTrack) {
    for (let index = 0; index < this.users.length; index++) {
        const user = this.users[index];
        if (user.hasListenedTheTrackWith(aTrack)) {
          user.deleteTrack(aTrack);
    }
  }
}

//no commandHandler
  deleteTrackOnArtist(idTrack) {
    for (let index = 0; index < this.artists.length; index++) {
      const artist = this.artists[index];
      if (artist.isOwnerOfTrack(idTrack)) {
        artist.deleteTrack(idTrack);
      }
    }
  }

//no commandHandler
  deleteTrackOnPlaylist(idTrack) {
    for (let i = 0; i < this.playLists.length; i++) {
      const playlist = this.playLists[i];
      if (playlist.isTrackIncluded(idTrack)) {
        playlist.deleteTrack(idTrack);
      }
    }
  }


  save(filename) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy,Artist,IdManager,Album,Track,PlayListGenerator,User,ExistArtistException,NoExistArtistException,NoExistAlbumException,NoExistTrackException,NoExistPlayListException,NoExistUserException,NoFindArtistException];
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
  User: User,
  PlayListGenerator: PlayListGenerator,
  PlayList: PlayList,
  ExistArtistException: ExistArtistException,
  NoExistArtistException: NoExistArtistException,
  NoExistAlbumException: NoExistAlbumException,
  NoExistTrackException: NoExistTrackException,
  NoExistPlayListException: NoExistPlayListException,
  NoExistUserException: NoExistUserException,
  NoFindArtistException: NoFindArtistException
};

