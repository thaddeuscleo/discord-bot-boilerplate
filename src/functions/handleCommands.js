const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const clientId = '879606997169864714';
const guildId = '766288148254425089';

module.exports = (client) => {
    client.handleCommands = async (commandFolder, path) => {
        client.commandArr = []

        commandFolder.forEach(folder => {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'))

            commandFiles.forEach(file => {
                const command = require(`../commands/${folder}/${file}`)
                client.commands.set(command.data.name, command)
                client.commandArr.push(command.data.toJSON())
            })
        })

        const rest = new REST({
            version: '9'
        }).setToken(process.env.TOKEN)

        registerCommand(rest, client)
    }
}

const registerCommand = async (rest, client) => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId), {
            body: client.commandArr
        });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}