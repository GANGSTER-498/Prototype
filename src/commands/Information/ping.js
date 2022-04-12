const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('This is test command!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};