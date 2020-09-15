

const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy
const unqfy = require('./unqfy');
const CommandHandler = require('./commandHandler');

// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename = 'data.json') {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

function saveUNQfy(unqfy, filename = 'data.json') {
  unqfy.save(filename);
}

function addArtist(name , country){
  unq = getUNQfy()
  data = {name: name, country: country}
  artist =unq.addArtist(data)
  saveUNQfy(unq)
  console.log('se guardo el estado de '+ JSON.stringify(data))
}

function getArtist(id){
  unq = getUNQfy()
  const art = unq.getArtistById(id)
  
  // return console.log (JSON.stringify(art) )
  console.log (JSON.stringify(art) )
}

/*
 En esta funcion deberán interpretar los argumentos pasado por linea de comandos
 e implementar los diferentes comandos.

  Se deberán implementar los comandos:
    - Alta y baja de Artista
    - Alta y Baja de Albums
    - Alta y Baja de tracks

    - Listar todos los Artistas
    - Listar todos los albumes de un artista
    - Listar todos los tracks de un album

    - Busqueda de canciones intepretadas por un determinado artista
    - Busqueda de canciones por genero

    - Dado un string, imprimmir todas las entidades (artistas, albums, tracks, playlists) que coincidan parcialmente
    con el string pasado.

    - Dada un nombre de playlist, una lista de generos y una duración máxima, crear una playlist que contenga
    tracks que tengan canciones con esos generos y que tenga como duración máxima la pasada por parámetro.

  La implementacion de los comandos deberá ser de la forma:
   1. Obtener argumentos de linea de comando
   2. Obtener instancia de UNQfy (getUNQFy)
   3. Ejecutar el comando correspondiente en Unqfy
   4. Guardar el estado de UNQfy (saveUNQfy)

*/

function main() {
  // console.log(${process.argv[2]});
  const commandHandler = new CommandHandler(process.argv.slice(2))
  const command = commandHandler.execute()
  eval(command)
  //eval(process.argv[2] + '(' + '"'+process.argv[3] +'"'+ ','+'"'+process.argv[4]+'"' +')')
  // eval(process.argv[2] + '(' + '"'+process.argv[3] +'"' +')')
  //console.log('arguments: ');
  //process.argv.forEach(argument => console.log(argument));
}

main();
