//this file uses the token to allow the bot to send messages in the chat

const options = {
    options: {
      debug: true
    },
    connection: {
      reconnect: true
    },
    identity: {
      username: "nicnova_",
      password: "oauth:xz12onb88ccph1ho6x2gd2bpr5cnrk"
    },
    channels: ['nicnova_']
  };
  
  
  module.exports = options;