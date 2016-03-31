var models = require('./models');
var shortid = require('shortid');
var bcrypt = require('bcrypt-nodejs');
var User = require('./users');
var authorize = require('./auth');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

module.exports = function () {
    var express = require('express');
    var app = express();

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
        console.log(model);
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

    //ACCOUNTS
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
            responseError(res, err.message?err.message:err);
        });
    });

    app.get('/me', function (req, res) {
        if (authorize.isAuthorize(req, ['administrator', 'user'])) {
            responseObject(res, req.user);
        }
        else {
            responsePermission(res);
        }
    });

    //USERS
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

    app.post('/users', function (req, res) {
        if (req.body.username && req.body.password && req.body.email) {
            var user = {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password),
                email: req.body.email,
                user_role: 14,
                sid: shortid.generate()
            };
            models.User.create(user, { isNewRecord: true })
            .then(function (model) {
                responseObject(res, model);
            }).catch(function (err) {
                responseError(res, err.message);
            });
        }
        else {
            responseMessage(res, 'Username/password/email is required');
        }
    });

    app.post('/users', function (req, res) {
        if (req.body.username && req.body.password && req.body.email) {
            var user = {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password),
                email: req.body.email,
                user_role: 14,
                sid: shortid.generate()
            };
            models.User.create(user, { isNewRecord: true })
            .then(function (model) {
                responseObject(res, model);
            }).catch(function (err) {
                responseError(res, err.message);
            });
        }
        else {
            responseMessage(res, 'Username/password/email is required');
        }
    });

    //ROLES
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
    });

    //CATEGORY
    app.get('/categories', function (req, res) {
        models.Category.all().then(function (categories) {
            responseList(res, categories);
        }).catch(function (err) {
            responseError(res, err.message);
        });
    });

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
            var sid = req.body.sid;
            sid = replaceAll(sid, '(', '');
            sid = replaceAll(sid, ')', '');
            sid = replaceAll(sid, '.', '');
            sid = replaceAll(sid, ' & ', '-');
            sid = replaceAll(sid, ' ', '-');
            sid = replaceAll(sid, '/', '-');
            sid = replaceAll(sid, ',', '-');
            sid = sid.toLowerCase();
            var category = {
                name: req.body.name,
                sid: sid,
                description: req.body.description ? req.body.description : ''
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

    //TOPICS
    app.post('/topics', function (req, res) {
        console.log(req.body);
        if (req.body.title && req.body.message && req.body.post_by && req.body.topic_category) {
            var topic = req.body;
            topic.sid = shortid.generate();
            models.Topic.create(topic, { isNewRecord: true })
            .then(function (model) {
                responseObject(res, model);
            }).catch(function (err) {
                responseError(res, err.message + ', maybe check post_by and topic_category');
            });
        }
        else {
            responseMessage(res, 'title/message/post_by/topic_category is required');
        }
    });

    app.get('/topics/:id', function (req, res) {
        console.log(req.params);
        models.Topic.findById(req.params.id, {
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

    app.get('/topics/category/:id', function (req, res) {
        console.log(req.params);
        models.Topic.findAll({
            where: { topic_category: req.params.id },
            include: [
                { model: models.User, attributes: ['id','username', 'email'] }
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

    //TOPICS
    app.post('/comments', function (req, res) {
        if (req.body.topic_id && req.body.message && req.body.post_by) {
            var comment = req.body;
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
    });

    app.get('/comments/topic/:id', function (req, res) {
        models.Comment.findAll({
            where: { topic_id: req.params.id},
            include: [
                { model: models.User, attributes: ['id', 'username', 'email'] },
            ]}).then(function (model) {
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

    return app; 
}();