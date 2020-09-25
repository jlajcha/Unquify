
node main.js addUser "pepe"

node main.js addArtist "canserbero" "Venezuela"
node main.js addArtist "gnr" "USA"
node main.js addArtist "bon jovi" "USA"
node main.js addArtist "tiago" "Argentina"
node main.js addArtist "pearl jam" "USA"

node main.js getArtistById 0
# node main.js getArtistById 1

node main.js addAlbum  1 "Cariño reptil" "2020"
# node main.js addAlbum  1 "El amor despues del amor" "2019"
# node main.js addAlbum  1 "A Funck odyssey" "2018"
# node main.js addAlbum  2 "Love Foolosophy" "2020"


# node main.js getArtistById 1
# node main.js getArtistById 0
# node main.js getArtistById 2

# node main.js getAlbumById 1
# node main.js getAlbumById 0 


node main.js addTrack  0 "Just another story" 200 ["funk","pop"]
node main.js addTrack  0 "The kid" 100 ["funk","rock"]
node main.js addTrack  0 "Half the man" 250 ["pop"]
# node main.js addTrack  0 "Justs another story" 200 ["cumbia","pop"]
node main.js addTrack  0 "Space cowboy" 200 ["cumbia","pop"]

# node main.js getAlbumById 1
# node main.js getAlbumById 0

#delete de track
#node main.js deleteTrack 2 

node main.js addUser "Juan Perez "
node main.js addUser "Maria La del Barrio "
node main.js getUserById 0
node main.js userListenTrack 1 3 

node main.js threeMostListenedByArtist 2 
node main.js getArtistTracks 0 
node main.js getTracksMatchingGenres ["pop" , "rock"]

node main.js createPlaylist "K-POP" ["pop" ,"trap"] 300
#node main.js createPlaylist "Cumbias" ["pop" ,"cuarteto"] 500
#node main.js createPlaylist "heavy" ["rock" ] 300

node main.js searchByName "rose"
node main.js searchArtistsByName "canser"
node main.js searchAlbumsByName "Cariño"
node main.js searchTracksByName "Half"
node main.js searchPlayListsByName "K-POP"
node main.js getTracksMatchingArtist "gnr"



#updates 
#node main.js updateArtistName 2 "juan"
#node main.js updateArtistNationality 1 "usa"
#node main.js updateAlbumName 1 "PRETTYMUCH"