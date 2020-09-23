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
    
        assert.equal(unqfy.getAlbumById(album.id).id,album.id);

        assert.isTrue(artistFst.isAlbumRelatedTo(0));
        unqfy.deleteAlbumWithId(album.id)
        
        assert.isFalse(artistFst.isAlbumRelatedTo(0));
        assert.include(artistFst.albums,album2);  
    
      });
   
  
      it('modify an album changinig its name and year', () => {
        const artistFst = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        
        const album = createAndAddAlbum(unqfy, artistFst.id, 'Appetite for Destruction', 1987);
        const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
        const t2 = createAndAddTrack(unqfy, album.id, 'It\'s so easy', 200, ['rock', 'hard rock']);
      
        assert.equal(album.name, 'Appetite for Destruction');
        assert.equal(album.year, 1987);
        assert.equal(album.id,0);
      
        updateAlbumName(unqfy,album.id,'Use Your Illusion I')
        updateAlbumYear(unqfy, album.id,1999)
        
        assert.equal(album.name, 'Use Your Illusion I');
      
        assert.equal(album.year, 1999);
        assert.equal(album.id,0);
      });   

      
});    

      
function updateAlbumName(unqfy,id , aName) {
  const artist = unqfy.updateAlbumName(id, aName);
  return artist;
}

function updateAlbumYear(unqfy,id ,year) {
  const artist = unqfy.updateAlbumYear(id, year);
  return artist;
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
