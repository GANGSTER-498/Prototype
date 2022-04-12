const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('commands for bot'),
	async execute(interaction, client) {
		const file = new MessageAttachment("./src/images/prototype.png")
		const helpEmbed = new MessageEmbed()

		 .setTitle('Commands for the bot :-')
		 .setDescription("\u200B")
		 .setURL("https://discord.gg/ZEgQExHnmm")
		 .setAuthor("Prototype", client.user.displayAvatarURL(), "https://discord.gg/ZEgQExHnmm")
		 .setThumbnail(client.user.displayAvatarURL())
	     .addFields(
			 { name: `Test commands:-`, value: `\u200B` },
			 { name: `/info`, value: `Information regarding the server or any user`, },
			 { name: `/help`, value: `Commands of the bot`, inline: true },
			 { name: `/des`, value: `Description of the bot`, inline: true },
			 { name: `/ping`, value: `A test command for the bot`, inline: true },
			 { name: `/fed`, value: `Feedbacks for the bot`, inline: true },
			 { name: `/tb`, value: `Just a test button command`, inline: true },
			 { name: `/timeout`, value: `Set a timeout for the user mentioned`, inline: true },
			 )
		 .setImage("attachment://prototype.png")
		 .setTimestamp()
		 .setColor("RED")
		 .setFooter("PROTOTYPE",client.user.displayAvatarURL());

		await interaction.reply({ embeds: [helpEmbed], files: [file] });
	},
};