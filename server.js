'use strict';
var express = require('express');
var app = express();
var Connection = require('tedious').Connection;
var bodyParser = require('body-parser');
var api = require('./server/api');
app.set('port', (process.env.PORT || 8000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/libs', express.static(__dirname + '/node_modules'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/img', express.static(__dirname + '/client/img'));
app.use('/favicon.ico', express.static(__dirname + '/client/img/favicon.ico'));
app.use('/fonts', express.static(__dirname + '/client/fonts'));
app.use('/resources', express.static(__dirname + '/client/resources'));
app.use(bodyParser.json());
app.use('/api/v1', api);

app.get('/', function (req, res) {
	res.status(200).render('index.html');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('error');
});

app.listen(app.get('port'), function () {
    console.log('App is running on port ' + app.get('port'));
});


 