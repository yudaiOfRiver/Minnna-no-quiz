'use strict';

module.exports = function (server) {

    const socketIo = require('socket.io')(server, { wsEngine: 'ws' });
    const io = socketIo.listen(server);

    io.sockets.on('connection', function (socket) {
        console.log('connect');
        console.log(socket.id);

        // 投稿モジュールの呼出
        require('./publish')(socket, io);

        // 入出管理モジュールの呼出
        require('./entranceManagement')(socket, io);
    });
};
