'use strict';

function scrollChatBottom() {
    const target = $('#message-box-id')[0];
    target.scrollTo(0, target.scrollHeight)
}

// 入室メッセージをサーバに送信する
const userName = $('#userName').val();
// 入室メッセージイベントを送信する
socket.emit("sendEnterEvent", { userName });

// サーバから受信した入室メッセージを画面上に表示する
socket.on('receiveEnterEvent', function (data) {
    $('#thread').append(`<div class="chat-notice"><span>${data.userName}が入室しました</span></div>`);
    scrollChatBottom();
});
