require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();
const buildFolder = path.join(__dirname, './dist');
const namespace = process.env.BASE_URL || '/';
const httpPort = process.env.SERVER_HTTP_PORT || 8888;

app.get(namespace + '/manifest.json', (req, res, next) => {
  res.send({
    name: 'documentation-web',
    short_name: 'documentation-web',
    icons: [],
    start_url: namespace,
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#FFFFFF',
  });
});

app.get(namespace + '/', (req, res) => {
  const indexHtmlPath = path.join(buildFolder, 'index.html');
  res.sendFile(indexHtmlPath);
});

app.use(express.static(buildFolder));

app.listen(httpPort, () => {
  console.log(`[${Date.now()}] Server listen on port ${httpPort}`);
});
