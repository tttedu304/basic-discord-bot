/*
    Evento message:
        Todo lo relacionado con mensajes en Discord
*/
module.exports = async (client, message) => {
    let sv = await client.db.findOne({ _id: message.guild.id });
    if (!sv) {
        let nuevaGuild = new client.db({
            _id: message.guild.id,
        });
        await nuevaGuild.save();
    } else {
        if (message.author.bot) return; //Si el autor del mensaje es un bot, no devuelve nada.
        //Agregaremos un prefix a nuestro bot
        if (message.content.indexOf(sv.prefix) !== 0) return; //Verifica si el prefix esta antes que otra palabra.
        //Agregaremos las variables args y command, estaran en la descripcion para que las puedan copiar
        const args = message.content.slice(sv.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        //Ahora los comandos
        const cmd = client.commands.get(command);
        //Ahora que hacer si no encuentra el comando
        if (!cmd) return; //Si no quieren que el bot mande un mensaje, lo dejan asi
        cmd.run(client, message, args);//Corremos el comando
    }
}