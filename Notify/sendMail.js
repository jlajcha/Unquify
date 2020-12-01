const GMailAPIClient = require('./GMailAPIClient');
const gmailClient = new GMailAPIClient();


function sendMessage(anEmail, aSubject, aMessage){
  const mail = 'juliana.a.lajcha@gmail.com'
  
  gmailClient.send_mail(aSubject, aMessage,
    {
      "name": "el receiver",
      "email": "juliana.a.lajcha@gmail.com",
    },  
    {
    "name": "UNQfy newsletter",
    "email": "juliana.a.lajcha@gmail.com",
  }) 
  }
module.exports.sendMessage = sendMessage;