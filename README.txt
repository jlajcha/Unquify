README

Especificaciones técnicas

Instalar Node v 12.18.4




Ejecución de Tests

	1- Posicionarse dentro de la carpeta Unquify 
	2- Ejecutar 'npm install' para instalar las dependencias necesarias
	3- Ejecutar 'npm test'

Ejecucion de comando
	Hay dos maneras: 
		1.Ejecutar el arichivo donde se encuentran los ejemplos. Para esta opción, ubicado en la carpeta de 		Unquify del proyecto se deberá abrir una terminal y ejecutar 'sh commandLoader.sh'  

		2.Ejecutar individualmente los siguientes comandos:


			* addArtist, agrega un artista en la aplicación. recibe como argumentos un nombre y un país de 	
				origen , ambos argumentos son de tipo string . 
			
				Estructura: 'node main.js addArtist "nombreArtista" "paisOrigen" '
				Ejemplo: node main.js addArtist "bon jovi" "USA"


			* getArtistById, devuelve el artista correspondiente a un numero de id. En caso de no encontrarlo
				 se retorna una excepcion. Recibe como parámetro el número del id, que tiene que ser de tipo número.En caso de no encontrarse se retorna una excepcion: 'No se ha encontrado el artista con #id'.  
				
				Estructura: ' node main.js getArtist nroId ' 
				Ejemplo:	' node main.js getArtistById 0 '


			* deleteArtist, elimina un artista relacionado al id pasado por parámetro. El id debe ser 
				tipo numero.

				Estructura: ' node main.js deleteArtist id '
				Ejemplo: 	' node main.js deleteArtist 3 '


			* addAlbum ,agrega al artista el abum. Recibe como parámetro el id del artista, que debe ser 
				tipo número y le nombre del album y año que deberán ser de tipo String.

				Estructura: ' node main.js addAlbum  idArtista "nombreAlbum" "año" '
				Ejemplo:    ' node main.js addAlbum  2 "Love Foolosophy" "2020" '


			* getAlbumById, retorna el album correspondiente a un numero de id. En caso de no encontrarlo
				 se retorna una excepcion. Recibe como parámetro el número del id, que tiene que ser de tipo número. En caso de no encontrarla lanza una excepción 'No se encuentra el album con #id '

				 Estructura:' node main.js getAlbumById idAlbum ' 
				 Ejemplo: 	' node main.js getAlbumById 1 '




			* deleteAlbumWithId, elimina un album relacionado al id pasado por parámetro. El id debe ser 
				tipo numero.

				Estructura: ' node main.js deleteAlbumWithId id '
				Ejemplo: 	' node main.js deleteAlbumWithId 3 '



			* addTrack, agrega una cancion a un album específico. Recibe como parámetro el id del album a
				 donde pertenece (idAlbum) con tipo numero, nombre de la cancion ( nombreCancion) con tipo string, duracion con tipo string y una lista de generos(["genero"]) , donde cada genero es un string  

				Estructura: ' node main.js addTrack idAlbum "nombreCancion" "duracion" ["genero"]'
				Ejemplo: 	' node main.js addTrack  0 "Just another story" "200" ["funk","pop"] '


			* deleteTrack, elimina la canción relacionado al id pasado por parámetro. El id debe ser tipo numero

				Estructura: ' node main.js deleteTrack idTrack '
				Ejemplo: 	' node main.js deleteTrack 2 '


			* addUser, crea un usuario en el sistema con el nombre pasado por parámetro.
				 El parámetro debe ser de tipo string

				Estructura: ' node main.js addUser "nombreUsuario" '
				Ejemplo: 	' node main.js addUser "Juan Perez " '


			* getUserById, retorna el usuario asociado al id pasado por parametro. 

				Estructura: ' node main.js getUserById 0 '
				Ejemplo: 	' node main.js getUserById 0 '


			* userListenTrack, agrega una cancion a la lista de canciones escuchadas por un usuario.
				Toma por parámetro el id del usuario y el id de la canción,ambos son de tipo número.

				Estructura: ' node main.js userListenTrack idUsuario idTrack '
				Ejemplo: 	' node main.js userListenTrack 1 3 '


			* threeMostListenedByArtist, devuelve las 3 canciones más escuchadas de un artista 
				determinado por el id.

				Estructura: ' node main.js threeMostListenedByArtist idArtista '
				Ejemplo: 	' node main.js threeMostListenedByArtist 2 '


			* getArtistTracks, devuelve todas las canciones relacionadas a un artista. Recibe por parámetro 
				el id del artista 
				
				Estructura: ' node main.js getArtistTracks idArtist  '
				Ejemplo: 	' node main.js getArtistTracks 0  '

			
			* createPlaylist, crea una playlist de canciones que esten relacionados a los géneros que se 
				pasan por parámetro. Esta playlist tienen una duración máxima de tiempo. 
				Toma por parámetro una nombre de la playlist, la lista de géneros y la duración.

				Estructura: ' node main.js createPlaylist "nombrePlaylist" ["genero"] duracion '
				Ejemplo: 	' node main.js createPlaylist "K-POP" ["pop" "trap"] 300 '


			* getTracksMatchingGenres, retorna todas las canciones que tengas algún género de la lista. 
				Toma por parámetro una lista de géneros.

				Estructura: ' node main.js getTracksMatchingGenres ["generos"]] '
				Ejemplo: 	' node main.js getTracksMatchingGenres ["pop","rock"] 


			* searchByName, retorna todas las canciones, artistas, playlists y canciones que 
				coincidan con la palabra ingresada por parámetro.
				
				Estructura: ' node main.js searchByName "palabra" '
				Ejemplo: 	' node main.js searchByName "rose" '


			* searchArtistsByName, retorna todos los artistas que coincidan de manera total o parcial con la palabra ingresada por parámetro.
				
				Estructura: ' node main.js searchArtistsByName "nombreArtista" '
				Ejemplo: 	' node main.js searchArtistsByName "rose" '


			* searchAlbumsByName, retorna todos los albumnes que coincidan de manera total o parcial con la palabra ingresada por parámetro.
				
				Estructura: ' node main.js searchAlbumsByName "nombreAlbum" '
				Ejemplo: 	' node main.js searchAlbumsByName "Cariño" '


			* searchTracksByName, retorna todas las canciones que coincidan de manera total o parcial con 
				la palabra ingresada por parámetro.
				
				Estructura: ' node main.js searchTracksByName "nombreCancion" '
				Ejemplo: 	' node main.js searchTracksByName "Half" '


			* searchPlayListsByName, retorna todas las playlists que coincidan de manera total o parcial con 
				la palabra ingresada por parámetro.
				
				Estructura: ' node main.js searchPlayListsByName "nombrePlaylist" '
				Ejemplo: 	' node main.js searchPlayListsByName "K-POP" '



			* getTracksMatchingArtist, retorna todas las canciones relacionadas a un artista. Recibe 
				por parámetro el nombre del artista
				
				Estructura: ' node main.js getTracksMatchingArtist "nombreArtista" '
				Ejemplo: 	' node main.js getTracksMatchingArtist "gnr" '



			* updateArtistName, modifica el nombre del artista relacionado al id, al nombre pasado por parámetro
				
				Estructura: ' node main.js updateArtistName idArtista "nombreArtista" '
				Ejemplo: 	' node main.js updateArtistName 2 "juan" '



			* updateArtistNationality, modifica el pais de nacionalidad  del artista relacionado al id 
				de artista 

				
				Estructura: ' node main.js updateArtistNationality idArtista "nombrePais" '
				Ejemplo: 	' node main.js updateArtistNationality 2 "Argentina" '

			

			* updateAlbumName, modifica el nombre del album relacionado al id, al nombre pasado por parámetro
				
				Estructura: ' node main.js updateAlbumName idAlbum "nombreAlbum" '
				Ejemplo: 	' node main.js updateAlbumName 1 "PRETTYMUCH" '

			

			* updateAlbumYear, modifica el año del album relacionado al id, al año pasado por parámetro
				
				Estructura: ' node main.js updateAlbumYear idAlbum "nuevoAño" '
				Ejemplo: 	' node main.js updateAlbumYear 1 "2019" '

			

			* updateAlbumYear, modifica el año del album relacionado al id, al año pasado por parámetro
				
				Estructura: ' node main.js updateAlbumYear idAlbum "nuevoAño" '
				Ejemplo: 	' node main.js updateAlbumYear 1 "2019" '




			* updateTrackName, modifica el nombre de la canción relacionado al id, al nombre pasado 
				por parámetro
				
				Estructura: ' node main.js updateTrackName idCancion "nuevoNombre" '
				Ejemplo: 	' node main.js updateTrackName 1 "Roses" '


			* updateTrackDuration, modifica la duración de la canción relacionado al id, a la duración pasada
				por parámetro
				
				Estructura: ' node main.js updateTrackDuration idCancion "nuevoNombre" '
				Ejemplo: 	' node main.js updateTrackDuration 1 "100" '
		

#node main.js



