/**
 * Created by ticup on 09/04/15.
 */
var fs = require('fs');
var util = require('util');


var users = require('../data/users.json');


function setupConnection(io) {
    io.on('connection', function (socket) {
        var registered, user;

        socket.on('refresh', function (data, finish) {
            console.log('REFRESH: ');
            console.log(util.inspect(data, 2));
            if (data.id) {
                user = users[data.firstName + data.lastName];
                if (user && user.id === data.id) {
                    registered = true;
                    return finish(null, data.id);
                }
            }
            return finish("error");
        });

        socket.on('register', function (data, finish) {
            console.log('REGISTER: ');
            console.log(util.inspect(data, 2));
            console.log(users);

            if (!data.firstName || !data.lastName) {
                return finish("Sorry, but we require your name.");
            }

            if (users[data.firstName + data.lastName]) {
                return finish("Sorry, a user with that name is already registered.");
            }

            data.id = socket.id;
            users[data.firstName+data.lastName] = data;
            user = data;
            registered = true;
            finish(null, socket.id);
        });
    });
}

module.exports = setupConnection;
