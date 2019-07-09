require('dotenv').config();
const simple = require('simple');
const chalk = require('chalk');
const token = process.env.TOKEN;
const {RichEmbed} = require('discord.js');

//setup chalk
const user = chalk.yellow.bold;
const info = chalk.blueBright;
const prom = chalk.yellow;
const mesg  = chalk.cyan;

var votes = [];
var ids = [];

function idGen(len=10){
	var flag = true;
	var id = Math.floor(Math.random() * Math.pow(10, len));
	while(ids.includes(id)){
		var id = Math.floor(Math.random() * Math.pow(10, len));
	}
	ids.push(id)
	return id;
}


simple.set('promptChar', 'e/');


simple.set('activity', 'e/help')
//simple.client.on('ready', ()=>{simple.client.user.setActivity('e/help')})

simple.echo('ping', 'ping');

simple.on('vote', function(msg, arg){
	var question = '';
	for(var i = 1; i < arg.length; i++){
		question += arg[i] + ' ';
	}
	const id = idGen(3);
	console.log(prom('> ') + user(msg.author.tag) + prom(' create a vote'));
	const embed = new RichEmbed()
		.setColor('0xffff00')
		.setTitle('VOTE')
		.setFooter('created by ' + msg.author.tag + ', id = ' + id)
		.setDescription(question);
	var vote = msg.channel.send(embed);
	vote.
		then((msg) => {
			msg.react('\u2705');
			return msg;
		}).
		then((msg) => {	
			msg.react('\u274E');
			return msg;
		}).
		catch(console.error);
	var that = {
		vote: vote,
	id: id
	};
	votes.push(that); 
});

simple.on('end', function(msg, arg){
	var vote;
	if(!arg[1]){
		vote = votes.pop().vote;
	}else{
		for(i in votes){
			if(votes[i].id == arg[1]){
				vote = votes[i].vote;
				votes[i] = {};
			}
		}
	}
	vote.then(msg => {
		var reactions = msg.reactions;
		var vote = reactions.first().message.embeds[0];
		var result = 'Result of \'' + vote.description + '\'';
		reactions.map((val, key) => {
			result += `\n${key} : ${val.count - 1}`;
		});
		var embed = new RichEmbed()
			.setColor('0x0000ff')
			.setTitle('Vote Result')
			.setDescription(result)
			.setFooter('Thank you for using this bot')
		msg.channel.send(embed);
	})
});

simple.on('help', (msg) => {
	const embed = new RichEmbed()
		.setColor('0x00ff00')
		.setTitle('HELP')
		.setDescription('這是 <良成楓景遇見你> Discord bot 課程的範例 \n命令：\n  e/vote <訊息> 建立投票 \n  e/end <id> 結束投票')
		.setFooter('help page')
	msg.channel.send(embed);
});

simple.login(token);
