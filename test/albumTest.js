/* eslint-env node, mocha */

const assert = require('chai').assert;
const { use } = require('chai');
const libunqfy = require('../unqfy');


describe('Add, remove and filter data', () => {
    let unqfy = null;
  
    beforeEach(() => {
      unqfy = new libunqfy.UNQfy();
    });
  
    it('should add an album to an artist', () => {
      const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
      const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);

      assert.equal(album.name, 'Appetite for Destruction');
      assert.equal(album.year, 1987);
    });
  

    it('delete an Album ', () => {
        const artistFst = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    
        const album = createAndAddAlbum(unqfy, artistFst.id, 'Appetite for Destruction', 1987);
        const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
        const t2 = createAndAddTrack(unqfy, album.id, 'It\'s so easy', 200, ['rock', 'hard rock']);
    
        const album2 = createAndAddAlbum(unqfy, artistFst.id, 'Use Your Illusion I', 1992);
        const t3 = createAndAddTrack(unqfy, album2.id, 'Don\'t Cry', 500, ['rock', 'hard rock']);
    
        assert.include(unqfy.getAlbumById(album.id),album);
    
        unqfy.deleteAlbumWithId(album.id)
        
        assert.notInclude(unqfy.getAlbumById(album.id),album);
        assert.include(artistFst.albums,album2);  
    
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
