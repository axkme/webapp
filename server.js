'use strict';
var express = require('express');
var ejs = require('ejs');
var fs = require('fs');
var app = express();
var Connection = require('tedious').Connection;
var bodyParser = require('body-parser');
var api = require('./server/api');
var seo = require('./config/seo');
var sitemap = require('./server/sitemap');
var models = require('./server/models');
var helpers = require('./server/helpers');
app.set('port', (process.env.PORT || 8000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.use('/libs', express.static(__dirname + '/node_modules'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/img', express.static(__dirname + '/client/img'));
app.use('/favicon.ico', express.static(__dirname + '/client/img/favicon.ico'));
app.use('/fonts', express.static(__dirname + '/client/fonts'));
app.use('/resources', express.static(__dirname + '/client/resources'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/ng2-cookies', function (req, res) {
    fs.readFile(__dirname + '/node_modules/ng2-cookies' + req.url + '.ts', function (err, data) {
        res.status(200).send(data);
    });
});
app.use('/topics/ng2-cookies/', function (req, res) {
    fs.readFile(__dirname + '/node_modules/ng2-cookies' + req.url + '.ts', function (err, data) {
        res.status(200).send(data);
    });
});
app.use('/categories/ng2-cookies/', function (req, res) {
    fs.readFile(__dirname + '/node_modules/ng2-cookies' + req.url + '.ts', function (err, data) {
        res.status(200).send(data);
    });
});
app.use(bodyParser.json());
app.use('/api/v1', api);

app.get('/', function (req, res) {
    res.status(200).render('index.html', { seo: seo });
});

app.get('/agreement', function (req, res) {
    res.status(200).render('agreement.html', { seo: seo });
});
app.get('/announces/:id', function (req, res) {
    models.Announce.findOne({
        where: { id: req.params.id }
    }).then(function (model) {
        if (model) {
            seo.model = model.dataValues;
            res.status(200).render('announce.html', { seo: seo });
        }
        else {
            res.status(404).render('404.html');
        }
    }).catch(function (err) {
        res.status(500).render('500.html');
    });
});
app.get('/topics/:id', function (req, res) {
    models.Topic.findOne({
        where: { sid: req.params.id }
    }).then(function (model) {
        if (model) {
            seo.model = model.dataValues;
            res.status(200).render('topic.html', { seo: seo });
        }
        else {
            res.status(404).render('404.html');
        }
    }).catch(function (err) {
        res.status(500).render('500.html');
    });
});
app.get('/categories/:id', function (req, res) {
    models.Category.findOne({
        where: { id: req.params.id }
    }).then(function (model) {
        if (model) {
            seo.model = model.dataValues;
            seo.model.keywords = helpers.replaceAll(seo.model.name, ' ', ', ');
            res.status(200).render('category.html', { seo: seo });
        }
        else {
            res.status(404).render('404.html');
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).render('500.html');
    });
});

app.get('/top-month', function (req, res) {
    res.status(200).render('top-month.html', { seo: seo });
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('error');
});

app.get('/googlecfe164b64a915d4d.html', function (req, res) {
    res.status(200).render('googlecfe164b64a915d4d.html');
});

app.get('/sitemap.xml', function (req, res) {
    sitemap().then(function (st) {
        st.toXML(function (err, xml) {
            if (err) {
                return res.status(500).end();
            }
            res.header('Content-Type', 'application/xml');
            res.send(xml);
        });
    }).catch(function () {
        res.status(500).send('error');
    });
});

app.listen(app.get('port'), function () {
    console.log('App is running on port ' + app.get('port'));
});


 