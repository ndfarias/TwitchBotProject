const tmi = require("tmi.js");

//connect to options file
const options = require("./options");

//Connect to twitch server
const client = new tmi.client(options);
client.connect();

//Create and enable chat commands
client.on('message', (channel, tags, message, self) => {
    // Ignore echoed messages.
    if(self) return;
  
    //Add chat commands here !! 
    if(message.toLowerCase() === '!hello') {
      client.say(channel, `@${tags.username}, Hi there! Welcome to the stream! :)`);
    }

    if(message.toLowerCase() === '!swear') {
        client.say(channel, `@${tags.username}, Please do not swear on this channel! Thank you. `)
    }

    if(message.toLowerCase()== '!streamers') {
        client.say(channel, `@${tags.username}, Please don't ask to see other streamers. It's considered rude.`)
    }
  });