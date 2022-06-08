// Set authentication method and if whitelist or blacklist
const useAuthFile=false;

// Import required libraries
const Discord = require('discord.js');

// Import required tables (authentication, blacklist, definition table)
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
const messageChannelXJSON = "./xChannels.json"
const messageChannelYJSON = "./yChannels.json"
//const transferFile="temp.json";

// Define Command Channels ID X
const commandChannelsIdX = ['976600623388688454', '976600638945370132', '976600654434926652','976600665369497681','976600675955933224','980004926044397568','980004937880731649','980004947137540156','980004955844919296','980004971191889960','980004986702405662'];

// Define Command Channels ID Y
const commandChannelsIdY = ['976600686542327849', '976600712836444190', '976600727512313896','976600758466281474','976600736555221012','980005688107474974','980005702250659870','980005735050125332','980005752586518608','980005765706297354','980005785922838528'];

// Combined Channels
const commandChannels = commandChannelsIdX + commandChannelsIdY

// Define Message Channel Objects
var messageChannelIdsX = readJSON(messageChannelXJSON)
var messageChannelIdsY = readJSON(messageChannelYJSON)

var messageChannelsX = [];
var messageChannelsY = [];
var ts;

var sendChannel;

function readJSON(path)
{
	let rawdata = fs.readFileSync(path);
	return JSON.parse(rawdata);
}

//Saves a JS Object to a JSON on a given path
async function updateJSON(object, path)
{
	fs.writeFileSync(path, JSON.stringify(object));
}

//Given a channel arr and a path reloads the array with the json values
function loadChannels(JSONPath) 
{
	var json = readJSON(JSONPath);
	let channelArr = [];

	var jsonObjects = Object.values(json)
	jsonObjects.forEach(element => {
		channelArr.push(client.channels.get(element))
	});

	return channelArr
}

//Sends a message to all channels in the channel array
function sendMessage(channelArr, message)
{
	channelArr.forEach(element => 
		element.send(message)
	);
}

client.on('ready', async () => {
	console.log(`Logged in as ${client.user.tag}!`);

	messageChannelsX = loadChannels(messageChannelXJSON);
	messageChannelsY = loadChannels(messageChannelYJSON);
});

client.on('message', async msg => {
	try {
		if(msg.author.bot)
		{
			return;
		}

		console.log(`${msg.author.username} send message ${msg.content}`)

		let message = msg.content;
		let serverid = msg.guild.id;

		if (message.startsWith(prefix) && msg.member.permissionsIn(msg.channel).has("ADMINISTRATOR")) {

			// Remove command indicatior prefix and split into args and command
			let args = message.substring(prefix.length).split(' ');
			let cmd = args[0];
			args = args.splice(1);

			//Before whitelisting
			switch (cmd.toLowerCase()) {
				case 'setchannelx':
				messageChannelIdsX[serverid] = msg.channel.id;
				await updateJSON(messageChannelIdsX, messageChannelXJSON);
				messageChannelsX = loadChannels(messageChannelXJSON);
				msg.channel.send("Added Channel X!")
					.then(msgData => { setTimeout(() => msgData.delete(), 5000) });
				break;

				case 'setchannely':
				messageChannelIdsY[serverid] = msg.channel.id;
				await updateJSON(messageChannelIdsY, messageChannelYJSON);
				messageChannelsY = loadChannels(messageChannelYJSON);
				
				msg.channel.send("Added Channel Y!")
					.then(msgData => { setTimeout(() => msgData.delete(), 5000) });
				break;
			}
		
		}
		if (message.startsWith(prefix)) 
		{
			// Remove command indicatior prefix and split into args and command
			let args = message.substring(prefix.length).split(' ');
			let cmd = args[0];
			args = args.splice(1);
			
			//Channel whitelist
			if (commandChannels.includes(msg.channel.id)) {
				// Parse Command
				switch (cmd.toLowerCase()) {
					case 'generalroomin5': // sends a message to a given channel
						if (msg.channel.id in commandChannelsIdX) {
							sendChannel = messageChannelsY;
						}
						else {
							sendChannel = messageChannelsX;
						}
						ts = Math.round((new Date()).getTime() / 1000);
						setTimeout(() => msg.reply(`Press __**Ready**__ now!`), 5000)
						msg.channel.send(`Hit __**Ready**__ in <t:${ts + 5}:R>!`)
							.then(msgData => { setTimeout(() => msgData.delete(), 5000) });
						sendMessage(sendChannel, `Cheerful Live going up: <t:${ts + 5}:R>!`)
						break;
				} // End Switch
			}	
		}
	}
	catch (err) {

		let time = "";

		try { time = new Date().toGMTString(); }
		catch (er) { }

		let errmess = time + ":\n" + err.stack + "\n\n";

		fs.appendFile(errorFile, errmess, (error) => {
			// If there's a problem writing errors, just silently suffer
		});

		console.log(errmess);

		try { msg.channel.send("Oh, I don't feel so good."); }
		catch (er) { }
	}
});

if (useAuthFile)
	client.login(auth.token);
else
	client.login(process.env.BOT_TOKEN);