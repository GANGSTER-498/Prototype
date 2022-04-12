const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('Set a timeout for the user mentioned')
		.addUserOption(option => option.setName("target").setRequired(true).setDescription("Mention the user"))
        .addStringOption(option => option.setName('duration').setRequired(true).setDescription('Duration For the timeout(IN MINUTES).'))
        .addStringOption(option => option.setName('reason').setRequired( true ).setDescription('The reason for the timeout')),
			
    permissions: [ Permissions.FLAGS.MODERATE_MEMBERS ],
	async execute(interaction, client) {
        const user = interaction.options.getUser('target');
        const duration = Number(interaction.options.getString('duration')*60*1000);
        const reason = interaction.options.getString('reason');
        const member = await interaction.guild.members.fetch(user.id);
        if (!member) return await interaction.reply({ content: `Either you donot have the permission to timeout the user or the user is not present in the server`, ephemeral: true });
        if (!duration) return await interaction.reply({ content: `The duration entered is not valid`, ephemeral: true });

        const embed = new MessageEmbed()
        .setTitle(`You have been put in timeout.`)
        .addField(`Duration of timeout`, `${duration} milliseconds.`);

        try{
            await member.send({ embeds: [embed] })
        } catch (error){
            console.error(`The user's DM's are off`)
        }

        try {
            await member.timeout(duration, reason);
            interaction.channel.send({ content: `${user.tag} have been put to timeout for ${reason}.`})
        } catch (error) {
            console.error(error);
        }
	},
};