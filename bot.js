// Set authentication method and if whitelist or blacklist
const useAuthFile=false;
const useWhitelist=true;

// Import required libraries
const Discord = require('discord.js');
const botMethods= require('./chimethods.js');

// Import required tables (authentication, blacklist, definition table)
if(useAuthFile)
	var auth = require('./auth.json');
const blackfile = require('./blacklist.json');
const definitionsFile = require('./definitions.json');

// Set up client
const client = new Discord.Client();
if(useWhitelist)
	var channelWhitelist=blackfile.whitelisted;
else
	var channelBlacklist=blackfile.blacklisted;

// Set up the fileEditor for saving settings
const fs = require('fs'); 

// Set up defaults
const prefix='!';
const rebootlag=5000;
const errorFile="errorfile.log";
//const transferFile="temp.json";

// Define Message Channel ID X
const messageChannelIdX = '982880491566927882';

// Define Command Channels ID X
const commandChannelsIdX = ['976600623388688454', '976600638945370132', '976600654434926652','976600665369497681','976600675955933224','980004926044397568','980004937880731649','980004947137540156','980004955844919296','980004971191889960','980004986702405662'];

// Define Message Channel ID X
const { TextChannelX } = require('discord.js')

// Define Command Channel X
const commandChannelX = client.channels.cache.get(commandChannelIdX) as TextChannelX;

// Define Message Channel X
const messageChannelX = client.channels.cache.get(messageChannelIdX) as TextChannelX;

// Send Message to Channel X
if ((commandChannelsIdX && commandChannelsIdX.type === 'GUILD_TEXT') || (msg.content === '!genin5x'))
								   messageChannelX.send('Lobby going up in 5 seconds!');


// Define Announcement Channel ID Y
const messageChannelIdY = '983467174993743934';

// Define Command Channels ID Y
const commandChannelsIdY = ['976600623388688454', '976600638945370132', '976600654434926652','976600665369497681','976600675955933224','980004926044397568','980004937880731649','980004947137540156','980004955844919296','980004971191889960','980004986702405662'];

// Define Message Channel ID X
const { TextChannelY } = require('discord.js')

// Define Channel Y
const messageChannelY = client.channels.cache.get(messageChannelIdY) as TextChannelY;

// Send Message to Channel Y
if ((commandChannelsIdY && commandChannelsIdY.type === 'GUILD_TEXT') || (msg.content === '!genin5y'))
								   messageChannelY.send('Lobby going up in 5 seconds!');

	// If using the Whitelist, check if channel is on it
	if (useWhitelist && !message.startsWith(prefix + 'point'))
		if (channelWhitelist.indexOf(msg.channel.id) == -1)
			return;

	// Check if command for the bot
	if (message.startsWith(prefix)) {

		// Remove command indicatior prefix and split into args and command
		let args = message.substring(prefix.length).split(' ');
		let cmd = args[0];
		args = args.splice(1);

		// Parse Command
		switch(cmd.toLowerCase()) {
			case 'genin5': // sends a message to a given channel
