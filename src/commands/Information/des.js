const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('des')
		.setDescription('Deccription of The bot'),
	async execute(interaction) {
		await interaction.reply("I am a prototype for all other discord bot comming in near future, donot ping Gangster if I am not working well");
	},
};