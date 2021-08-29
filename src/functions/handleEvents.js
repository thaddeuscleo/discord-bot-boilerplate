module.exports = (client) => {
    client.handleEvents = async (eventFiles, path) => {
        eventFiles.forEach(file => {
            const event = require(`../events/${file}`)
            if(event.once){
                client.once(event.name, (...args) => {
                    event.execute(...args, client)
                })
            } else {
                client.on(event.name, (...args) => {
                    event.execute(...args, client)
                })
            }
        });
    }
}