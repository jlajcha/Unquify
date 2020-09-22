/* eslint-env node, mocha */

const assert = require('chai').assert;
const { use } = require('chai');
const libunqfy = require('./unqfy');


function createAndAddArtist(unqfy, artistName, country) {
  const artist = unqfy.addArtist({ name: artistName, country: country });
  return artist;
}

function createAndAddAlbum(unqfy, artistId, albumName, albumYear) {
  return unqfy.addAlbum(artistId, { name: albumName, year: albumYear });
}

function createAndAddTrack(unqfy, albumId, trackName, trackDuraction, trackGenres) {
  return unqfy.addTrack(albumId, { name: trackName, duration: trackDuraction, genres: trackGenres });
}
function getArtistFrom(unqfy,id){
  return unqfy.getArtistById(id);
}

describe('Add, remove and filter data', () => {
  let unqfy = null;

  beforeEach(() => {
    unqfy = new libunqfy.UNQfy();
  });

  it('should add an artist', () => {
    const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');

    assert.equal(artist.name, 'Guns n\' Roses');
    assert.equal(artist.country, 'USA');
    assert.equal(artist.id,0);
    console.log(artist);

  });


  it('should add three artists', () => {
    const firstArtist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const secondArtist = createAndAddArtist(unqfy, 'Miranda', 'Argentina');
    const thirdArtist = createAndAddArtist(unqfy, 'ACDC', 'Australia');
    assert.equal(firstArtist.name, 'Guns n\' Roses');
    assert.equal(firstArtist.id,0);
    assert.equal(secondArtist.name, 'Miranda');
    assert.equal(secondArtist.id,1);
    assert.equal(thirdArtist.id,2);
    //console.log(artist)

  });

  it('should get a artist by id', () => {
    const artist1 = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    assert.equal(artist1.id,0);
    const artistfound = getArtistFrom(unqfy,0);
    console.log(artist1);
    console.log(artistfound);

    assert.equal(artist1.name,artistfound.name);
    assert.equal(artist1.country,artistfound.country);

  });

  
  it('should add an album to an artist', () => {
    const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    // console.log('esto tiene album'+ JSON.stringify(album));
    assert.equal(album.name, 'Appetite for Destruction');
    assert.equal(album.year, 1987);
  });

  it('should add a track to an album', () => {
    const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    const track = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
    // console.log('todo el unqfy'+JSON.stringify(unqfy))
    // console.log('esto tiene track'+ JSON.stringify(track) );
    assert.equal(track.name, 'Welcome to the jungle');
    assert.strictEqual(track.duration, 200);
    assert.equal(track.genres.includes('rock'), true);
    assert.equal(track.genres.includes('hard rock'), true);
    assert.lengthOf(track.genres, 2);
  });

  it('should find different things by name', () => {
    const artist1 = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album1 = createAndAddAlbum(unqfy, artist1.id, 'Roses Album', 1987);
    const track = createAndAddTrack(unqfy, album1.id, 'Roses track', 200, ['pop', 'movie']);
    const playlist = unqfy.createPlaylist('Roses playlist', ['pop'], 1400);
    const results = unqfy.searchByName('Roses');
    assert.deepEqual(results, {
      artists: [artist1],
      albums: [album1],
      tracks: [track],
      playlists: [playlist],
    });
  });

  it('should get all tracks matching genres', () => {
    const artist1 = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album1 = createAndAddAlbum(unqfy, artist1.id, 'Appetite for Destruction', 1987);
    const t0 = createAndAddTrack(unqfy, album1.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
    const t1 = createAndAddTrack(unqfy, album1.id, 'Sweet Child o\' Mine', 500, ['rock', 'hard rock', 'pop', 'movie']);
    // console.log('todo el unqfy'+JSON.stringify(unqfy))
    const artist2 = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
    const album2 = createAndAddAlbum(unqfy, artist2.id, 'Thriller', 1987);
    const t2 = createAndAddTrack(unqfy, album2.id, 'Trhiller', 200, ['pop', 'movie']);
    createAndAddTrack(unqfy, album2.id, 'Another song', 500, ['classic']);
    const t3 = createAndAddTrack(unqfy, album2.id, 'Another song II', 500, ['movie']);

    const tracksMatching = unqfy.getTracksMatchingGenres(['pop', 'movie']);
    // console.log('los q machean' +JSON.stringify(tracksMatching));
    // console.log();
    // assert.equal(tracks.matching.constructor.name, Array);
    assert.isArray(tracksMatching);
    assert.lengthOf(tracksMatching, 4);
    assert.equal(tracksMatching.includes(t0), true);
    assert.equal(tracksMatching.includes(t1), true);
    assert.equal(tracksMatching.includes(t2), true);
    assert.equal(tracksMatching.includes(t3), true);
  });

  it('should get all tracks matching artist', () => {
    const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
    const t2 = createAndAddTrack(unqfy, album.id, 'It\'s so easy', 200, ['rock', 'hard rock']);

    const album2 = createAndAddAlbum(unqfy, artist.id, 'Use Your Illusion I', 1992);
    const t3 = createAndAddTrack(unqfy, album2.id, 'Don\'t Cry', 500, ['rock', 'hard rock']);

    const artist2 = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
    const album3 = createAndAddAlbum(unqfy, artist2.id, 'Thriller', 1987);
    createAndAddTrack(unqfy, album3.id, 'Thriller', 200, ['pop', 'movie']);
    createAndAddTrack(unqfy, album3.id, 'Another song', 500, ['classic']);
    createAndAddTrack(unqfy, album3.id, 'Another song II', 500, ['movie']);

    const matchingTracks = unqfy.getTracksMatchingArtist(artist.name);

    assert.isArray(matchingTracks);
    assert.lengthOf(matchingTracks, 3);
    assert.isTrue(matchingTracks.includes(t1));
    assert.isTrue(matchingTracks.includes(t2));
    assert.isTrue(matchingTracks.includes(t3));
  });
});

describe('Playlist Creation and properties', () => {
  let unqfy = null;

  beforeEach(() => {
    unqfy = new libunqfy.UNQfy();
  });

  it('should create a playlist as requested', () => {
    const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
    createAndAddTrack(unqfy, album.id, 'Sweet Child o\' Mine', 1500, ['rock', 'hard rock', 'pop', 'movie']);

    const artist2 = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
    const album2 = createAndAddAlbum(unqfy, artist2.id, 'Thriller', 1987);
    const t2 = createAndAddTrack(unqfy, album2.id, 'Thriller', 200, ['pop', 'movie']);
    const t3 = createAndAddTrack(unqfy, album2.id, 'Another song', 500, ['pop']);
    const t4 = createAndAddTrack(unqfy, album2.id, 'Another song II', 500, ['pop']);

    const playlist = unqfy.createPlaylist('my playlist', ['pop', 'rock'], 1400);

    // console.log('q tiene la playlist'+ JSON.stringify(playlist));
    assert.equal(playlist.name, 'my playlist');
    assert.isAtMost(playlist.duration(), 1400);
    assert.isTrue(playlist.hasTrack(t1));
    assert.isTrue(playlist.hasTrack(t2));
    assert.isTrue(playlist.hasTrack(t3));
    assert.isTrue(playlist.hasTrack(t4));
    assert.lengthOf(playlist.tracks, 4);
  });


  it('should delete an Artist', () => {
    const artistFst = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const artistSnd = createAndAddArtist(unqfy, 'Miranda', 'Arg');
    assert.include(unqfy.artists,artistFst );
    assert.include(unqfy.artists,artistSnd);
    unqfy.deleteArtistWithId(0)
    assert.include(unqfy.artists,artistSnd);
    assert.notInclude(unqfy.artists,artistFst);
    assert.lengthOf(unqfy.artists,1);
    
      
  });



  it('should delete an Album', () => {
    const artistFst = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');

    const album = createAndAddAlbum(unqfy, artistFst.id, 'Appetite for Destruction', 1987);
    const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
    const t2 = createAndAddTrack(unqfy, album.id, 'It\'s so easy', 200, ['rock', 'hard rock']);

    const album2 = createAndAddAlbum(unqfy, artistFst.id, 'Use Your Illusion I', 1992);
    const t3 = createAndAddTrack(unqfy, album2.id, 'Don\'t Cry', 500, ['rock', 'hard rock']);

    assert.include(unqfy.getAlbumById(album.id) );

    unqfy.deleteAlbumWithID(album.id)
    
    assert.notInclude(artistFst.albums,album);
    assert.include(artistFst.albums,album2);
    
      

  });

  it('should delete a track from an Album and playlists', () => {

  });


  it('should delete a track from an Album', () => {

  });

  it('se crea playlist con un elemento y es la unica playlist de unqfy', () =>{
  
    const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
    createAndAddTrack(unqfy, album.id, 'Sweet Child o\' Mine', 500, ['rock', 'hard rock', 'pop', 'movie']);
    const playlist = unqfy.createPlaylist('my playlist', ['pop', 'rock'], 700);
    // console.log('q tiene la playlist'+ JSON.stringify(playlist));
    assert.equal(playlist.name, 'my playlist');
    assert.equal(playlist, unqfy.playLists[0] );
  });

  it('se crea una playlist que no tiene ninguno de los tracks de todo unqfy por que todos los tracks tienen duration mayor que el maxDuration',() =>{
    const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
    createAndAddTrack(unqfy, album.id, 'Sweet Child o\' Mine', 1500, ['rock', 'hard rock', 'pop', 'movie']);

    const artist2 = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
    const album2 = createAndAddAlbum(unqfy, artist2.id, 'Thriller', 1987);
    const t2 = createAndAddTrack(unqfy, album2.id, 'Thriller', 200, ['pop', 'movie']);
    const t3 = createAndAddTrack(unqfy, album2.id, 'Another song', 500, ['pop']);
    const t4 = createAndAddTrack(unqfy, album2.id, 'Another song II', 500, ['pop']);

    unqfy.createPlaylist('my playlist', ['pop', 'rock'], 100);
    const playlist = unqfy.getPlaylistById(0);
    // console.log('q tiene la playlist'+ JSON.stringify(playlist));
    assert.equal(playlist.name, 'my playlist');
    assert.isAtMost(playlist.duration(), 1400);
    assert.isFalse(playlist.hasTrack(t1));
    assert.isFalse(playlist.hasTrack(t2));
    assert.isFalse(playlist.hasTrack(t3));
    assert.isFalse(playlist.hasTrack(t4));
    assert.lengthOf(playlist.tracks, 0);
  });


  it('se crea un usuario en unqfy', () =>{
    const user = unqfy.addUser('juansito');
    assert.equal(user.id,0);
    assert.equal(user.name,'juansito');
    assert.equal(unqfy.users[0],user);
  });

  it('un usuario escucha una cancion', () =>{
    const user = unqfy.addUser('juansito');
    const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
    
    unqfy.userListenTrack(user.id, t1.id);
    
    assert.equal(user.tracksListened[0],t1);
    assert.equal(user.tracksListened[0].name,'Welcome to the jungle');
    assert.equal(user.timesTrackListened(t1),1);
  });

  it('un usuario escucha dos canciones diferentes', () =>{
    const user = unqfy.addUser('juansito');
    const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);

    const artist2 = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
    const album2 = createAndAddAlbum(unqfy, artist2.id, 'Thriller', 1987);
    const t2 = createAndAddTrack(unqfy, album2.id, 'Thriller', 200, ['pop', 'movie']);

    unqfy.userListenTrack(user.id, t1.id);
    unqfy.userListenTrack(user.id, t2.id);

    assert.equal(user.tracksListened[0],t1);
    assert.equal(user.tracksListened[0].name,'Welcome to the jungle');
    assert.equal(user.timesTrackListened(t1),1);
    assert.equal(user.tracksListened[1],t2);
    assert.equal(user.tracksListened[1].name,'Thriller');
    assert.equal(user.timesTrackListened(t2),1);
  });

  it('un usuario escucha 3 veces la misma cancion', () =>{
    const user = unqfy.addUser('juansito');
    const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
    
    unqfy.userListenTrack(user.id, t1.id);
    unqfy.userListenTrack(user.id, t1.id);
    unqfy.userListenTrack(user.id, t1.id);

    assert.equal(user.tracksListened[0],t1);
    assert.equal(user.tracksListened[0].name,'Welcome to the jungle');
    assert.equal(user.timesTrackListened(t1),3);
  });

  it('un usuario escucha 3 veces la misma cancion pero en su lista de canciones escuchadas figura una sola', () =>{
    const user = unqfy.addUser('juansito');
    const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);

    unqfy.userListenTrack(user.id, t1.id);
    unqfy.userListenTrack(user.id, t1.id);
    unqfy.userListenTrack(user.id, t1.id);

    assert.equal(user.tracksListened[0],t1);
    assert.equal(user.tracksListened[0].name,'Welcome to the jungle');
    assert.equal(user.tracksListened.length,1);
  });


  
});
