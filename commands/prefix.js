exports.run = async (client, message, args) => {
    let sv = await client.db.findOne({ _id: message.guild.id }); //Se llama a la base de datos
    if (!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("No tienes permisos"); //Si el usuario no tiene permiso de administrador
    if (!args[0]) return message.channel.send(`No has proporcionado ningun prefix\n\nModo de uso: ${sv.prefix}prefix <prefix>`); //Si no proporciono un prefix para cambiar
    sv.prefix = args.join(" "); //Cambia el antiuguo prefix por el que cambio
    try {

        sv.save(); //Guarda los cambios en la base de datos
        message.channel.send("Se ha guardado el nuevo prefix correctamente en la base de datos");
    } catch (err) {
        console.log(err);
        message.channel.send(`Un error ha ocurrido\n\n${err.toString()}`)
    }
}