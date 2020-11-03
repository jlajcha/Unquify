const {getUNQfy, saveUNQfy} = require('../persistenceUNQfy');
const express = require('express');

const artists = express.Router();
const albums = express.Router();
const users = express.Router();

let unqfy = getUNQfy();


//endpoints artists
artists.route('/artists')
.post((req, res) => {
        const data = req.body;
        let artistRes;
        if(data.name === undefined || data.country === undefined){
            //hacer exception handler
            return;
        }
        try{
            artistRes = unqfy.addArtist(data);
        }catch(err){
            //hacer exception handler
            return;
        }
    saveUNQfy(unqfy);
    unqfy = getUNQfy();
    res.status(201);
    res.json(artistRes.toJSON());
})
.get((req, res) =>{
    let name = req.query.name;
    if(name === undefined){
        name = "";
    }
    const artistsSearch = unqfy.searchArtistsByName(name);

    res.status(200);
    res.json(artistsSearch.map(artist => artist.toJSON()));    
})

artists.route('/artists/:artistId')
.get((req, res) => {
    const artistId = parseInt(req.params.artistId);
    let searchArtist;
    try{
        searchArtist = unqfy.getArtistById(artistId);
    }catch(err){
        //hacer exception handler
        return;
    }    

    res.status(200);
    res.json(
        searchArtist.toJSON()
    );
})
.patch((req, res) => {
    const data = req.body;
    const artistId = parseInt(req.params.artistId);
    let artistRes;
        if(data.name === undefined || data.country === undefined){
            //hacer exception handler
            return;
        }
        try{
            unqfy.updateArtistName(artistId, data.name);
            unqfy.updateArtistNationality(artistId, data.country);
            artistRes = unqfy.getArtistById(artistId);
        }catch(err){
            //hacer exception handler
            return;
        }
    saveUNQfy(unqfy);
    unqfy = getUNQfy();
    res.status(200);
    res.json(artistRes.toJSON());
})
.delete((req, res) => {
    const artistId = parseInt(req.params.artistId);
    unqfy.deleteArtistWithId(artistId);

    saveUNQfy(unqfy);
    unqfy = getUNQfy();
    res.status(204);
    res.send({success: 'true'});
})

//endpoints albums
albums.route('/albums')
.post((req, res) => {
        const data = req.body;
        let albumRes;
        if(data.artistId === undefined || data.name === undefined || data.year === undefined){
            //hacer exception handler
            return;
        }
        try{
            albumRes = unqfy.addAlbum(data.artistId, data);
        }catch(err){
            //hacer exception handler
            return;
        }
    saveUNQfy(unqfy);
    unqfy = getUNQfy();
    res.status(201);
    res.json(albumRes.toJSON());
})
.get((req, res) =>{
    let name = req.query.name;
    if(name === undefined){
        name = "";
    }
    const artistsSearch = unqfy.searchAlbumsByName(name);

    res.status(200);
    res.json(artistsSearch.map(artist => artist.toJSON()));    
})

albums.route('/albums/:albumId')
.get((req, res) => {
    const albumId = parseInt(req.params.albumId);
    let searchAlbum;
    try{
        searchAlbum = unqfy.getAlbumById(albumId);
    }catch(err){
        //hacer exception handler
        return;
    }    

    res.status(200);
    res.json(
        searchAlbum.toJSON()
    );
})
.patch((req, res) => {
    const data = req.body;
    const albumId = parseInt(req.params.albumId);
    let albumRes;
        if(data.year === undefined){
            //hacer exception handler
            return;
        }
        try{
            unqfy.updateAlbumYear(albumId, data.year);
            albumRes = unqfy.getAlbumById(albumId);
        }catch(err){
            //hacer exception handler
            return;
        }
    saveUNQfy(unqfy);
    unqfy = getUNQfy();
    res.status(200);
    res.json(albumRes.toJSON());
})
.delete((req, res) => {
    const albumId = parseInt(req.params.albumId);
    unqfy.deleteAlbumWithId(albumId);

    saveUNQfy(unqfy);
    unqfy = getUNQfy();
    res.status(204);
    res.send({success: 'true'});
})

//endpoints users
users.route('/users/:userId')
.get((req, res) => {
    const userId = parseInt(req.params.userId);
    let userRes;
    try{
        userRes = unqfy.getUserById(userId);
    }catch(err){
        //hacer exception handler
        return;
    }

    res.status(200);
    res.json(userRes.toJSON());
})
.patch((req, res) => {
    const data = req.body;
    const userId = parseInt(req.params.userId);
    let userRes;
        if(data.name === undefined){
            //hacer exception handler
            return;
        }
        try{
            unqfy.updateUserName(userId, data.name);
            userRes = unqfy.getUserById(userId);
        }catch(err){
            //hacer exception handler
            return;
        }
    saveUNQfy(unqfy);
    unqfy = getUNQfy();
    res.status(200);
    res.json(userRes.toJSON());
})
.delete((req, res) =>{
    const userId = parseInt(req.params.userId);
    unqfy.deleteUserWithId(userId);

    saveUNQfy(unqfy);
    unqfy = getUNQfy();
    res.status(204);
    res.send({success: 'true'});
})

users.route('/users')
.post((req, res) => {
    const data = req.body;
    let userRes;
        if(data.name === undefined){
            //hacer exception handler
            return;
        }
        try{
            userRes = unqfy.addUser(data.name);
        }catch(err){
            //hacer exception handler
            return;
        }
    saveUNQfy(unqfy);
    unqfy = getUNQfy();
    res.status(201);
    res.json(userRes.toJSON());
})


module.exports = {
    artists,
    albums,
    users
};