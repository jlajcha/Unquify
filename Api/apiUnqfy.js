const {getUNQfy, saveUNQfy} = require('../persistenceUNQfy');
const express = require('express');

const { NoExistPlayListException,
    NoExistTrackException,
    ExistArtistException,
    NoExistArtistException,
    ExistAlbumOfArtist,
    NoExistAlbumException,
    NoExistUserException,
    MissingArguments
 } = require('../exceptions.js');

const artists = express.Router();
const tracks = express.Router();
const playlists = express.Router();
const albums = express.Router();
const users = express.Router();
const noRoute = express.Router();

//endpoints artists
artists.route('/artists')
.post((req, res) => {
    const unqfy = getUNQfy();
    const data = req.body;
    let artistRes;
        if(data.name === undefined || data.country === undefined){
            const err = new BadRequestException();
            errorHandler(err, req, res);
            return;
        }
        try{
            artistRes = unqfy.addArtist(data);
        }catch(err){
            errorHandler(err, req, res);
            return;
        }
    saveUNQfy(unqfy);
    res.status(201);
    res.json(artistRes.toJSON());
})
.get((req, res) =>{
    const unqfy = getUNQfy();
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
    const unqfy = getUNQfy();
    const artistId = parseInt(req.params.artistId);
    let searchArtist;
    try{
        searchArtist = unqfy.getArtistById(artistId);
    }catch(err){
        errorHandler(err, req, res);
        return;
    }    

    res.status(200);
    res.json(
        searchArtist.toJSON()
    );
})
.put((req, res) => {
    const unqfy = getUNQfy();
    const data = req.body;
    const artistId = parseInt(req.params.artistId);
    let artistRes;
        if(data.name === undefined || data.country === undefined){
            const err = new BadRequestException();
            errorHandler(err, req, res);
            return;
        }
        try{
            unqfy.updateArtistName(artistId, data.name);
            unqfy.updateArtistNationality(artistId, data.country);
            artistRes = unqfy.getArtistById(artistId);
        }catch(err){
            errorHandler(err, req, res);
            return;
        }
    saveUNQfy(unqfy);
    res.status(200);
    res.json(artistRes.toJSON());
})
.delete((req, res) => {
    const unqfy = getUNQfy();
    const artistId = parseInt(req.params.artistId);
    try{
        unqfy.deleteArtistWithId(artistId);
    }catch(err){
        errorHandler(err, req, res);
        return;
    }    

    saveUNQfy(unqfy);
    res.status(204);
    res.send({success: 'true'});
})

//endpoints albums
albums.route('/albums')
.post((req, res) => {
    const unqfy = getUNQfy();
    const data = req.body;
    let albumRes;
        if(data.artistId === undefined || data.name === undefined || data.year === undefined){
            const err = new BadRequestException();
            errorHandler(err, req, res);
            return;
        }
        try{
            albumRes = unqfy.addAlbum(data.artistId, data);
        }catch(err){
            if(err instanceof ExistAlbumOfArtist){
                errorHandler(err, req, res);
            }else{
                const err = new ResourceNotFoundException();
                errorHandler(err, req, res);
            }
            return;
        }
    saveUNQfy(unqfy);
    res.status(201);
    res.json(albumRes.toJSON());
})
.get((req, res) =>{
    const unqfy = getUNQfy();
    let name = req.query.name;
    if(name === undefined){
        name = "";
    }
    const artistsSearch = unqfy.searchAlbumsByName(name);

    res.status(200);
    res.json(artistsSearch.map(artist => artist.toJSON()));    
});

albums.route('/albums/:albumId')
.get((req, res) => {
    const unqfy = getUNQfy();
    const albumId = parseInt(req.params.albumId);
    let searchAlbum;
    try{
        searchAlbum = unqfy.getAlbumById(albumId);
    }catch(err){
        errorHandler(err, req, res);
        return;
    }    

    res.status(200);
    res.json(
        searchAlbum.toJSON()
    );
})
.patch((req, res) => {
    const unqfy = getUNQfy();
    const data = req.body;
    const albumId = parseInt(req.params.albumId);
    let albumRes;
        if(data.year === undefined){
            const err = new BadRequestException();
            errorHandler(err, req, res);
            return;
        }
        try{
            albumRes = unqfy.getAlbumById(albumId);
            unqfy.updateAlbumYear(albumId, data.year);            
        }catch(err){
            errorHandler(err, req, res);
            return;
        }
    albumRes = unqfy.getAlbumById(albumId);        
    saveUNQfy(unqfy);
    res.status(200);
    res.json(albumRes.toJSON());
})
.delete((req, res) => {
    const unqfy = getUNQfy();
    const albumId = parseInt(req.params.albumId);

    try{
        unqfy.getAlbumById(albumId);
        unqfy.deleteAlbumWithId(albumId);
    }catch(err){
        errorHandler(err, req, res);
        return;
    }    

    saveUNQfy(unqfy);
    res.status(204);
    res.send({success: 'true'});
});

//endpoints users
users.route('/users/:userId')
.get((req, res) => {
    const unqfy = getUNQfy();
    const userId = parseInt(req.params.userId);
    let userRes;
    try{
        userRes = unqfy.getUserById(userId);
    }catch(err){
        errorHandler(err, req, res);
        return;
    }

    res.status(200);
    res.json(userRes.toJSON());
})
.patch((req, res) => {
    const unqfy = getUNQfy();
    const data = req.body;
    const userId = parseInt(req.params.userId);
    let userRes;
        if(data.name === undefined){
            const err = new BadRequestException();
            errorHandler(err, req, res);
            return;
        }
        try{
            unqfy.updateUserName(userId, data.name);
            userRes = unqfy.getUserById(userId);
        }catch(err){
            errorHandler(err, req, res);
            return;
        }
    saveUNQfy(unqfy);
    res.status(200);
    res.json(userRes.toJSON());
})
.delete((req, res) =>{
    const unqfy = getUNQfy();
    const userId = parseInt(req.params.userId);
    try{
        unqfy.deleteUserWithId(userId);
    }catch(err){
        errorHandler(err, req, res);
        return;
    }    

    saveUNQfy(unqfy);
    res.status(204);
    res.send({success: 'true'});
});

users.route('/users')
.post((req, res) => {
    const unqfy = getUNQfy();
    const data = req.body;
        if(data.name === undefined){
            const err = new BadRequestException();
            errorHandler(err, req, res);
            return;
        }           
        
    const userRes = unqfy.addUser(data.name);
    saveUNQfy(unqfy);
    res.status(201);
    res.json(userRes.toJSON());
});

users.route('/users/:userId/listenings')
.get((req, res) => {
    const unqfy = getUNQfy();
    const userId = parseInt(req.params.userId);
    let tracksRes;
    try{
        tracksRes = unqfy.getTracksListenByUser(userId);
    }catch(err){
        errorHandler(err, req, res);
        return;
    }

    res.status(200);
    res.send(tracksRes.map(track => track.toJSON()));
})
.post((req, res) => {
    const unqfy = getUNQfy();
    const userId = parseInt(req.params.userId);
    const data = req.body;

    let tracksRes;
    if(data.trackId === undefined){
        const err = new BadRequestException();
            errorHandler(err, req, res);
            return;
    }
    try{
        tracksRes = unqfy.userListenTrack(userId, parseInt(data.trackId));
    }catch(err){
        errorHandler(err, req, res);
        return;
    }
    
    saveUNQfy(unqfy);
    res.status(201);
    res.json({success: 'true'});
});

tracks.get('/tracks',
(req, res) =>{
    
    const unqfy = getUNQfy();
    const searchTracks = unqfy.allTracksOnApp();
    
    res.status(200);
    res.json(searchTracks.map(track => track.toJSON()));
           
});

tracks.get('/tracks/:trackId',
(req, res) =>{
    
    const trackId = parseInt(req.params.trackId);
    const unqfy = getUNQfy();
    let searchTrack;
    try{
        searchTrack = unqfy.getTrackById(trackId);
    }catch(err){
        errorHandler(err, req, res);
        return;
    }    
    
    res.status(200);
    res.json(
        searchTrack.toJSON()
    );           
});

tracks.get('/tracks/:trackId/lyrics',
(req, res) =>{
    const unqfy = getUNQfy();
    const trackId = parseInt(req.params.trackId);
    try {const searchTrack = unqfy.getLyrics(trackId);   
    res.status(200);
    res.json(searchTrack);
    }    
    catch(err){
        errorHandler(err, req, res);
        return;
    }           
});

playlists.route('/playlists')
    .get((req, res) => {
        const unqfy = getUNQfy();
        const name = req.query.name;
        const durationLT = req.query.durationLT;
        const durationGT = req.query.durationGT;
      try {
        const playlists = filterAccordingTo(unqfy,name,durationLT,durationGT);
        res.status(200);
        res.json(playlists);
        }catch (err) {
            errorHandler(err, req, res);
            return;  
        }              
});

playlists.get('/playlists/:playlistId',
(req, res) =>{
    const trackId = parseInt(req.params.playlistId);
    const unqfy = getUNQfy('data.json');
    try {
        const searchPlaylist = unqfy.getPlaylistById(trackId);
        res.status(200);
        res.json(
        searchPlaylist
        );}
    catch(err){
        errorHandler(err, req, res);
        return;            
    }         
});

playlists.post('/playlists',
(req, res) =>{
    const unqfy = getUNQfy('data.json');
    const body = req.body;

    try{
        createNewPlaylist(req, unqfy, res);
    }
    catch(err){        
        if (req.body.name === undefined|| req.body.name ===""||req.body.duration===undefined
            ||req.body.duration===""
            || req.body.listGenres.length ===0) {
                const err = new BadRequestException();
                errorHandler(err, req, res);
                return;           
           }
        }
    });

playlists.delete('/playlists/:playlistId',
(req, res) =>{
    const unqfy = getUNQfy('data.json');
    const playlistId = req.params.playlistId;
     try { 
         unqfy.deletePlaylist(playlistId);
                saveUNQfy(unqfy);
                res.status(204);
                res.json({ status: 204 } );      
    }
    catch(err){
        errorHandler(err, req, res);
        return;
    }
});
  
noRoute.route('*')
.get((req, res) =>{
    const err = new InvalidRouteException();
    errorHandler(err, req, res);
    return;
})
.delete((req, res) =>{
    const err = new InvalidRouteException();
    errorHandler(err, req, res);
    return;
})
.post((req, res) =>{
    const err = new InvalidRouteException();
    errorHandler(err, req, res);
    return;
})
.patch((req, res) =>{
    const err = new InvalidRouteException();
    errorHandler(err, req, res);
    return;
});

function errorHandler(err, req, res){
    switch(true){
        case(err instanceof NoExistArtistException ||
            err instanceof NoExistAlbumException ||
            err instanceof NoExistPlayListException ||
            err instanceof NoExistUserException ||
            err instanceof NoExistTrackException ||
            err instanceof MissingArguments ||
            err instanceof NoExistPlayListException ||
            err instanceof InvalidRouteException):
        res.status(404);
        res.json({
            status: 404,
            errorCode: "RESOURCE_NOT_FOUND"
        });
        break;
        case(err instanceof ResourceNotFoundException):
        res.status(err.status);
        res.json({
            status: err.status,
            errorCode: err.errorCode
        });
        break;
        case(err instanceof ExistAlbumOfArtist ||
            err instanceof ExistArtistException):
            res.status(409);
            res.json({
                status: 409,
                errorCode: "RESOURCE_ALREADY_EXISTS"
            });
        break;
        case(err instanceof BadRequestException):
        res.status(err.status);
        res.json({
            status: err.status,
            errorCode: err.errorCode
        });
        break;
        default :
        res.status(500);
        res.json({
            status: 500,
            errorCode: "INTERNAL_SERVER_ERROR"
        });
    }
}

class ApiException extends Error{
    constructor(name, statusCode, errorCode, message = null){
        super(message || name);
        this.name = name;
        this.status = statusCode;
        this.errorCode = errorCode;
    }
}

class InvalidRouteException extends ApiException{
    constructor(){
        super('InvalidRouteException', 404, 'RESOURCE_NOT_FOUND');
    }
}

class BadRequestException extends ApiException{
    constructor(){
        super('BadRequestException', 400, 'BAD_REQUEST');
    }
}

class ResourceNotFoundException extends ApiException{
    constructor(){
        super('ResourceNotFoundException', 404, 'RELATED_RESOURCE_NOT_FOUND');
    }
}

module.exports = {
    artists, tracks,playlists,albums,users,errorHandler,noRoute,BadRequestException
};  


function filterAccordingTo(unquify,name,minDuration,maxDuration){
    if(name===undefined&&minDuration===undefined&&maxDuration===undefined){
        throw MissingArguments; 
    }
    else{const playlistsFound = unquify.searchCustomPlaylist(name,minDuration,maxDuration);
        if(playlistsFound.length===0){
            throw NoExistPlayListException;
        }else{return playlistsFound[0]; }
        
   }
}

function createNewPlaylist(req, unqfy, res) {
    if(req.body.tracks !==undefined ){
        
        const name = req.body.name;
        const dataTracks = req.body.tracks; 
        const tracks = dataTracks.map((track)=> unqfy.getTrackById(track.id) );
        const newPlaylist = unqfy.createPlaylistWithTracksRelated(name,tracks );    
            
        saveUNQfy(unqfy);
        res.status(201);
        res.json(newPlaylist);

    }else{
        const name = req.body.name;
        const duration = req.body.maxDuration;
        const genres = req.body.genres;
        const newPlaylist = unqfy.createPlaylist(name, genres, duration);
            
        saveUNQfy(unqfy);
        res.status(201);
        res.json(newPlaylist);}
}
  
