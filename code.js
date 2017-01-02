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
//function stringMatchingStuff(str){
//	var arr = ["o", "ó", "ò", "ô", "ö", "ø", "ð", "õ", "*"]
//	if((str.charAt(1) === "c") || (str.charAt(1) === "ç")){
//		var a = str.charAt(0), b = str.charAt(2);
//		for(i = 0; i < arr.length; i++){
//			for(j = 0; j < arr.length; j++){
//				if((a === arr[i]) && (b === arr[j])){
//					return true;
//				}
//			}
//		}
//	}
//	return false;
//}

//In case someone sends a message, check for banphrases
//bot.on("messageCreate", (msg) => {
//	var trimStr = msg.content.trim();
//	var lc = trimStr.toLowerCase();
//	for (i = 0; i < lc.length; i++){
//		if((lc.charAt(i) == "p") || (lc.charAt(i) == "þ")){
//			if(stringMatchingStuff(lc.substr(i+1,3))){
//				msg.delete();
//			}
//		}
//	}
//});

//In case someone edits his message, check for banphrases
//bot.on("messageUpdate", (msg) => {
//	var trimStr = msg.content.trim();
//	var lc = trimStr.toLowerCase();
//	for (i = 0; i < lc.length; i++){
//		if((lc.charAt(i) == "p") || (lc.charAt(i) == "þ")){
//			if(stringMatchingStuff(lc.substr(i+1,3))){
//				msg.delete();
//			}
//		}
//	}
//});

var bot_commands = [{cmd: "ping", action: "Pong!", desc: "Pong!"}, 
	{cmd: "pout", action: "https://i.imgur.com/bah45ys.jpg", desc: ":T"},
	{cmd: "lewd", action: "http://i.imgur.com/3eeaBJA.gif", desc: "lewd"},
	{cmd: "clap", action: "https://gfycat.com/NeatWearyBluemorphobutterfly", desc: "Puck clap"},
	{cmd: "boii", action: "https://puu.sh/rl3qP/0d01ac5c82.jpg", desc: "Boii"}];

for (var i = 0; i < bot_commands.length; i++){
    bot.registerCommand(bot_commands[i].cmd, bot_commands[i].action, {
        caseInsensitive: true,
        deleteCommand: true,
        description: bot_commands[i].desc,
        fullDescription: bot_commands[i].desc + " - " + bot_commands[i].action
    });
}

var translateCommand = bot.registerCommand("translate", (msg, args) => { // Make an echo command
    if(args.length === 0) { // If the user only typed "!translate", say "Invalid input"
        return "Invalid input";
    }
	return "Sorry, but I'm not working yet :(";
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

bot.registerCommand("gmod", "@everyone Do you want to play Garry's Mod? If so, please reply!", {
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

bot.registerCommandAlias("halp", "help"); // Alias !halp to !help

bot.connect(); // Get the bot to connect to Discord