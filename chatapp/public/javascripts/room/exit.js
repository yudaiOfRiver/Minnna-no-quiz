'use strict';

function scrollChatBottom() {
    const target = $('#message-box-id')[0];
    target.scrollTo(0, target.scrollHeight)
}

// 退室メッセージをサーバに送信する
function exit() {
    // ユーザ名取得
    // const userName = $('#userName').val();
    // 退室メッセージイベントを送信する
    // socket.emit("sendExitEvent", { userName })
    // 退室
    location.href = '/';
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('receiveExitEvent', function (data) {
    $('#thread').append(`<div class="chat-notice"><span>${data.userName}が退室しました</span></div>`);
    scrollChatBottom()
});
