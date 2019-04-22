const Discord = require("discord.js"); //Llamamos al paquete de Discord
const client = new Discord.Client(); //Llamamos a la clase "Client"
const { token } = require("./config.json"); //Archivo de las variables
//La token es la parte más secreta de su bot, si alguien la adqueire podria tener consecuencias terribles para ti.
const Enmap = require("enmap"); //Llamamos al pacakage de enmap
const fs = require("fs"); //fs es un paquete que ya viene instalado automaticamente con nodejs
const config = require("./config.json"); //Asi exportamos el archivo config a todas partes
const mongoose = require("mongoose");
client.config = config;

//Ahora los eventos iran en archivos separados, no aqui
fs.readdir("./events/", (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

//Ahora haremos el command handler, este es para los comandos
client.commands = new Enmap()
fs.readdir("./commands/", (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Se esta cargando el comando: ${commandName}`);
        client.commands.set(commandName, props);
    });
});


/*
Conectamos con la base de datos
*/
mongoose.connect(config.mongouri, { useNewUrlParser: true });

client.db = require("./database.js");

/*
    Prendemos el bot
*/
client.login(token);

//Este será el package que estaremos usando, asi que hay que instalarlo