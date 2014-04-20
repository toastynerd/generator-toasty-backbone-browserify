'use strict';

var http = require('http');
var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

if (process.env.NODE_ENV === 'development') {
  app.use(express.static(__dirname + '/app/build'));
}

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('server is running on port ' + app.get('port'));
});
