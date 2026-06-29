const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const express = require('express');

const app = express();
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

// Ito ang nagpapanatiling buhay sa bot nang libre
app.get('/', (req, res) => {
    res.send('T^T BOT GAME ROOM ay Buhay na Buhay 24/7!');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Web server ay handa na.');
});

client.once('ready', () => {
    console.log(`${client.user.tag} ay online na!`);
    
    const guildId = process.env.GUILD_ID; 
    const channelId = process.env.CHANNEL_ID;

    const guild = client.guilds.cache.get(guildId);
    if (guild) {
        try {
            joinVoiceChannel({
                channelId: channelId,
                guildId: guildId,
                adapterCreator: guild.voiceAdapterCreator,
                selfDeaf: true,
            });
            console.log("Nakatambay na ang bot sa Voice Channel 24/7!");
        } catch (error) {
            console.error("Hindi makasali sa voice channel:", error);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
