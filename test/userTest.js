/* eslint-env node, mocha */

const assert = require('chai').assert;
const { use } = require('chai');
const libunqfy = require('../unqfy');



describe('User behaviour', () => {
    let unqfy = null;
  
    beforeEach(() => {
      unqfy = new libunqfy.UNQfy();
    });
  
    it('create new user', () =>{
        const user = unqfy.addUser('juansito');
        assert.equal(user.id,0);
        assert.equal(user.name,'juansito');
        assert.equal(unqfy.users[0],user);
      });
    
      it('user listen a track increase amount of own tracks Listened', () =>{
        const user = unqfy.addUser('juansito');
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
        const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
        
        unqfy.userListenTrack(user.id, t1.id);
        
        assert.equal(user.tracksListened[0],t1);
        assert.equal(user.tracksListened[0].name,'Welcome to the jungle');
        assert.equal(user.timesTrackListened(t1),1);
      });
    
      it('user listen twice a track', () =>{
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
    
      it('User listen three times the same track', () =>{
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
  
