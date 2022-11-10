'use strict';

module.exports = function (socket, io) {

  async function getConnectedUserNames() {
    const participants = [];
    await io.sockets.clients((_, ids) => {
      for (let id of ids) {
        const userName = io.sockets.connected[id].userName
        if (userName) participants.push(userName);
      }
    })
    return participants;
  }

  // 入室メッセージをクライアントに送信する
  socket.on('sendEnterEvent', async function (data) {
    socket.userName = data.userName;
    socket.broadcast.emit("receiveEnterEvent", data)
    const participants = await getConnectedUserNames();
    io.sockets.emit('responseParticipants', participants)
  });

  socket.on('requestParticipants', async function () {
    const participants = await getConnectedUserNames();
    socket.emit("responseParticipants", participants)
  });

  // 退室メッセージをクライアントに送信する
  socket.on('disconnect', async function () {
    console.log(socket.userName + "が退室しました");
    if (!socket.userName) return;
    socket.broadcast.emit("receiveExitEvent", { userName: socket.userName })
    const participants = await getConnectedUserNames();
    io.sockets.emit('responseParticipants', participants)
  });
};
