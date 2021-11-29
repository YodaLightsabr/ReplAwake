const logger = require('./logger.js');
const fetch = require('node-fetch');

class Pinger {
  constructor () {
    this.repls = [];
    this.status = {};
  }
  async register (repl) {
    this.repls.push(repl);
    this.status[repl.host] = false;
    setInterval(async () => {
      logger.info('Pinging', repl.url);
      let online = true;
      let response = await fetch(repl.url);
      let status = response.status;
      if (response.status >= 400) {
        online = false;
      }
      this.status[repl.host] = online;
    }, repl.interval * 60000);
    logger.info('Pinging', repl.url);
    let online = true;
    let response = await fetch(repl.url);
    let status = response.status;
    if (response.status >= 400) {
      online = false;
    }
    this.status[repl.host] = online;
  }
}

module.exports = new Pinger();