'use strict';

let participants = [];
socket.emit('requestParticipants');

socket.on('responseParticipants', function (data) {
    participants = data
});

setHeight();

function setHeight() {
    const height = window.innerHeight;
    $('.top-page-container')[0].style.height = height + 'px';
}

$('#userName')[0].addEventListener('input', () => {
    const userName = $('#userName').val();
    userName ? $('#enterButton').prop('disabled', false) : $('#enterButton').prop('disabled', true);
})

// 入力欄フォーカス時のエンターキー入力
$('#userName')[0].addEventListener('keydown', (e) => {
    const userName = $('#userName').val();
    if (!e.shiftKey && e.keyCode === 13) {
        e.preventDefault();
        if (!userName) return;
        enter();
    }
})

// チャットルームに入室する
function enter() {
    const userName = $('#userName').val();
    if (!participants.every((participant) => participant !== userName)) {
        alert(`ユーザー名「${userName}」は既に使われています`)
        return;
    }
    $('form').submit();
}
