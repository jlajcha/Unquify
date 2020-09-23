/* eslint-env node, mocha */

const assert = require('chai').assert;
const { use } = require('chai');
const libunqfy = require('../unqfy');
const unqfy = require('../unqfy');


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



it('modify an Artist changinig its name and country', () => {
  const artistFst = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    
  assert.equal(artistFst.name, 'Guns n\' Roses');
  assert.equal(artistFst.country, 'USA');
  assert.equal(artistFst.id,0);

  updateArtistName(unqfy,artistFst.id,'AC/DC')
  updateArtistNationality(unqfy, artistFst.id,'Australia')
  
  assert.equal(artistFst.name, 'AC/DC');

  assert.equal(artistFst.country, 'Australia');
  assert.equal(artistFst.id,0);
});

});  


function updateArtistName(unqfy,id , artistName) {
  const artist = unqfy.updateArtistName(id, artistName);
  return artist;
}

function updateArtistNationality(unqfy,id ,country) {
  const artist = unqfy.updateArtistNationality(id, country);
  return artist;
}

function createAndAddArtist(unqfy, artistName, country) {
    const artist = unqfy.addArtist({ name: artistName, country: country });
    return artist;
  }
  
function getArtistFrom(unqfy,id){
    return unqfy.getArtistById(id);
  }

