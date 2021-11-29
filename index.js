const express = require('express');
const logger = require('./logger.js');
const Frontly = require('frontly');
const status = require('./web/status.html.js');
const db = require('robindb');
const fetch = require('node-fetch');
const parse = require('./parser.js');
const pinger = require('./pinger.js');
const repls = parse();
const app = express();

for (const repl of repls) {
  pinger.register(repl);
}


app.use(Frontly.middleware);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/web/index.html');
});
app.get('/keepalive', (req, res) => {
  res.send('ok');
  logger.info('Keepalive received.');
});

app.get('/status', (req, res) => {
  res.send(status(repls.map(repl => {
    repl.status = pinger.status[repl.host] ? 'online' : 'offline';
    repl.name = repl.host;
    return repl;
  }), process.env.REPL_OWNER))
});
app.get('/status.css', (req, res) => {
  res.sendFile(__dirname + '/web/status.css');
});

app.get('/favicon.png', (req, res) => {
  res.sendFile(__dirname + '/web/favicon.png');
});

app.listen(process.env.PORT || 8080, () => {
  logger.success('UptimeRepl listening on *:8080');
});

console.log('ReplAwake keeps your repls awake, but what keeps ReplAwake awake? ReplAwake contacts an external server to stay awake. In order to keep your ReplAwake instance alive, you must make sure it is hosted at https://replawake.' + process.env.REPL_OWNER.toLowerCase() + '.repl.co/.')

'';

fetch('https://replawake-server.yodacode.repl.co/' + process.env.REPL_OWNER);