const tmi = require("tmi.js");

//connect to options file
const options = require("./options");

//Connect to twitch server
const client = new tmi.client(options);
client.connect();

//Connect to api for stream length
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var request = new XMLHttpRequest();
request.open("GET", "https://decapi.me/twitch/uptime?channel=nicnova_", true);

//Connect to api for game info 
var request2 = new XMLHttpRequest();
request2.open("GET", "https://decapi.me/twitch/game/nicnova_", true);

//put the txt file of forbidden words in an array
var fs = require('fs');

try {  
    var data = fs.readFileSync('forbiddenwords.txt', 'utf8');

    var forbiddenWords = data.split("\n");

} catch(e) {
    console.log('Error:', e.stack);
}


//Create and enable chat commands
client.on('message', (channel, tags, message, self) => {
    // Ignore echoed messages.
    if(self) return;
  
    //Add chat commands here !! 
    if(message.toLowerCase() === '!hello') {
      client.say(channel, `@${tags.username}, Hi there! Welcome to the stream! :)`);
    }

    if(message.toLowerCase() === '!swear') {
        client.say(channel, `@${tags.username}, Please do not swear or use hateful language on this channel! Thank you. `);
    }

    if(message.toLowerCase()== '!streamers') {
        client.say(channel, `@${tags.username}, Please don't ask to see other streamers. It's considered rude.`);
    }

    //Code to delete messages - update with list of terms? 

    for (var i = 0; i < forbiddenWords.length; i++) {
      if(message.toLowerCase() == forbiddenWords[i]){
        client.deletemessage(channel, tags.id)
        client.say(channel, `@${tags.username}, Please do not swear or use hateful language on this channel! Thank you. `);
        break;
      }
    }

    //can only start polls as twitch partner/affiliate - cannot test 

    //code to check stream length

    if(message.toLowerCase()== '!uptime') {
      request.onload = function() {

        //data = this.response;

        if(request.status == 200)
        {        
          if (this.responseText.includes("offline")) {
          client.say(channel, `@${tags.username}, ${this.responseText}`);
          }
          else {
            client.say(channel, `@${tags.username}, nicnova_ has been streaming for ${this.responseText}`);
          }
        
        }
        else
        {
            console.log(`Error occurred: Status: ${request.status}`);
        }
      };
      request.send();
    }

    //code to check what game the streamer is playing 
    if(message.toLowerCase()== '!game') {
      request2.onload = function() {

        //data = this.response;

        if(request2.status == 200)
        {        
          if (this.responseText == "") {
            client.say(channel, `@${tags.username}, nicnova_ is offline right now.`);
            }
            else {
              client.say(channel, `@${tags.username}, nicnova_ is streaming ${this.responseText}`);
            }
        
        }
        else
        {
            console.log(`Error occurred: Status: ${request2.status}`);
        }
      };
      request2.send();
    }

  });