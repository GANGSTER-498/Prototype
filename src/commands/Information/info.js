const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('commands for bot')
		.addSubcommand(subcommand => 
			subcommand
			.setName('user')
			.setDescription(" Gets information of a user mentioned")
			.addUserOption(option => option.setName("target").setDescription("user mentioned")))
			.addSubcommand(subcommand => 
				subcommand
				.setName('server')
				.setDescription(" Gets information of the server")
				),
	async execute(interaction, client) {
		if (interaction.options.getSubcommand() === "user"){
			const user = interaction.options.getUser("target");
			if (user){
				const file = new MessageAttachment("./src/images/prototype.png")
				const userEmbed = new MessageEmbed()
				     .setTitle(`${user.username}'s information`)
					 .setDescription("The Information regarding the user mentioned")
					 .setURL("https://discord.gg/ZEgQExHnmm")
					 .setAuthor("Prototype", client.user.displayAvatarURL(), "https://discord.gg/ZEgQExHnmm")
					 .setThumbnail(client.user.displayAvatarURL())
					 .addFields(
						 { name: `Username`, value: `${user.username}`, inline: true},
						 { name: `\u200B`, value: `\u200B`, inline: true},
						 { name: `Tag`, value: `#${user.discriminator}`, inline: true},
					 )
					 .setImage("attachment://prototype.png")
					 .setTimestamp()
					 .setColor("RED")
					 .setFooter("PROTOTYPE","https://i.imgur.com/lTSxS6C.jpg");

				await interaction.reply({ embeds: [userEmbed], files: [file] });
			} else {
				await interaction.reply(`Username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
			}
		}else if (interaction.options.getSubcommand() === "server"){
			await interaction.reply(`Server Name: ${interaction.guild.name}\nTotal members: ${interaction.guild.membercount}`);
		}else{
			await interaction.reply("no sub command was used");
		}
	},
};