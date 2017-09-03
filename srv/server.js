const express = require('express');
const httpProxy = require('http-proxy');
const app = express();

const port = ( process.argv.length >= 3 && !isNaN(process.argv[2]) )
  ? parseInt(process.argv[2])
  : 3000;

var proxy = httpProxy.createProxyServer({
  secure: false
});


//var proxy = new httpProxy.RoutingProxy();
/*
function apiProxy(host, port) {
  return function(req, res, next) {
    if(req.url.match(new RegExp('^\/api\/'))) {
      proxy.proxyRequest(req, res, {host: host, port: port});
    } else {
      next();
    }
  }
}

app.use(express.static(process.cwd() + "/generated"));
app.use(apiProxy('localhost', 3000));
app.use(express.bodyParser());
app.use(express.errorHandler());
*/

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('X-Mashape-Key', 'bPNbLXJ0tmmshm3dkk0VQOiUeiPlp186ggvjsnKnaGsiIVnGAe');
});

app.get('/detect/what-http-headers-is-my-browser-sending', function(req, res) {
  proxy.web(req, res, {
    target: 'https://www.whatismybrowser.com'
  });
});

app.get('/words/example', function(req, res) {
  proxy.web(req, res, {
    target: 'https://wordsapiv1.p.mashape.com'
  });
});

app.listen(port, function() {
  console.log('Server is listening on port ' + port);
});

module.exports = app;
