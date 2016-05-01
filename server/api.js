var models = require('./models');
var shortid = require('shortid');
var bcrypt = require('bcrypt-nodejs');
var User = require('./users');
var authorize = require('./auth');
var sequelize = require('./connection');
var url = require('url');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

module.exports = function () {
    var express = require('express');
    var app = express();

    //---------------------------------RESPONSE FUNCTION---------------------------------
    function serealizer(data) {
        if (!data.id) {
            if (data['null']) {
                data['id'] = data['null'];
            }
            else {
                data['id'] = 0;
            }
        }
        var json = JSON.stringify(data);
        var model = JSON.parse(json);
        if (model.user) {
            delete model.user['password'];
            delete model.user['createdAt'];
            delete model.user['updatedAt'];
        }
        if (model.category) {
            delete model.category['createdAt'];
            delete model.category['updatedAt'];
        }
        return JSON.stringify(model);
    }
    function serealizerList(collection) {
        return JSON.stringify(collection);
    }
    function responseObject(res, object) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(serealizer(object));
    }
    function responseList(res, collection) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(serealizerList(collection));
    }
    function responseMessage(res, message) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({
            error: {
                message: message
            }
        }));
    }
    function responsePermission(res) {
        res.status(401).json({
            error: {
                message: 'permission denied.'
            }
        });
    }
    function responseNotFound(res) {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).send(JSON.stringify({
            error: {
                message: 'Not found'
            }
        }));
    }
    function responseError(res, error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            error: {
                message: error
            }
        }));
    }
    function replaceAll(str, search, replacement) {
        return str.split(search).join(replacement);
    };

    //---------------------------------USERS ACCOUNTS---------------------------------
    app.post('/users', function (req, res) {
        if (req.body.username && req.body.password) {
            var user = {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password),
                email: req.body.email ? req.body.email : '',
                telephone: req.body.telephone ? req.body.telephone : '',
                user_role: 2,
                sid: shortid.generate()
            };

            models.User.findAll({ where: { username: req.body.username } })
            .then(function (users) {
                if (users.length) {
                    responseMessage(res, 'user exist');
                }
                else {
                    models.User.create(user, { isNewRecord: true })
                   .then(function (model) {
                       responseObject(res, model);
                   }).catch(function (err) {
                       responseError(res, err.message);
                   });
                }
            }).catch(function (err) {
                responseError(res, err.message);
            });
        }
        else {
            responseMessage(res, 'Username/password is required');
        }
    });
    app.post('/login', function (req, res) {
        var data = req.body;
        User.isValidLogin(data).then(function (user) {
            authorize.authorizeUser(user).then(function (token) {
                user.token = token;
                responseObject(res, user);
            }).catch(function (err) {
                responseError(response, err.message);
            });
        }).catch(function (err) {
            responseMessage(res, err.message ? err.message : err);
        });
    });
    app.post('/logout', function (req, res) {
        if (authorize.isAuthorize(req, ['administrator', 'user'])) {
            authorize.removeUser(req.user).then(function () {
                res.status(200).send('');
            }).catch(function (err) {
                responseError(response, err.message);
            });
        }
        else {
            responsePermission(res);
        }
    });
    app.get('/me', function (req, res) {
        if (authorize.isAuthorize(req, ['administrator', 'user'])) {
            responseObject(res, req.user);
        }
        else {
            responsePermission(res);
        }
    });
    /*
    app.get('/users/:id', function (req, res) {
        User.get(req.params.id).then(function (model) {
            if (model) {
                responseObject(res, model);
            }
            else {
                responseNotFound(res);
            }
        }).catch(function (err) {
            responseError(res, err.message);
        });
    });
    app.get('/users', function (req, res) {
        models.User.all().then(function (projects) {
            responseList(res, projects);
        }).catch(function (err) {
            responseError(res, err.message);
        });
    });
    */

    //---------------------------------ROLES------------------------------------------
    /*
    app.get('/roles', function (req, res) {
        models.Role.all().then(function (roles) {
            responseList(res, roles);
        }).catch(function (err) {
            responseError(res, err.message);
        });
    });
    app.post('/roles', function (req, res) {
        if (req.body.name) {
            var role = {
                name: req.body.name,
                sid: shortid.generate()
            };
            models.Role.create(role, { isNewRecord: true })
            .then(function (model) {
                responseObject(res, model);
            }).catch(function (err) {
                responseError(res, err.message);
            });
        }
        else {
            responseMessage(res, 'Name is required');
        }
    });*/

    //--------------------------------CATEGORY----------------------------------------
    app.get('/categories', function (req, res) {
        models.Category.all().then(function (categories) {
            responseList(res, categories);
        }).catch(function (err) {
            responseError(res, err.message);
        });
    });
    /*
    app.patch('/categories', function (req, res) {
        if (req.body.id) {
            var category = req.body;
            models.Category.findById(category.id).then(function (resCategory) {
                if (resCategory) {
                    resCategory.updateAttributes(category).then(function (model) {
                        responseObject(res, model);
                    }).catch(function () {
                        responseError(res, err.message);
                    });
                }
                else {
                    responseNotFound(res);
                }
            }).catch(function (err) {
                responseError(res, err.message);
            });
        }
    });
    app.post('/categories', function (req, res) {
        if (req.body.name && req.body.sid) {
            var category = {
                name: req.body.name,
                sid: req.body.sid,
                description: req.body.description ? req.body.description : '',
                icon: req.body.icon?req.body.icon:''
            };
            models.Category.create(category, { isNewRecord: true })
            .then(function (model) {
                responseObject(res, model);
            }).catch(function (err) {
                responseError(res, err.message);
            });
        }
        else {
            responseMessage(res, 'name and sid is required');
        }
    });
    app.delete('/categories/:id', function (req, res) {
        if (req.params.id) {
            models.Category.destroy({ where: { id: req.params.id } })
            .then(function (model) {
                responseObject(res, model);
            }).catch(function (err) {
                responseError(res, err.message);
            });
        }
        else {
            responseMessage(res, 'id is required');
        }
    });
    */

    //---------------------------------TOPICS-----------------------------------------
    app.get('/topics', function (req, res) {

        var url_params = url.parse(req.url, true);
        var queries = url_params.query;
        var p = 1;
        var limits = 30;
        if (queries['p']) {
            p = parseInt(queries['p']);
        }
        var skip = limits * (p - 1);

        models.Topic.findAll({
            order: [["createdAt","DESC"]],
            include: [
                { model: models.User },
                { model: models.Category },
                { model: models.Comment, attributes: ['id'] }
            ],
            offset: skip,
            limit: limits
        }).then(function (topics) {
            responseList(res, topics);
        }).catch(function (err) {
            responseError(res, err.message);
        });
    });
    app.post('/topics', function (req, res) {
        if (authorize.isAuthorize(req, ['administrator', 'user'])) {
            if (req.body.title && req.body.message && req.body.category) {
                var topic = {
                    title: req.body.title,
                    message: req.body.message,
                    topic_category: req.body.category,
                    post_by: req.user.id,
                };
                topic.sid = shortid.generate();
                models.Topic.create(topic, { isNewRecord: true })
                .then(function (model) {
                    responseObject(res, model);
                }).catch(function (err) {
                    responseError(res, err.message + ', maybe check topic_category');
                });
            }
            else {
                responseMessage(res, 'title/message/topic_category is required');
            }
        }
        else {
            responsePermission(res);
        }
    });
    app.get('/topics/:id', function (req, res) {
        models.Topic.findOne({
            where: { sid: req.params.id },
            include: [
                { model: models.User },
                { model: models.Category }
            ]
        }).then(function (model) {
            if (model) {
                responseObject(res, model);
            }
            else {
                responseNotFound(res);
            }
        }).catch(function (err) {
            responseError(res, err.message);
        });
    });
    app.get('/category/topics/:id', function (req, res) {

        var url_params = url.parse(req.url, true);
        var queries = url_params.query;
        console.log(queries);
        var p = 1;
        var limits = 50;
        if (queries['p']) {
            p = parseInt(queries['p']);
        }
        var skip = limits * (p - 1);

        models.Topic.findAll({
            order: [["createdAt", "DESC"]],
            where: { topic_category: req.params.id },
            include: [
                { model: models.Category },
                { model: models.User, attributes: ['id', 'username'] },
                { model: models.Comment, attributes: ['id'] }
            ],
            offset: skip,
            limit: limits
        }).then(function (model) {
            if (model) {
                responseList(res, model);
            }
            else {
                responseNotFound(res);
            }
        }).catch(function (err) {
            responseError(res, err.message);
        });
    });

    //---------------------------------COMMENTS---------------------------------------
    app.get('/comments/topic/:id', function (req, res) {
        models.Comment.findAll({
            where: { topic_id: req.params.id },
            include: [
                { model: models.User, attributes: ['id', 'username'] }
            ]
        }).then(function (model) {
            if (model) {
                responseList(res, model);
            }
            else {
                responseNotFound(res);
            }
        }).catch(function (err) {
            responseError(res, err.message);
        });
    });
    app.post('/comments', function (req, res) {
        if (authorize.isAuthorize(req, ['administrator', 'user'])) {
            if (req.body.topic_id && req.body.message) {
                var comment = req.body;
                comment.post_by = req.user.id;
                models.Comment.create(comment, { isNewRecord: true })
                .then(function (model) {
                    responseObject(res, model);
                }).catch(function (err) {
                    responseError(res, err.message + ', maybe check post_by and topic_id');
                });
            }
            else {
                responseMessage(res, 'topic/message/post_by is required');
            }
        }
        else {
            responsePermission(res);
        }
    });


    //---------------------------------ANNOUNCES---------------------------------------
    app.get('/announces', function (req, res) {
        models.Announce.findAll({
            where: { is_active: true },
            include: [
                { model: models.User, attributes: ['id', 'username'] }
            ]
        }).then(function (model) {
            if (model) {
                responseList(res, model);
            }
            else {
                responseNotFound(res);
            }
        }).catch(function (err) {
            responseError(res, err.message);
        });
    });
    app.post('/announces', function (req, res) {
        if (authorize.isAuthorize(req, ['administrator'])) {
            if (req.body.title && req.body.message) {
                var announce = {};
                announce.title = req.body.title;
                announce.message = req.body.message;
                announce.post_by = req.user.id;
                announce.is_active = true;
                models.Announce.create(announce, { isNewRecord: true })
                .then(function (model) {
                    responseObject(res, model);
                }).catch(function (err) {
                    responseError(res, err.message);
                });
            }
            else {
                responseMessage(res, 'title, message are required');
            }
        }
        else {
            responsePermission(res);
        }
    });
    app.patch('/announces', function (req, res) {
        if (authorize.isAuthorize(req, ['administrator'])) {
            var announce = req.body;
            models.Announce.findById(announce.id).then(function (resAnnouncey) {
                if (resAnnouncey) {
                    resAnnouncey.updateAttributes(announce).then(function (model) {
                        responseObject(res, model);
                    }).catch(function () {
                        responseError(res, err.message);
                    });
                }
                else {
                    responseNotFound(res);
                }
            }).catch(function (err) {
                responseError(res, err.message);
            });
        }
        else {
                responsePermission(res);
        }
    });
    return app; 
}();