/* eslint-env node, mocha */

const assert = require('chai').assert;
const { use } = require('chai');
const libunqfy = require('../unqfy');
const {ExistArtistException} = require('../exceptions.js');
const {ExistAlbumOfArtist} = require('../exceptions.js');
const {ExistTrackInAlbumException} = require('../exceptions.js');

describe('Searching', () => {
  let unqfy = null;

  beforeEach(() => {
    unqfy = new libunqfy.UNQfy();
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
  

   it('las 3 canciones mas escuchadas de un artista', () =>{
    const user = unqfy.addUser('juansito');
    const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
    const t2 = createAndAddTrack(unqfy, album.id, 'Civil war', 200, ['rock', 'hard rock', 'movie']);
    const t3 = createAndAddTrack(unqfy, album.id, 'Rocket queen', 200, ['rock', 'hard rock', 'movie']);
    const t4 = createAndAddTrack(unqfy, album.id, 'one in a million', 200, ['rock', 'hard rock', 'movie']);
    unqfy.userListenTrack(user.id, t1.id);
    unqfy.userListenTrack(user.id, t2.id);
    unqfy.userListenTrack(user.id, t1.id);
    unqfy.userListenTrack(user.id, t4.id);
    const topThree = unqfy.threeMostListenedByArtist(artist.id);

    assert.include(topThree,t1);
    assert.notInclude(topThree,t3);
    assert.include(topThree,t2);
    assert.include(topThree,t4);
    });

    it('se intenta agregar un artista con un nombre que ya existe en unqfy levanta una exception', () =>{
      createAndAddArtist(unqfy,'juansito', 'argentina');
      const exception = () =>createAndAddArtist(unqfy,'juansito', 'argentina');
      assert.throws(exception, ExistArtistException);
    });

    it('se intenta agregar un album con un nombre que ya existe en el artista levanta una exception', () =>{
      const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
      const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
      const exception = () => createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
      assert.throws(exception, ExistAlbumOfArtist);
    });

    it('se intenta agregar un track con un nombre que ya existe en el album levanta una exception',() =>{
      const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
      const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
      const track = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
      const exception = () => createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
      assert.throws(exception, ExistTrackInAlbumException);
    });
});

function createAndAddAlbum(unqfy, artistId, albumName, albumYear) {
  return unqfy.addAlbum(artistId, { name: albumName, year: albumYear });
}

function createAndAddTrack(unqfy, albumId, trackName, trackDuraction, trackGenres) {
  return unqfy.addTrack(albumId, { name: trackName, duration: trackDuraction, genres: trackGenres });
}


function createAndAddArtist(unqfy, artistName, country) {
  const artist = unqfy.addArtist({ name: artistName, country: country });
  return artist;
}