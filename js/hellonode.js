var http = require('http');
var irc = require('irc'); //https://www.npmjs.com/package/irc

var client = new irc.Client('irc.freenode.net', 'BrokenBot', {
    channels: ['#gobotter'],
});

client.addListener('error', function(message) {
    console.log('error: ', message);
});

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Hello Http');
});
server.listen(8080);
