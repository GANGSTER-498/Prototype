const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a user stated')
        .addUserOption(option => option.setName('target').setDescription('The user You want to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for baning the user').setRequired(true)),
    permission: [ Permissions.FLAGS.BAN_MEMBERS ],
	async execute(interaction) {
        const banUser = interaction.options.getUser('target');
        const banMember = await interaction.guild.members.fetch(banUser.id);
        if (!banMember) return await interaction.reply({ content: `Either you donot have the permission to Ban the user or the user is not present in the server`, ephemeral: true });

        let reason = interaction.options.getString('reason');
        // if (!reason) reason = "No reason provided.";
        await banMember.send({ content: `You have been ban from the server!\nServer : ${interaction.guild.name}\nReason: ${reason}` })
        .catch(err => console.log(`The user Dm's are off`));
        await banMember.ban({ days: 7, reason: reason })
        .catch(err => console.log(`Invalid no. of days provided`));
        await interaction.reply({ content: `Succesfully Banned: ${banUser.tag}`, ephemeral: true })
	},
};