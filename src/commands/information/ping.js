const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Test the bot response'),
    async execute(interaction){
        await interaction.reply('Pong!')
    }
}