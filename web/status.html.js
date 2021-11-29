module.exports = (sites, owner) => (`
  <!DOCTYPE html>
  <html>
    <head>
      <title>${owner} | ReplAwake</title>
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="/status.css">
      <link rel="shortcut icon" href="/favicon.png">
      <link rel="icon" href="/favicon.png">
      <link rel="favicon" href="/favicon.png">
    </head>
    <body>
      <div class="header">
        <div class="name">
          <h1>${owner}</h1>
        </div>
        <h2>Service status</h2>
        <p class="subtitle">ReplAwake</p>
      </div>
      ${sites.map(site => {
        return `      
          <div class="card">
            <div class="innerCard">
              <div class="dot${site.status == 'offline' ? ' offline' : ''}"></div><h1><span class="service">${site.name}</span> is <span class="${site.status}">${site.status == 'online' ? 'operational': 'down'}</span></h1>
            </div>
          </div>
          <br>
        `;
      })}
    </body>
  </html>
`);