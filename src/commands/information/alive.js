const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('alive')
        .setDescription('Am i alive (?)'),
    async execute(interaction){
        await interaction.reply('Yes i am alive')
    }
}