const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a user stated')
        .addUserOption(option => option.setName('target').setDescription('The user You want to Kick').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for Kicking the user').setRequired(true)),
    permission: [ Permissions.FLAGS.KICK_MEMBERS ],
	async execute(interaction) {
        const User = interaction.options.getUser('target');
        const Member = await interaction.guild.members.fetch(User.id);
        if (!Member) return await interaction.reply({ content: `Either you donot have the permission to Kick the user or the user is not present in the server`, ephemeral: true });

        let reason = interaction.options.getString('reason');
        if (!reason) reason = "No reason provided.";
        await Member.send({ content: `You have been kicked from the server!\nServer : ${interaction.guild.name}\nReason: ${reason}` })
        .catch(err => console.log(`The user Dm's are off`));
        await Member.kick()
        .catch(err => console.log(`Invalid Command`));
        await interaction.reply({ content: `Succesfully Kicked: ${User.tag}`, ephemeral: true })
	},
};