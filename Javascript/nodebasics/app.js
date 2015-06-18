var express = require('express'),
		http = require('http'),
		jade = require('jade'),
		methodOverride = require('method-override'),
		morgan = require('morgan'),
		skipper = require('skipper');

var data = require('./data.js'),
		OrderController = require('./orderController.js'),
		Orders = require('./orders.js');

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(skipper());
app.use('/', express.static('public'));
app.use(methodOverride('_method'));

app.get('/',function(req, res){
	res.redirect('/orders');
})

app.use('/orders', require('./order.router.js'));

var server = http.createServer(app);
server.listen(8080);