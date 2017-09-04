const express = require('express');
const httpProxy = require('http-proxy');
const storage = require('node-persist');
const util = require('util');
const config = require('./config');
const app = express();

const port = process.env.PORT || ( ( process.argv.length >= 3 && !isNaN(process.argv[2]) )
  ? parseInt(process.argv[2])
  : config.arg.port
);
const akey = process.env.AKEY || ( ( process.argv.length >= 4 )
  ? process.argv[3]
  : config.arg.akey
);
const mock = process.env.MOCK || ( process.argv.length >= 5 && ( parseInt(process.argv[4]) || process.argv[4].toUpperCase()==='TRUE' ) );

storage.initSync({
  dir: config.dirs.cache
});

var proxy = httpProxy.createProxyServer({
  secure: false
});

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('Host', config.api.host);
  proxyReq.setHeader('Accept', 'application/json');
  proxyReq.setHeader('Accept-Encoding', 'gzip;q=0,deflate,sdch');
  proxyReq.setHeader('X-Mashape-Key', akey);
});

proxy.on('proxyRes', function(proxyRes, req, res) {
  if (proxyRes.statusCode===200) {
    var body = '';
    proxyRes.setEncoding('utf-8');
    proxyRes.on('data', function(data) {
      body += data.toString('utf-8');
    });
    proxyRes.on('end', function() {
      storage.setItemSync(req.params.word, JSON.parse(body));
    });
  }
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', config.cors.origin);
  res.header('Access-Control-Allow-Methods', config.cors.methods);
  res.header('Access-Control-Allow-Headers', config.cors.headers);
  next();
});

if (mock) {
  config.mocked.forEach((word) => {
    app.use('/words/'+word, express.static('srv/mocks/word-'+word+'.json'));
  });
}

app.get('/words/:word', function(req, res) {
  var cached = storage.getItemSync(req.params.word);
  if (cached) {
    console.log('Serving from cache: ' + req.params.word);
    res.json(cached);
  } else {
    console.log('Proxifying to WordsAPI: ' + req.params.word);
    proxy.web(req, res, {
      target: config.api.scheme+'://'+config.api.host
    });
  }
});

app.listen(port, function() {
  console.log('Server is listening on port ' + port);
});

module.exports = app;
