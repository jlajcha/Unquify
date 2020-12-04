const {NewsletterConnector} = require('./newsletterConnector.js');
const notifier  = new NewsletterConnector();

//emula interfaz que tengan que implementar los que sea observadores
// class UnquifyObserver{
//    // updateState(json){}
// }

//clase concreta 
class NewsletterObserver{
    constructor(){}

    updateState(json){
        
    const subject = 'Nuevo album '+json.album;
    const message = 'Tu artista '+json.artist+' publicó su nuevo album '+json.album+'!!!';
    notifier.notifySubscribers(json.artistId, subject, message);
    }   

}
module.exports = {
    NewsletterObserver: NewsletterObserver}