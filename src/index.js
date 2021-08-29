//Enviroment Variables
require('dotenv').config()
const fs = require('fs');
const {Client, Intents, Collection} = require('discord.js')
const client = new Client({intents: [Intents.FLAGS.GUILDS]})

client.commands = new Collection()

const functions = fs.readdirSync('./src/functions').filter(file => file.endsWith('js'))
const events = fs.readdirSync('./src/events').filter(file => file.endsWith('js'))
const commandDir = fs.readdirSync('./src/commands')

const main = async () => {
    functions.forEach(file => {
        require(`./functions/${file}`)(client)
    })

    client.handleEvents(events, "./src/events")
    client.handleCommands(commandDir, "./src/commands")
    client.login(process.env.TOKEN)
}

main()