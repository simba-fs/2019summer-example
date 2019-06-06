const simple = require('simple');
const chalk = require('chalk');
const {token} = require('./token.js');
const {RichEmbed} = require('discord.js');

//setup chalk
const user = chalk.yellow.bold;
const info = chalk.blueBright;
const prom = chalk.yellow;
const mesg  = chalk.cyan;

simple.login(token);

simple.set('promptChar', 'e/');

simple.echo('ping', 'ping');

simple.on('vote', function(msg, arg){
	console.log(prom('> ') + user(msg.author.tag) + prom(' create a vote'));
	const embed = new RichEmbed()
		.setColor('0xffff00')
		.setTitle('VOTE')
		.setFooter('create by ' + msg.author.tag)
		.setDescription(arg[1]);
	msg.channel.send(embed)
		.then((msg) => {
			msg.react('\u2705');
			msg.react('\u274E');
		})
		.catch(console.error);

});


simple.on('help', (msg) => {
	const embed = new RichEmbed()
		.setColor('0x00ff00')
		.setTitle('HELP')
		.setDescription('這是 <良成楓景遇見你> Discord bot 課程的範例 \n用命令 e/vote <訊息> 建立投票')
		.setFooter('help page')
	msg.channel.send(embed);
});
