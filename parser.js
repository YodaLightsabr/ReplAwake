const fs = require('fs');
const user = process.env.REPL_OWNER;
module.exports = () => {
  const data = fs.readFileSync('.replconfig', 'utf8');
  let lines = data.split('\n');
  if (process.env.X_AWAKE_REPLS) {
    process.env.X_AWAKE_REPLS.split(',').forEach(repl => {
      lines.push(repl);
    });
  }
  lines = lines.map(line => {
    if (line.includes('#')) {
      line = line.substring(0, line.indexOf('#'));
    }
    return line.trim();
  }).filter(line => line).map(line => {
    let interval = 1;
    let host = '';
    let path = [];
    if (line.includes('@')) {
      interval = parseInt(line.split('@')[1]);
      line = line.split('@')[0];
    }
    if (line.includes('/')) {
      let list = line.split('/');
      host = list.shift();
      path = list;
    } else {
      host = line;
    }
    const url = `https://${host.toLowerCase()}.${user.toLowerCase()}.repl.co/${path.join('/')}`;
    return {
      interval: interval,
      host: host,
      path: path,
      url: url
    }
  });
  return lines;
}