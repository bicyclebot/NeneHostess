// Set authentication
const useAuthFile=true;

// Import required libraries
const Discord = require('discord.js');

// Import required tables (authentication)
if(useAuthFile)
	var auth = require('./auth.json');

// Set up client
const client = new Discord.Client();

// Set up the fileEditor for saving settings
const fs = require('fs'); 

// Set up defaults
const prefix='!';
const rebootlag=5000;
const errorFile="errorfile.log";

//const transferFile="temp.json";

// Set Up Channel Variables
var messageChannelX;
var messageChannelY;

// Set Up Timestamps
var ts = Math.round((new Date()).getTime() / 1000);

// Define Message Channel ID X
const messageChannelIdX = '982880491566927882';

// Define Command Channels ID X
const commandChannelsIdX = ['976600623388688454', '976600638945370132', '976600654434926652','976600665369497681','976600675955933224','980004926044397568','980004937880731649','980004947137540156','980004955844919296','980004971191889960','980004986702405662'];

// Define Message Channel IDs
const { TextChannel } = require('discord.js')

// Define Announcement Channel ID Y
const messageChannelIdY = '983467174993743934';

// Define Command Channels ID Y
const commandChannelsIdY = ['976600686542327849', '976600712836444190', '976600727512313896','976600758466281474','976600736555221012','980005688107474974','980005702250659870','980005735050125332','980005752586518608','980005765706297354','980005785922838528'];

// Define Command Channels All
const commandChannels = commandChannelsIdX + commandChannelsIdY

// Initialization
client.on('ready', async () => {
	console.log('Logged in as ${client.user.tag}!');
		// Define Message Channel X
		messageChannelX = client.channels.get(messageChannelIdX);
		// Define Message Channel Y
	  	messageChannelY = client.channels.get(messageChannelIdY);
});

// Make messages read-able by Nene
client.on('message', async msg => {
	try {
		// Extract content for easier manipulation
		let message = msg.content;
		
		// Check if command for the bot
		if (message.startsWith(prefix)) {
			
			// Remove command indicator prefix and split into args and command
			let args = message.substring(prefix.length).split(' ');
			let cmd = args[0];
			args = args.splice(1);
			
			// Parse Command
			switch(cmd.toLowerCase()) {
				case 'generalroomin5':
					if (commandChannelsIdX.includes(msg.channel.id)) {
						ts = Math.round((new Date()).getTime() / 1000);
						messageChannelX.send(`Lobby going up in <t:${ts+5}:R>!`)
							.then(msg => {
								setTimeout(() => msg.delete(), 5000)
							});
						msg.reply(`Hit **__Ready__** in <t:${ts+5}:R>!`)
							.then(msg => {
								setTimeout(() => msg.delete(), 5000)
							});
					} else { 
						ts = Math.round((new Date()).getTime() / 1000);
						messageChannelY.send(`Lobby going up in <t:${ts+5}:R>!`)
							.then(msg => {
								setTimeout(() => msg.delete(), 5000)
							});
						msg.reply(`Hit **__Ready__** in <t:${ts+5}:R>!`)
							.then(msg => {
								setTimeout(() => msg.delete(), 5000)
							});
					break;
			}
		}
	}

	// Error Message
	catch (err) {
		let time = "";
		try { time = new Date().toGMTString(); }
		catch (er) { }
		let errmess = time + ":\n" + err.stack + "\n\n";
		fs.appendFile(errorFile, errmess, (error) => {
		// If there's a problem writing errors, just silently suffer
	});
		console.log(errmess);
		try { msg.channel.send("We're overstaffed!"); }
		catch (er) { }
        		} // End Switch
    		}) // End if

if(useAuthFile)
	client.login(auth.token);
else
	client.login(process.env.BOT_TOKEN);
