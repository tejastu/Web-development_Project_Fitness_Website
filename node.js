var http = require(‘http’);
var url = require(‘url’);
var server = http.createServer(function(request, response) {
  if (request.method === ‘GET’) {
    var parsedURL = url.parse(request.url, true);
    var path = parsedURL.pathname;
    var date = new Date(parsedURL.query.iso);
    if (path === ‘/api/parsetime’) {
      var output = { hour: date.getHours(),
                     minute: date.getMinutes(),
                     second: date.getSeconds()
      };
    } else if (path === ‘/api/unixtime’) {
      var output = {unixtime: date.getTime()};
    }
    if (output) {
      response.writeHead(200, {‘content-type’: ‘application/json’});
      response.end(JSON.stringify(output));
    }
  }
});
server.listen(process.argv[2]);