const rp = require('request-promise');

const BASE_URL = 'http://api.musixmatch.com/ws/1.1';


class MusixMatchManager{

    constructor(){
        
        this._authorizationToken = 'e628abb5a54c83628dc85f1784a07174';
    }    
    
getArtists(artistName){
    let options = {
        uri: BASE_URL + '/artist.search',
        qs: {
            apikey:  this._authorizationToken,
            q_artist: artistName,
            //q_artist: 'What Do You Want from Me'
         },
        json: true // Automatically parses the JSON string in the response
        };
  
    rp.get(
    options
    ).then((response) => {
    let header = response.message.header;
    let body = response.message.body;
    if (header.status_code !== 200){
       throw new Error('status code != 200');
   }

   let artistNames = body.artist_list.map((artist => artist.artist.artist_name));
 
}).catch((error) => {
   console.log('algo salio mal', error);
});
}

getLyrics(unquify,aTrack){
    let options = {
        uri: BASE_URL + '/track.search',
        qs: {
            apikey:  this._authorizationToken,
            q_track: aTrack.name,
          //  q_track: 'Let It Be'
            
         },
        json: true // Automatically parses the JSON string in the response
        };
  //primero buscar por el nombre el el track en la api

  if(aTrack.lyrics === '' || aTrack._lyrics === undefined || aTrack.lyrics === ""){
    rp.get( options )
        .then((response) => {
                let header = response.message.header;
                let body = response.message.body;
                if (header.status_code !== 200){
                throw new Error('status code != 200');
            }
                 return body.track_list[0].track.track_id

            }).then((trackIDFound)=>{
                let lyrics_options = {
                    uri: BASE_URL + '/track.lyrics.get',
                    qs: {
                        apikey:  this._authorizationToken,
                        track_id: trackIDFound
                    },
                    json: true // Automatically parses the JSON string in the response
                    };
                rp.get( lyrics_options).then((lyric)=>{
                        
                        const newLyric = lyric.message.body.lyrics.lyrics_body;
                        unquify.updateTrackLyrics(aTrack.id,newLyric);
                        const trackupdated = unquify.getTrackById(aTrack.id);
                        unquify.save('data.json')
                        
                        return this.trackData(trackupdated,trackupdated.lyrics);  

                    }).catch((err)=> {
                        const dataEmpty = this.trackData(aTrack,"No se encuentra la Lyric en MusixMatch");
                        unquify.updateTrackLyrics(aTrack.id,dataEmpty.lyrics);
                        unquify.save('data.json');
                    return dataEmpty;
                    }) 
                })
        }
else{ 
    return this.trackData(aTrack,aTrack.lyrics);
      }
}

trackData(aTrack,aLyrics){ 
        
        return {name: aTrack.name , lyrics: aLyrics} }
}

module.exports = MusixMatchManager;
