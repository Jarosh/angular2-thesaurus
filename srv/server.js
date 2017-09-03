const express = require('express');
const httpProxy = require('http-proxy');
const app = express();

const port = ( process.argv.length >= 3 && !isNaN(process.argv[2]) )
  ? parseInt(process.argv[2])
  : 3000;
const akey = ( process.argv.length >= 4 )
  ? parseInt(process.argv[3])
  : 'bPNbLXJ0tmmshm3dkk0VQOiUeiPlp186ggvjsnKnaGsiIVnGAe';
const mock = ( process.argv.length >= 5 && ( parseInt(process.argv[4]) || process.argv[4].toUpperCase()==='TRUE' ) );

var proxy = httpProxy.createProxyServer({
  secure: false
});

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('X-Mashape-Key', akey);
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Mashape-Key');
  next();
});

if (mock) {
  app.use('/words/example', express.static('mocks/word-example.json'));
  app.use('/words/work', express.static('mocks/word-work.json'));
}

app.get('/words/:word', function(req, res) {
  console.log('Proxifying: ' + req.params.word);
  proxy.web(req, res, {
    target: 'https://wordsapiv1.p.mashape.com'
  });
});

app.listen(port, function() {
  console.log('Server is listening on port ' + port);
});

module.exports = app;
