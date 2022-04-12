const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Warns a user')
        .addUserOption(option => option.setName("target").setRequired(true).setDescription("The user to be warned"))
        .addStringOption(option => option.setName('reason').setRequired( true ).setDescription('The reason for warning')),

	async execute(interaction) {
		const user = interaction.options.getUser('target');
        const member = await interaction.guild.members.fetch(user.id);
        if (!member) return await interaction.reply({ content: `Either you donot have the permission to warn the user or the user is not present in the server`, ephemeral: true });
        let reason = interaction.options.getString('reason');
         await member.send({ content: `You are being warned for ${reason} in ${interaction.guild.name} by ${interaction.user.username}` })
        .catch(err => console.log(`The user Dm's are off`));
        await interaction.reply({ content: `The user ${member} has been warned for ${reason}` })
	},
};