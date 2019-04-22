const mongoose = require("mongoose");
var creandoUnBotSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    prefix: {//En este episodio usaremos la base de datos para guardar un prefix
        type: String,
        default: "/"
    }
});

var servers = mongoose.model('Servidores', creandoUnBotSchema);
module.exports = servers;