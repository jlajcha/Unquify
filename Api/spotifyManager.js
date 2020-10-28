const spotifyCreds = require('./spotifyCreds.json');
const CLIENT_ID = 'd38a0113ad3e429c9dbfe4ed483a2874'; // Your client id
const CLIENT_SECRET = 'a9176cac20db4393877e6a0ffb99bff3'; // Your secret
const Printer = require('../printer');
const printer = new Printer();
const { NoFindArtistException} = require('../exceptions');
const requestPromise = require('request-promise');

class SpotifyManager {
    constructor(){
        
        this._authorizationToken = spotifyCreds.access_token;
    }    

    refreshToken(_refreshToken){
        const refreshOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: { Authorization: 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')) },
            form: {
              grant_type: 'refresh_token',
              refresh_token: _refreshToken
            },
            json: true
          };
          return requestPromise.post(refreshOptions);
    }

    populateAlbumsForArtist(unqfy, artist){
        this.refreshToken(spotifyCreds.refresh_token)
            .then(newToken => {
                this._authorizationToken = newToken.access_token;
                return this.searchArtistByName(artist.name);
            }).then(responseToSearchArtist => this.existArtist(responseToSearchArtist, artist.name))
            .then(artistId => this.searchArtistAlbum(artistId))
            .then(responseAlbums => this.mapAlbums(responseAlbums))
            .then(albumsData => this.chargeAlbumsToArtistInUnqfy(unqfy, artist, albumsData))
            .catch(exception => printer.printException(exception));
    }

    searchArtistByName(artistName){
        const searchOptions = {
            url: 'https://api.spotify.com/v1/search',
            qs: {
                q: artistName,
                type: 'artist'
            },
            headers: { Authorization: 'Bearer ' + this._authorizationToken},
            json: true,
        };
        return requestPromise.get(searchOptions);
    }

    existArtist(artistResponse, artistName){
        if(artistResponse.artists.total === 0){
            throw new NoFindArtistException(artistName);
        }
        return artistResponse.artists.items[0].id;
    }

    searchArtistAlbum(artistId){
        const searchOptions = {
            url: 'https://api.spotify.com/v1/artists/' + artistId + '/albums',
            headers: {
                Authorization: 'Bearer ' + this._authorizationToken,
                include_groups: 'album'
            },
            json: true
        };
        return requestPromise.get(searchOptions);
    }

    mapAlbums(albumsResponse){
        const albums = albumsResponse.items;
        const albumsData = albums.map(album => { 
            return { name: album.name, year: album.release_date.slice(0, 4) }
        });
        const albumsSinRepetidos = [];
        albumsData.forEach(album => {
            if(albumsSinRepetidos.every(albumSinRep => albumSinRep.name !== album.name)){
                albumsSinRepetidos.push(album);
            }
        });

        return albumsSinRepetidos;
    }

    chargeAlbumsToArtistInUnqfy(unqfy, artist, albumsData){
        albumsData.forEach(albumData => unqfy.addAlbum(artist.id, albumData));
        unqfy.save('data.json');
        printer.printMessage(`Se cargaron los albums del artista ${artist.name}`);
    }

}

module.exports = SpotifyManager;
