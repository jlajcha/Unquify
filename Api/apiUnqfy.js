const {getUNQfy, saveUNQfy} = require('../persistenceUNQfy');
const express = require('express');

const artists = express.Router();

const unqfy1 = getUNQfy();

artists.get('/artists',
(req, res) =>{
    let name = req.query.name;
    if(name === undefined){
        name = "";
    }
    const unqfy = getUNQfy();
    const artistsSearch = unqfy1.searchArtistsByName(name);
    
    res.status(200);
    res.json(artistsSearch.map(artist => artist.toJSON()));
        // artistsSearch.map(artist => artist.toJSON())
    
})

artists.route('/artists/:artistId')
.get((req, res) => {
    const artistId = parseInt(req.params.artistId);
    const unqfy = getUNQfy();
    const searchArtist = unqfy.getArtistById(artistId);

    res.status(200);
    res.json(
        searchArtist.toJSON()
    );
})

module.exports = {
    artists
};