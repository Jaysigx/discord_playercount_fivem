const Discord = require('discord.js')
const token = '##your_token_here##';

const Client = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });


client.on("ready", async () => {                                                                                                                           //   can disable this function 
	console.log('\x1b[32m%s\x1b[0m', `${client.user.username} is online and ready to do something! I'm live on ${client.guilds.size} servers.`);             //   can disable this function
	client.user.setActivity(`${client.user.username} `, { type: 'Watching' })                                                                                //   can disable this function
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))                                                         //   can disable this function
  .catch(console.error);                                                                                                                                   //   can disable this function
	client.user.setStatus('dnd') // Online, idle, invisible & dnd                                                                                 
  });


let serverIPPort = "147.189.170.183:30120";  // your server ip with port here
let voiceChannelId = "1022008414332780677";  // voice channel you want change the name of

const request = require('request');
client.on("ready", async () => {
    setInterval(() => {
        request(`http://${serverIPPort}/players.json"`, function(error, response, body) {
            let channel = client.channels.get(voiceChannelId);
            var bodJson = JSON.parse(body);
            var playerCount = 0;
            bodJson.forEach(players => {
                playerCount++;
            });
            channel.setName(`Player Count: ${playerCount}`);        //  wt the name of channel will change to 
        })
    }, 12000); // refreshes every 2 mins
});

client.login(token);