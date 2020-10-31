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
            //q_track: aTrack.name,
            q_track:'Stairway to heaven'
         },
        json: true // Automatically parses the JSON string in the response
        };
  //primero buscar por el nombre el el track en la api
    rp.get( options )
        .then((response) => {
                var header = response.message.header;
                var body = response.message.body;
                if (header.status_code !== 200){
                throw new Error('status code != 200');
            }
        const trackIDFound = body.track_list[0].track.track_id
        
        console.log("a ver que le devuelve el primer get " + JSON.stringify(trackIDFound))
    
            console.log()
            var lyrics_options = {
                uri: BASE_URL + '/track.lyrics.get',
                qs: {
                    apikey:  this._authorizationToken,
                    track_id: trackIDFound
                },
                json: true // Automatically parses the JSON string in the response
                };
            rp.get( lyrics_options).then((lyric)=>{
                    console.log("la cancion encontrada  " )
                    console.log( JSON.stringify(lyric.message.body.lyrics.lyrics_body))
                    const newLyric = lyric.message.body.lyrics.lyrics_body
                    unquify.updateTrackLyrics(aTrack.id,newLyric)

                })       
      //      }
        //    else{
              //  unquify.updateTrackLyrics(aTrack._id,"tu vieja a que ver pasa")
          //  }
    const trackupdated = unquify.getTrackById(aTrack.id)
    console.log("el nuevo updatedeado es : " + JSON.stringify(trackupdated) )
    return trackupdated
//buscar por id  el track para pedirle la lyrics 
})
.catch((error) => {
   console.log('algo salio mal', error);
});
}


}

module.exports = MusixMatchManager;
