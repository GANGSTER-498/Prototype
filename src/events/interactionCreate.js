module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (interaction.isCommand()){

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {

			if (command.permissions && command.permissions.length > 0) {
				if (!interaction.member.permissions.has(command.permissions)) return await interaction.reply({ content: `You donot have the permission to use this command.` });
			}

			await command.execute(interaction, client);
		} catch (error) {
			console.error(error);
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true
			});
		}
		} else if (interaction.isSelectMenu()) {
			if (interaction.customId === 'Choose-option') {
				await interaction.reply({ ephemeral: true, content: `Thank You for your Feedback` });
		}
		}else if (interaction.isButton()){
			if (interaction.customId.includes('-button')){
				if(interaction.customId.includes('working')){
					await interaction.reply({ ephemeral: true, content: 'Thank you for the feedback' });
				} else if(interaction.customId.includes('Improvement')){
					await interaction.reply({ ephemeral: true, content: 'Thank you for the feedback' });
				}
			}
		}
},
};