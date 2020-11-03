
cd ..

# node main.js addUser "juli"
# node main.js addUser "mati"

# node main.js addArtist "canserbero" "Venezuela"
# node main.js addArtist "guns and roses" "USA"
# node main.js addArtist "bon jovi" "USA"
# node main.js addArtist "tiago" "Argentina"
node main.js addArtist "pearl jam" "USA"

# node main.js getArtistById 0
# node main.js getArtistById 1

# node main.js addAlbum 0 "Vida y Muerte" "2020"
# node main.js addAlbum 0 "apa y can" "2020"
# node main.js addAlbum  1 "Cariño reptil" "2020"
# node main.js addAlbum  1 "El amor despues del amor" "2019"
# node main.js addAlbum  2 "A Funck odyssey" "2018"
# node main.js addAlbum  2 "Love Foolosophy" "2020"

# node main.js addTrack  0 "Just another story" 200 ["funk","pop"]
# node main.js addTrack  0 "The kid" 100 ["funk","rock"]
# 
 #por aca son los que tienen lyrics
# node main.js addTrack  0 "Stairway to heaven" 200 ["rock","pop"]
# node main.js addTrack  0 "Hey Jude" 200 ["pop"]
# node main.js addTrack  0 "Let It Be" 200 ["pop"]



# node main.js addTrack 1 "civil war" 200 ["rock","metal"]
# node main.js addTrack 1 "welcome to the jungle" 500 ["rock","metal"]
# node main.js addTrack 1 "roquet queen" 400 ["rock","metal"]
# node main.js addTrack 1 "paradise city" 200 ["rock","metal"]
# node main.js addTrack 1 "yesterday" 100 ["rock","metal"]

# node main.js addTrack 2 "jeremias" 200 ["rap"]
# node main.js addTrack 2 "querer querernos" 200 ["rap"]
# node main.js addTrack 2 "epico" 200 ["rap"]


# node main.js getArtistById 0
# node main.js getArtistById 1
# node main.js getArtistById 2

# node main.js getAlbumById 0
# node main.js getAlbumById 1 
# node main.js getAlbumById 2

# node main.js getUserById 0
# node main.js userListenTrack 0 1
# node main.js userListenTrack 0 1
# node main.js userListenTrack 0 2
# node main.js userListenTrack 0 3

# node main.js userListenTrack 1 2
# node main.js userListenTrack 1 3
# node main.js userListenTrack 1 4 

# node main.js threeMostListenedByArtist 0 
# node main.js getArtistTracks 0 
# node main.js getTracksMatchingGenres "pop" "rock"

#node main.js createPlaylist "K-POP" ["pop" ,"trap"] 300
#node main.js createPlaylist "Cumbias" ["pop" ,"cuarteto"] 500
#node main.js createPlaylist "heavy" ["rock" ] 300

# node main.js searchByName "bon"
# node main.js searchArtistsByName "canser"
# node main.js searchAlbumsByName "Cariño"
# node main.js searchTracksByName "Half"
# node main.js searchPlayListsByName "K-POP"
# node main.js getTracksMatchingArtist "gnr"



#updates 
#node main.js updateArtistName 2 "juan"
#node main.js updateArtistNationality 1 "usa"
#node main.js updateAlbumName 1 "PRETTYMUCH"
#node main.js updateAlbumYear 1 "2019"
#node main.js updateTrackName 1 "Roses"
#node main.js updateTrackDuration 1 "100"


#deletes
#node main.js deleteAlbumWithId 1 
#node main.js deleteTrack 2 
#node main.js deleteArtist 2 
