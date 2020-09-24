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

