'use strict';
var bcrypt = require('bcrypt-nodejs');
var models = require('./models');

class User {

    hashPassword(password) {
        return bcrypt.hashSync(password);
    }

    comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
 
    get (id) {
        var promise = new Promise(function (resolve, reject) {
            models.User.findById(id, {
                include: [
                    { model: models.Role }
                ]
            }).then(function (model) {
                resolve(model);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    }

    getByName(name) {
        var promise = new Promise(function (resolve, reject) {
            models.User.findOne({
                where: {
                    username: name
                },
                include: [
                    { model: models.Role }
                ]
            }).then(function (model) {
                resolve(model);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    }

    save(data) {
        var promise = new Promise(function (resolve, reject) {
            new User(data).save().then(function (user) {
                resolve(user);
            }).catch(reject);
        });
        return promise;
    }

    serialize(data) {
        return {
            id: data.id,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            role: data.role,
            token: data.token
        };
    }

    serializeAuthen(data) {
        var json = JSON.stringify(data);
        var user = JSON.parse(json);
        delete user['user_role'];
        return user
    }

    serializeRegister(data) {
        return {
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            role_id: data.role_id,
            password: data.password
        };
    }

    isValidLogin(data) {
        var me = this;
        var promise = new Promise(function (resolve, reject) {
            if (!data.username) {
                reject('username is required');
            }
            else if (!data.password) {
                reject('password is required');
            }
            else {
                me.getByName(data.username).then(function (model) {
                    if (model) {
                        var user = me.serializeAuthen(model);
                        if (me.comparePassword(data.password, user.password)) {
                            delete user['password'];
                            resolve(user);
                        }
                        else {
                            reject('invalid usernam or password');
                        }
                    }
                    else {
                        reject('invalid usernam or password');
                    }
                }).catch(function (err) {
                    reject(err);
                });
            }
        });
        return promise;
    }

    isValidRegister(data) {
        var me = this;
        var promise = new Promise(function (resolve, reject) {
            if (!data.email) {
                reject('email required');
            }
            else if (!data.password) {
                reject('password required');
            }
            else if (!data.first_name) {
                reject('first name required');
            }
            else if (!data.last_name) {
                reject('last name required');
            }
            else {
                me.find(data.email).then(function (user) {
                    if (user) {
                        reject('email exist');
                    }
                    else {
                        new Role({ 'name': 'user' }).fetch().then(function (role) {
                            if (role && role.attributes) {
                                data.password = me.hashPassword(data.password);
                                data.role_id = role.attributes.id;
                                user = me.serializeRegister(data);
                                resolve(user);
                            }
                            else {
                                log.file('user role not found');
                                reject('role not found');
                            }
                        }).catch(reject);
                    }
                }).catch(function (err) {
                    log.file(err.message);
                    reject(err);
                });
            }
        });
        return promise;
    }
}

module.exports = new User();