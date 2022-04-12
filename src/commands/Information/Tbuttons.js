const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tb')
		.setDescription('Test buttons for the Bot'),
	async execute(interaction, client) {
		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
			.setCustomId(`working-button`)
			.setLabel(`Working Well`)
			.setStyle("SUCCESS"),

		new MessageButton()
			.setCustomId(`Improvement-button`)
			.setLabel(`Need Improvement`)
			.setStyle("DANGER"),

		new MessageButton()
			.setLabel(`Server`)
			.setStyle("LINK")
			.setURL('https://discord.gg/ZEgQExHnmm'),
		);

            

            await interaction.reply({ ephemeral: true, content: 'Your Valuable Feedback', components: [row] });
		}
	};