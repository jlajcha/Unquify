const PlayList = require('./playlist.js');

class PlayListGenerator{


    createPlayList(unqfy, id, name, genresToInclude, maxDuration){
        const tracksWithGenres = unqfy.getTracksMatchingGenres(genresToInclude);
        console.log(tracksWithGenres);
        const tracks = [];
        let durationOfPlayList = 0;
        let preAdd = 0;
        for(let i = 0; i < tracksWithGenres.length; i++){
            const trackWithGenres = tracksWithGenres[i];
            const durationTrack = trackWithGenres.duration;
            preAdd=durationOfPlayList;
            durationOfPlayList += durationTrack;
            if(durationOfPlayList <= maxDuration){
                tracks.push(trackWithGenres);
            }
            else{
                durationOfPlayList=preAdd;
            }
        }

        const newPlayList = new PlayList(id, name, maxDuration, tracks);
        return newPlayList;
    }

}

module.exports = PlayListGenerator;