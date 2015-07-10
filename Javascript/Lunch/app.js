var express = require('express');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://neon/brandonbench');

var app = express();

app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static('public'));

app.set('views', './templates');
app.set('view engine', 'jade');

app.get('/', function(req, res){
	res.render('index');
});

app.get('/jquery', function(req, res){
	res.render('jquery');
});

app.get('/ngrestaurants', function(req,res){
	res.render('ng');
})

app.use('/', require('./routes/restaurants.js'));

var server = app.listen('1337', function(){
	console.log('Server Running...');
});