const rp = require('request-promise');

const BASE_URL = 'http://api.musixmatch.com/ws/1.1';


class MusixMatchManager{

    constructor(){
        
        this._authorizationToken = 'e628abb5a54c83628dc85f1784a07174';
    }    
    
getArtists(artistName){
    var options = {
        uri: BASE_URL + '/artist.search',
        qs: {
            apikey:  this._authorizationToken,
            q_artist: artistName,
         },
        json: true // Automatically parses the JSON string in the response
        };
  
    rp.get(
    options
    ).then((response) => {
    var header = response.message.header;
    var body = response.message.body;
    if (header.status_code !== 200){
       throw new Error('status code != 200');
   }

   var artistNames = body.artist_list.map((artist => artist.artist.artist_name));
   console.log(`Se econtraron ${artistNames.length} artistas`);
   console.log(artistNames);
}).catch((error) => {
   console.log('algo salio mal', error);
});
}

getLyrics(unquify,aTrack){
    var options = {
        uri: BASE_URL + '/track.search',
        qs: {
            apikey:  this._authorizationToken,
            q_track: aTrack.name,
         },
        json: true // Automatically parses the JSON string in the response
        };
  //primero buscar por el nombre el el track en la api
    rp.get(
    options
    ).then((response) => {
    var header = response.message.header;
    var body = response.message.body;
    if (header.status_code !== 200){
       throw new Error('status code != 200');
   }
   //no estoy segura que le puedo preguntar a lo que me devuelve
   console.log(body.track_list[0])
    return body.track_list[0].track_id

//buscar por id  el track para pedirle la lyrics 
}).then((lyrics_id)=>{
    var lyrics_options = {
        uri: BASE_URL + '/track.lyrics.get',
        qs: {
            apikey:  this._authorizationToken,
            track_id: lyrics_id,
         },
        json: true // Automatically parses the JSON string in the response
        };
        rp.get( lyrics_options).then((lyric)=>{
            unquify.updateTrackLyrics(aTrack.id,lyric)

        })       

})
.catch((error) => {
   console.log('algo salio mal', error);
});
}


}

module.exports = MusixMatchManager;
