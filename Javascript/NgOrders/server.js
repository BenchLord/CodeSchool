var express = require('express'),
	http = require('http');
	morgan = require('morgan');
// create a new express app
var app = express();

// serve the current directory
app.use(express.static('.'));
app.use(morgan('dev'));
// start the http server
http.createServer(app).listen(8080);