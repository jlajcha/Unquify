/* eslint-env node, mocha */

const assert = require('chai').assert;
const { use } = require('chai');
const libunqfy = require('../unqfy');


describe('Add, remove and filter data', () => {
    let unqfy = null;
  
    beforeEach(() => {
      unqfy = new libunqfy.UNQfy();
    });

it('should add a track to an album', () => {
    const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    const track = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);

    assert.equal(track.name, 'Welcome to the jungle');
    assert.strictEqual(track.duration, 200);
    assert.equal(track.genres.includes('rock'), true);
    assert.equal(track.genres.includes('hard rock'), true);
    assert.lengthOf(track.genres, 2);
  });

  it('should get all tracks matching genres', () => {
    const artist1 = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album1 = createAndAddAlbum(unqfy, artist1.id, 'Appetite for Destruction', 1987);
    const t0 = createAndAddTrack(unqfy, album1.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
    const t1 = createAndAddTrack(unqfy, album1.id, 'Sweet Child o\' Mine', 500, ['rock', 'hard rock', 'pop', 'movie']);

    const artist2 = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
    const album2 = createAndAddAlbum(unqfy, artist2.id, 'Thriller', 1987);
    const t2 = createAndAddTrack(unqfy, album2.id, 'Trhiller', 200, ['pop', 'movie']);
    createAndAddTrack(unqfy, album2.id, 'Another song', 500, ['classic']);

    const t3 = createAndAddTrack(unqfy, album2.id, 'Another song II', 500, ['movie']);
    const tracksMatching = unqfy.getTracksMatchingGenres(['pop', 'movie']);

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

  it('should delete a track from an Album and playlists', () => {
    const artistFst = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album = createAndAddAlbum(unqfy, artistFst.id, 'Appetite for Destruction', 1987);
    const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
    const t2 = createAndAddTrack(unqfy, album.id, 'It\'s so easy', 200, ['rock', 'hard rock']);
    const user = unqfy.addUser('juansito');
    
    unqfy.userListenTrack(user.id, t1.id);
    unqfy.userListenTrack(user.id, t2.id);

    assert.isTrue(user.hasListenedTheTrackWith(t1))
    assert.isTrue(user.hasListenedTheTrackWith(t2))

    const playlist = unqfy.createPlaylist('my playlist', ['rock'], 1400);

    assert.isTrue(playlist.hasTrack(t1));
    assert.isTrue(playlist.hasTrack(t2));

    unqfy.deleteTrack(t1.id)
  
    assert.isFalse(playlist.hasTrack(t1));
    assert.isTrue(playlist.hasTrack(t2));
    assert.isFalse(artistFst.isOwnerOfTrack(t1.id));
    assert.isTrue(artistFst.isOwnerOfTrack(t2.id));  
    assert.equal(user.timesTrackListened(t1),0)
    assert.isTrue(user.hasListenedTheTrackWith(t2))
  });

  it('update a track name and duration', () => {
    const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    const track = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);

    assert.equal(track.name, 'Welcome to the jungle');
    assert.strictEqual(track.duration, 200);

    updateTrackName(unqfy, track.id, 'Done for me')
    updateTrackDuration(unqfy, track.id, 100)

    assert.equal(track.name, 'Done for me');
    assert.equal(track.duration, 100);
    
  });



});
function updateTrackDuration(unqfy, trackId, duration) {
  return unqfy.updateTrackDuration(trackId,duration);
}


function updateTrackName(unqfy, trackId, newName) {
  return unqfy.updateTrackName(trackId,newName);
}


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

  
function getArtistFrom(unqfy,id){
    return unqfy.getArtistById(id);
  }
