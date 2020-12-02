const GMailAPIClient = require('./GMailAPIClient');
const gmailClient = new GMailAPIClient();


function sendMessage(anEmail, aSubject, aMessage){
    
  gmailClient.send_mail(aSubject, aMessage,
    anEmail,  
    {
    "name": "UNQfy newsletter",
    "email": "unquify.newsletter@gmail.com",
  }) 
  }
module.exports.sendMessage = sendMessage;