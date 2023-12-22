const Discord = require('discord.js');
const request = require('request');

const token = '##your_token_here##';
const serverIPPort = '147.189.170.183:30120'; // your server ip with port here
const voiceChannelId = '1022008414332780677'; // voice channel you want to change the name of

const client = new Discord.Client({ disableEveryone: true });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}. Ready to engage on ${client.guilds.cache.size} servers.`);
    client.user.setActivity(`${client.user.username}`, { type: 'WATCHING' })
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error);

    client.user.setStatus('dnd'); // Online, idle, invisible & dnd

    setInterval(() => {
        request(`http://${serverIPPort}/players.json`, (error, response, body) => {
            if (error) {
                console.error('Error:', error);
                return;
            }

            const channel = client.channels.cache.get(voiceChannelId);
            const bodJson = JSON.parse(body);
            const playerCount = bodJson.length;
            channel.setName(`Player Count: ${playerCount}`).catch(console.error);
        });
    }, 120000); // refreshes every 2 minutes
});

client.login(token);
