const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fed')
		.setDescription('Feedback'),
	async execute(interaction, client) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('Choose-option')
            .setPlaceholder('Nothing is selected')
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions([
                {
                    label: 'Working well',
                    description: 'The bot is working well',
                    value: 'first_option',
                },
                {
                    label: 'Need Improvement',
                    description: 'The bot needs improvement',
                    value: 'second_option',
                },
            ])
            );

            const embed = new MessageEmbed()
			.setColor('#ff0000')
			.setTitle('FEEDBACK')
			.setURL("https://discord.gg/ZEgQExHnmm")
			.setDescription('1 feedback = 1 improvement');

            await interaction.reply({ ephemeral: true, content: 'Your Valuable Feedback', components: [row] });
		}
	};