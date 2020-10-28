const {getUNQfy, saveUNQfy} = require('../persistenceUNQfy');
const express = require('express');

const artists = express.Router();

const unqfy = getUNQfy();

artists.route('/artists')
.get((req, res) =>{
    let name = req.query.name;
    if(name === undefined){
        name = "";
    }
    const artistsSearch = unqfy.searchArtistsByName(name);

    res.status(200);
    res.json(
        artistsSearch.map(artist => artist.toJSON())
    );
})

artists.route('/artists/:artistId')
.get((req, res) => {
    const artistId = parseInt(req.params.artistId);
    const searchArtist = unqfy.getArtistById(artistId);

    res.status(200);
    res.json(
        searchArtist.toJSON()
    );
})

module.exports = {
    artists
};