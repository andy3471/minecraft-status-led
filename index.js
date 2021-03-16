const util = require('minecraft-server-util');
require('dotenv').config();

function status() {
util.status(process.env.SERVER, { port: parseInt(process.env.PORT, 10) }) // port is default 25565
    .then((response) => {
      if (response.onlinePlayers >= parseInt(process.env.EMERALD, 10) ) {
        console.log('emerald');
      } else if (response.onlinePlayers >= parseInt(process.env.DIAMOND, 10) ) {
        console.log('diamond');
      } else if (response.onlinePlayers >= parseInt(process.env.GOLD, 10) ) {
        console.log('gold');
      } else {
        console.log('iron');
      };
    })
    .catch((error) => {
      console.log('redstone');
    });
}

function run() {
  setInterval(status, parseInt(process.env.POLLRATE, 10));
}

run();