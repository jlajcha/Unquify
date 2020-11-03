const {getUNQfy, saveUNQfy} = require('../persistenceUNQfy');
const express = require('express');


const { NoExistPlayListException,
    NoExistTrackException,
    ExistArtistException,
    NoExistArtistException,
    ExistAlbumOfArtist,
    NoExistAlbumException,
    NoExistUserException
 } = require('../exceptions.js');
// const unqfy = require('../unqfy');

const artists = express.Router();
const tracks = express.Router();
const playlists = express.Router();
const albums = express.Router();
const users = express.Router();

let unqfy = getUNQfy();


//endpoints artists
artists.route('/artists')
.post((req, res) => {
        const data = req.body;
        let artistRes;
        if(data.name === undefined || data.country === undefined){
            res.status(400);
            res.json({
                status: 400,
                errorCode: "BAD_REQUEST"
            });
            return;
        }
        try{
            artistRes = unqfy.addArtist(data);
        }catch(err){
            if(err instanceof ExistArtistException){
                res.status(409);
                res.json({
                    status: 409,
                    errorCode: "RESOURCE_ALREADY_EXISTS"
                });
            }
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
});

artists.route('/artists/:artistId')
.get((req, res) => {
    const artistId = parseInt(req.params.artistId);
    let searchArtist;
    try{
        searchArtist = unqfy.getArtistById(artistId);
    }catch(err){
        if(err instanceof NoExistArtistException){
            res.status(404);
            res.json({
                status: 404,
                errorCode: "RESOURCE_NOT_FOUND"
            });
        }
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
            res.status(400);
            res.json({
                status: 400,
                errorCode: "BAD_REQUEST"
            });
            return;
        }
        try{
            unqfy.updateArtistName(artistId, data.name);
            unqfy.updateArtistNationality(artistId, data.country);
            artistRes = unqfy.getArtistById(artistId);
        }catch(err){
            if(err instanceof NoExistArtistException){
                res.status(404);
                res.json({
                    status: 404,
                    errorCode: "RESOURCE_NOT_FOUND"
                });
            }
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
});

//endpoints albums
albums.route('/albums')
.post((req, res) => {
        const data = req.body;
        let albumRes;
        if(data.artistId === undefined || data.name === undefined || data.year === undefined){
            res.status(400);
            res.json({
                status: 400,
                errorCode: "BAD_REQUEST"
            });
            return;
        }
        try{
            albumRes = unqfy.addAlbum(data.artistId, data);
            console.log("album", albumRes);
        }catch(err){
            if(err instanceof ExistAlbumOfArtist){
                res.status(409);
                res.json({
                    status: 409,
                    errorCode: "RESOURCE_ALREADY_EXISTS"
                });
            }
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
        if(err instanceof NoExistAlbumException){
            res.status(404);
            res.json({
                status: 404,
                errorCode: "RESOURCE_NOT_FOUND"
            });
        }
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
            res.status(400);
            res.json({
                status: 400,
                errorCode: "BAD_REQUEST"
            });
            return;
        }
        try{
            unqfy.updateAlbumYear(albumId, data.year);
            albumRes = unqfy.getAlbumById(albumId);
        }catch(err){
            if(err instanceof NoExistAlbumException){
                res.status(404);
                res.json({
                    status: 404,
                    errorCode: "RESOURCE_NOT_FOUND"
                });
            }
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
        if(err instanceof NoExistUserException){
            res.status(404);
            res.json({
                status: 404,
                errorCode: "RESOURCE_NOT_FOUND"
            });
        }
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
            res.status(400);
            res.json({
                status: 400,
                errorCode: "BAD_REQUEST"
            });
            return;
        }
        try{
            unqfy.updateUserName(userId, data.name);
            userRes = unqfy.getUserById(userId);
        }catch(err){
            if(err instanceof NoExistUserException){
                res.status(404);
                res.json({
                    status: 404,
                    errorCode: "RESOURCE_NOT_FOUND"
                });
            }
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
        if(data.name === undefined){
            res.status(400);
            res.json({
                status: 400,
                errorCode: "BAD_REQUEST"
            });
            return;
        }
    const userRes = unqfy.addUser(data.name);
    saveUNQfy(unqfy);
    unqfy = getUNQfy();
    res.status(201);
    res.json(userRes.toJSON());
})


tracks.get('/tracks',
(req, res) =>{
    
    const unqfy = getUNQfy();
    const searchTracks = unqfy.allTracksOnApp();
    
    res.status(200);
    res.json(searchTracks.map(track => track.toJSON()));
           
})

tracks.get('/tracks/:trackId',
(req, res) =>{
    
    const trackId = parseInt(req.params.trackId);
    const unqfy = getUNQfy();
    const searchTrack = unqfy.getTrackById(trackId);
    
    res.status(200);
    res.json(
        searchTrack.toJSON()
    );
           
})


tracks.get('/tracks/:trackId/lyric',
(req, res) =>{
    
    const trackId = parseInt(req.params.trackId);
    const unqfy = getUNQfy('data.json');
    try {const searchTrack = unqfy.getLyrics(trackId);
   
    res.status(200);
    res.json(searchTrack);
    }    
    catch(err){
            if (err instanceof NoExistTrackException) {
                res.status(404);
                res.json({status: 404, errorCode: "RESOURCE_NOT_FOUND" })
               }           
            }         
        })

playlists.get('/playlists/:playlistId',
(req, res) =>{
    const trackId = parseInt(req.params.playlistId);
    const unqfy = getUNQfy('data.json');
    try {const searchPlaylist = unqfy.getPlaylistById(trackId);
        console.log(JSON.stringify(searchPlaylist))
        res.status(200);
        res.json(
            searchPlaylist
        );}
    catch(err){
        if (err instanceof NoExistPlayListException) {
            res.status(404);
            res.json({status: 404, errorCode: "RESOURCE_NOT_FOUND" });
           }           
    }         
})

playlists.post('/playlists',
(req, res) =>{
    // const unqfy = getUNQfy();
    const body = req.body

    try{createNewPlaylist(req, unqfy, res);
        
         }
    catch(err){
        
        if (req.body.name == undefined|| req.body.name ===""||req.body.duration===undefined
            ||req.body.duration===""
            || req.body.listGenres.length ===0) {
            res.status(400);
            res.json({status: 400, errorCode: "BAD_REQUEST" })             
           }
        }
    });

//DELETE /api/playlists/<id>

playlists.delete('/playlists/:playlistId',
(req, res) =>{
    //const unqfy2 = getUNQfy('data.json');
    const playlistId = req.params.playlistId;

     try { unqfy.deletePlaylist(playlistId);
                 res.status(204);
                 res.json({ status: 204 } );      
            }
    catch(err){ if (err instanceof NoExistPlayListException){
                res.status(404);
                res.json({ status: 404, errorCode: "RESOURCE_NOT_FOUND"  } )       
                }
            }
    });
  

module.exports = {
    artists, tracks,playlists,albums,users
};  


function createNewPlaylist(req, unqfy, res) {
    if(req.body.tracks !=undefined ){
        
        const name = req.body.name;
        const dataTracks = req.body.tracks 
        const tracks = dataTracks.map((track)=> unqfy.getTrackById(track.id) )
        const newPlaylist = unqfy.createPlaylistWithTracksRelated(name,tracks );    
        res.status(201);
        res.json(newPlaylist);

    }else{
        const name = req.body.name;
        const duration = req.body.maxDuration;
        const genres = req.body.genres;
        const newPlaylist = unqfy.createPlaylist(name, genres, duration);
        res.status(201);
        res.json(newPlaylist);
    }
}
  
