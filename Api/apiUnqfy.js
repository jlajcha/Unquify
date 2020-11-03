const {getUNQfy, saveUNQfy} = require('../persistenceUNQfy');
const express = require('express');


const { NoExistPlayListException,NoExistTrackException } = require('../exceptions.js');
const unqfy = require('../unqfy');

const artists = express.Router();
const tracks = express.Router();
const playlists = express.Router();
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
    res.json(searchTrack)
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
            res.json({status: 404, errorCode: "RESOURCE_NOT_FOUND" })
           }           
    }         
})

playlists.post('/playlists',
(req, res) =>{
    const unqfy = getUNQfy('data.json');
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
    const playlistId = req.params.playlistId

     try { unqfy1.deletePlaylist(playlistId)
                 res.status(201);
                 res.json({ status: 201 } )      
            }
    catch(err){ if (err instanceof NoExistPlayListException){
                res.status(404);
                res.json({ status: 404, errorCode: "RESOURCE_NOT_FOUND"  } )       
                }
            }
    });
  

module.exports = {
    artists, tracks,playlists
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
        res.json(newPlaylist.toJSON);}
}
