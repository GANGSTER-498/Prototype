const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('unban a ID stated')
        .addUserOption(option => option.setName('target').setDescription('The user id You want to unban').setRequired(true)),
        // .addStringOption(option => option.setName('reason').setDescription('The reason for baning the user'))
    permission: [ Permissions.FLAGS.BAN_MEMBERS ],
	async execute(interaction) {
        const userID = interaction.options.getUser('target');
        // let reason = interaction.options.getString('reason');
        // if (!reason) reason = "No reason provided.";
        
        await interaction.guild.bans.fetch()
        .then(async bans =>{
            if (bans.size == 0) return await interaction.reply({ content: `There is nobody banned from this server.`, ephemeral: true })
            let bannedId = bans.find(ban => ban.user.id == userID)
            if (!bannedId) return await interaction.reply({ content: `The provided ID is invalid or the ID stated is not banned from the server`, ephemeral: true })
            await interaction.guild.bans.remove(userID).catch(err => console.error(err))
            await interaction.reply({ content: `User ID: ${userID} was successfully unbaned.`, ephemeral: true })
        })
          .catch(err => console.error(err))
	},
};