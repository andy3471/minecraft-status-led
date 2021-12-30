const util = require('minecraft-server-util');
require('dotenv').config();

var ws281x = require('rpi-ws281x-native');

var NUM_LEDS = parseInt(24, 10),
    pixelData = new Uint32Array(NUM_LEDS);

var brightness = 128;

ws281x.init(NUM_LEDS);

var lightsOff = function () {
  for (var i = 0; i < NUM_LEDS; i++) {
    pixelData[i] = color(0, 0, 0);
  }
  ws281x.render(pixelData);
  ws281x.reset();
}

var signals = {
  'SIGINT': 2,
  'SIGTERM': 15
};

function shutdown(signal, value) {
  console.log('Stopped by ' + signal);
  lightsOff();
  process.nextTick(function () { process.exit(0); });
}

Object.keys(signals).forEach(function (signal) {
  process.on(signal, function () {
    shutdown(signal, signals[signal]);
  });
});

// ---- animation-loop
var offset = 0;




// generate integer from RGB value
function color(r, g, b) {
  r = r * brightness / 255;
  g = g * brightness / 255;
  b = b * brightness / 255;
  return ((g & 0xff) << 16) + ((r & 0xff) << 8) + (b & 0xff);
}

function setLights(color) {
  for (var i = 0; i < NUM_LEDS; i++) {
    pixelData[i] = color;
  }

  offset = (offset + 1) % 256;
  ws281x.render(pixelData);
}

function status() {
util.status(process.env.SERVER, { port: parseInt(process.env.PORT, 10) }) // port is default 25565
    .then((response) => {
	console.log(response)
      if (response.onlinePlayers >= parseInt(process.env.EMERALD, 10) ) {
		console.log('emerald');
        setLights(color(66,238,130));
      } else if (response.onlinePlayers >= parseInt(process.env.DIAMOND, 10) ) {
		console.log('diamond');
        setLights(color(139,244,227));
      } else if (response.onlinePlayers >= parseInt(process.env.GOLD, 10) ) {
		console.log('gold');
        setLights(color(239,202,53));
      } else {
		console.log('iron');
		setLights(color(181,154,136));
      };
    })
    .catch((error) => {
		console.log(error)
      console.log('redstone');
	  setLights(color(255,0,0));
    });
}

function run() {
  setInterval(status, parseInt(process.env.POLLRATE, 10));
}

setLights(color(0,0,255));
run();