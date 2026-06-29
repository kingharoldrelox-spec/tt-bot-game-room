const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
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
    } else {
        console.error("Hindi mahanap ang Guild/Server ID.");
    }
});

client.login(process.env.DISCORD_TOKEN);
