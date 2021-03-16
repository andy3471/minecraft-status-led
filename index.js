const util = require('minecraft-server-util');
require('dotenv').config();


util.status(process.env.SERVER, { port: parseInt(process.env.PORT, 10) }) // port is default 25565
    .then((response) => {
        console.log(response.onlinePlayers);
    })
    .catch((error) => {
        console.error(error);
    });