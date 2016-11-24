const Eris = require("eris");
//new Bot, however you'll require a token
var bot = new Eris.CommandClient("BOT_TOKEN", {
	disableEveryone: false,
	manageMessages: true,
	embedLinks: false
}, {
	description: "Our Garrys Mod Bot",
	owner: "NeverSeen, Prawr, Shiny Mushiro",
	prefix: "!"
});

bot.on("ready", () => { // When the bot is ready
    console.log("Ready!"); // Log "Ready!"
});

//Welcomer
bot.on("guildMemberAdd", (guild, member) => {
	var response = `Welcome ${member.mention} to ${guild.name}!`;
	bot.createMessage(guild.defaultChannel.id, response);
});

//Farewell sayer (We're nice guys after all)
bot.on("guildMemberRemove", (guild, member) => {
	var response = `Farewell @${member.user.username}!`;
});

//Banphrasing test
//Since it's currently only one word, it's kept very very simple
function stringMatchingStuff(str){
	var arr = ["o", "ó", "ò", "ô", "ö", "ø", "ð", "õ", "*"]
	if((str.charAt(1) === "c") || (str.charAt(1) === "ç")){
		var a = str.charAt(0), b = str.charAt(2);
		for(i = 0; i < arr.length; i++){
			for(j = 0; j < arr.length; j++){
				if((a === arr[i]) && (b === arr[j])){
					return true;
				}
			}
		}
	}
	return false;
}

//In case someone sends a message, check for banphrases
bot.on("messageCreate", (msg) => {
	var trimStr = msg.content.trim();
	var lc = trimStr.toLowerCase();
	for (i = 0; i < lc.length; i++){
		if((lc.charAt(i) == "p") || (lc.charAt(i) == "þ")){
			if(stringMatchingStuff(lc.substr(i+1,3))){
				msg.delete();
			}
		}
	}
});

//In case someone edits his message, check for banphrases
bot.on("messageUpdate", (msg) => {
	var trimStr = msg.content.trim();
	var lc = trimStr.toLowerCase();
	for (i = 0; i < lc.length; i++){
		if((lc.charAt(i) == "p") || (lc.charAt(i) == "þ")){
			if(stringMatchingStuff(lc.substr(i+1,3))){
				msg.delete();
			}
		}
	}
});

bot.registerCommandAlias("halp", "help"); // Alias !halp to !help

bot.registerCommand("ping", "Pong!", { // Make a ping command
	caseInsensitive: true,
    description: "Pong!",
    fullDescription: "Ping Pong"
});

bot.registerCommand("pong", (msg, args) => {
	var arr = ["Pang!", "Peng!", "Ping!", "Pung!", "uguu!"];
	var number = Math.floor(Math.random()*(arr.length - 1))+ 1;
	var text = "fail";
	var text = arr[number];
    bot.createMessage(msg.channel.id, text);
}, { // Make a pong command
	//Responds with a random version of "Ping!" when someone says "!pong"
	caseInsensitive: true,
	description: "Ping!",
	fullDescription: "returns either 'Pang!', 'Peng!', Ping!', Pung!' or a special meme",
});

bot.registerCommand("pout", "https://i.imgur.com/bah45ys.jpg", { // Post url
	caseInsensitive: true,
	deleteCommand: true,
    description: ":T",
    fullDescription: ":T - https://i.imgur.com/bah45ys.jpg"
});

bot.registerCommand("clap", "https://gfycat.com/NeatWearyBluemorphobutterfly", { // Make a boii command
	caseInsensitive: true,
	deleteCommand: true,
    description: "\*clap\* \*clap\* \*clap\*",
    fullDescription: "Puck Clap - https://gfycat.com/NeatWearyBluemorphobutterfly"
});

bot.registerCommand("boii", "https://puu.sh/rl3qP/0d01ac5c82.jpg", { // Make a boii command
	caseInsensitive: true,
	deleteCommand: true,
    description: "Boii",
    fullDescription: "Beetlejuice boii - https://puu.sh/rl3qP/0d01ac5c82.jpg"
});

var translateCommand = bot.registerCommand("translate", (msg, args) => { // Make an echo command
    if(args.length === 0) { // If the user only typed "!translate", say "Invalid input"
        return "Invalid input";
    }
	return "Sorry, but I'm not working yet :(";
	var request = require('request');
	var cheerio = require('cheerio');
	var tranText, tranText2;
	var url = "https://translate.google.de/?hl=de#auto/ja/" + args;
	request(url, function(error, response, body){
		if(!error){
			var $ = cheerio.load(body);
			console.log("request url no error");
			tranText = $(this).find('span#result_box.short_text').html();
			console.log(tranText);
			tranText2 = $(this).find('div#res-translit.translit').html();
			console.log(tranText2);
		} else {
			console.log("An error appeared" + error);
		}
	})
	return tranText + " and that's how u spell it: " + tranText2;
}, {
	caseInsensitive: true,
    description: "Translate any language to Japanese",
    fullDescription: "The bot will translate whatever is after the command label to japanese.",
    usage: "<text>"
});

var echoCommand = bot.registerCommand("echo", (msg, args) => { // Make an echo command
    if(args.length === 0) { // If the user only typed "!echo", say "Invalid input"
        return "Invalid input";
    }
    var text = args.join(" "); // Make a string of the text after the command label
    return text; // Return the generated string
}, {
	caseInsensitive: true,
	deleteCommand: true,
    description: "Make the bot say something",
    fullDescription: "The bot will echo whatever is after the command label.",
    usage: "<text>"
});

echoCommand.registerSubcommand("reverse", (msg, args) => { // Make a reverse subcommand under echo
    if(args.length === 0) { // If the user only typed "!echo reverse", say "Invalid input"
        return "Invalid input";
    }
    var text = args.join(" "); // Make a string of the text after the command label
    text = text.split("").reverse().join(""); // Reverse the string
    return text; // Return the generated string
}, {
	caseInsensitive: true,
	deleteCommand: true,
    description: "Make the bot say something in reverse",
    fullDescription: "The bot will echo, in reverse, whatever is after the command label.",
    usage: "<text>"
});

bot.registerCommand("gmod", " Do you want to play Garry's Mod? If so, please reply!", {
	//Requirements
	requirements: {
	roleNames: ["chosen one"]
	},
	caseInsensitive: true,
	deleteCommand: true,
	guildOnly: true,
    description: "It's time for the chosen ones to call it",
    fullDescription: "This command will mention everyone, trying to gather people for Garry's Mod. You are only able to use this command if you are a chosen one.", 
	cooldown: 10000,
	cooldownMessage: "Don't spam this command you little shit", 
	permissionMessage: "Sorry, but you are not a chosen one"});

echoCommand.registerSubcommandAlias("backwards", "reverse"); // Alias "!echo backwards" to "!echo reverse"

bot.connect(); // Get the bot to connect to Discord