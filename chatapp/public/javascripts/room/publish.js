'use strict';

// ログインした瞬間に出題されている問題があれば、サーバーに送らせる
socket.emit('sendRequestForQuestion');

function scrollChatBottom() {
    const target = $('#message-box-id')[0];
    target.scrollTo(0, target.scrollHeight)
}

/*
    コマンド一覧
    name: コマンド名
    message: コマンドに対応してボタンに表示させる文字
*/
const commands = [{ name: 'question', message: '<i class="bi bi-quora"></i>出題' }, { name: 'question-end', message: '<i class="bi bi-stopwatch"></i>締切' }, { name: 'answer', message: '<i class="bi bi-reply"></i>回答' }]

// 入力中のコマンドを表す状態変数
let commandStatus = null;

// 回答内容を格納する変数
let answerContent = null;

// 入力欄にスペースと改行以外の文字が入っているか
function checkInput(input) {
    const matchArray = input.match(/[^\s　]/g);
    return matchArray !== null;
}

// 入力欄のinputイベントに対する処理
$('#message')[0].addEventListener('input', (e) => {
    const input = $('#message').val();
    checkInput(input) ? $('#publishButton').removeClass('disabled') : $('#publishButton').addClass('disabled');
    reloadCommandStatus(input)
    reloadButtonMessage()
})

// 入力欄フォーカス時のエンターキー入力
$('#message')[0].addEventListener('keydown', (e) => {
    if (!e.shiftKey && e.keyCode === 13) {
        e.preventDefault();
        publish();
    }
})

// グローバル変数「commandStatus」に応じて、送信ボタンのメッセージを更新する。
function reloadButtonMessage() {
    $('#publishButton').html(commandStatus ? commandStatus.message : '<i class="bi bi-send"></i>送信')
}

// 入力欄の内容に応じて、グローバル変数「commandStatus」を更新する。
function reloadCommandStatus(input) {
    if (input[0] !== '/') {
        commandStatus = null;
        return;
    }
    const commandInput = input.split(' ')[0].slice(1);
    commandStatus = commands.find((command) => command.name === commandInput) ?? null;
}

// コマンドを含んだ入力から内容部分のみを取り出す
function pickCommandContent(message) {
    const commandEndIndex = message.indexOf(' ');
    if (commandEndIndex < 0 || commandEndIndex + 1 >= message.length) return null;
    return message.slice(commandEndIndex + 1);
}

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザー名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();

    // 入力欄がスペースと改行しかなかったら処理を止める
    if (!checkInput(message)) {
        $('#message').val("");
        return;
    }

    const date = new Date();

    // 投稿内容を送信
    switch (commandStatus?.name) {
        case 'question': {
            console.log('question');
            const solution = prompt(`問題の答えを入力してください`);
            solution ? socket.emit("sendQuestionEvent", { userName, date, message: pickCommandContent(message), solution }) : alert('解答なしで問題を作成することはできません')
            break;
        }
        case 'question-end': {
            console.log('question-end');
            socket.emit("sendQuestionEndEvent", { userName, date, message: pickCommandContent(message) });
            break;
        }
        case 'answer': {
            console.log('answer');
            answerContent = pickCommandContent(message)
            socket.emit("sendAnswerEvent", { userName, date, message: answerContent });
            break;
        }
        default: {
            socket.emit("sendMessageEvent", { userName, date, message });
        }
    }
    $('#message').val("");
    $('#publishButton').addClass('disabled')
    commandStatus = null;
    reloadButtonMessage();
}

// サーバから受信した"出題"を画面上に表示する
socket.on('receiveQuestionEvent', function (data) {
    if (data.if_error) {
        alert(data.message);
    } else {
        const message = data.is_myself ? '問題を出題しました' : '問題が出題されました';
        $('#thread').append(`<div class="chat-notice"><span>${message}</span></div>`);
        $('#questionField-title').text(data.userName + 'からの問題');
        $('#questionField-content').text(data.message);
        $('#problemContent').removeClass('hide')
        $('#message-box-id').removeClass('hide')
        scrollChatBottom();
    }
});

// dataから回答締切メッセージを作成する
function questionEndMessageCreator(data) {
    const domChatSection = document.createElement('div');
    domChatSection.classList.add("chat-notice-answer", "d-flex", "justify-content-center");
    const domChatContainer = document.createElement('div');
    domChatContainer.classList.add("chat-notice-answer-container");

    const domChatTitle = document.createElement('p');
    domChatTitle.classList.add('chat-notice-answer-title', 'm-0')
    domChatTitle.textContent = '問題の受付が終了しました'
    domChatContainer.append(domChatTitle);

    const domChatContent = document.createElement('div');
    domChatContent.classList.add('p-1')

    const domChatSolution = document.createElement('p');
    domChatSolution.classList.add('m-0')
    domChatSolution.textContent = `問題の答え：${data.solution}`
    domChatContent.append(domChatSolution);
    const domChatMyAnswer = document.createElement('p');
    domChatMyAnswer.classList.add('m-0')
    domChatMyAnswer.textContent = `あなたの答え：${answerContent ?? '未回答'}`

    domChatContent.append(domChatMyAnswer);

    domChatContainer.append(domChatContent);
    domChatSection.append(domChatContainer)
    return domChatSection;
}

// サーバから受信した"締切"を画面上に表示する
socket.on('receiveQuestionEndEvent', function (data) {
    if (data.if_error) {
        alert(data.message);
    } else {
        const domChatSection = data.is_myself ? '<div class="chat-notice"><span>問題を締め切りました</span></div>' : questionEndMessageCreator(data);
        answerContent = null;
        $('#thread').append(domChatSection);
        $('#problemContent').addClass('hide')
        $('#message-box-id').addClass('hide')
        $('#questionField-title').empty();
        $('#questionField-content').empty();
        scrollChatBottom();
    }
});

// サーバから受信した"解答"を画面上に表示する
socket.on('receiveAnswerEvent', function (data) {
    if (data.if_error) {
        alert(data.message);
    } else {
        const domChatSection = messageDomCreator(data, true);
        $('#thread').append(domChatSection)
        scrollChatBottom();
    }
});

// Dateオブジェクトから日時メッセージを作成する
function createMessageDate(date) {
    const dayjsDate = dayjs(date);
    const isTodayMessage = dayjsDate.isAfter(dayjs().startOf('day')) && dayjsDate.isBefore(dayjs().endOf('day'))
    const format = isTodayMessage ? "HH:mm" : "YYYY/MM/DD HH:mm";
    return dayjsDate.format(format)
}

// dataからメッセージ部分のhtml要素を作成する
function messageDomCreator(data, isAnswer) {
    const domChatSection = document.createElement('div');
    domChatSection.classList.add("chat-section");
    if (data.is_myself) domChatSection.classList.add("mr-0", "ml-auto");
    if (isAnswer) domChatSection.classList.add("answer");

    // 投稿者名要素の追加
    const domChatDetails = document.createElement('div');
    const domChatName = document.createElement('p');
    domChatDetails.classList.add('chat-details', "d-flex");
    if (data.is_myself) domChatDetails.classList.add("flex-row-reverse");
    domChatName.classList.add('chat-name');
    domChatName.textContent = data.userName + (isAnswer ? 'の回答' : '');
    domChatDetails.append(domChatName);
    domChatSection.append(domChatDetails);

    // メッセージ部分
    const domChatMessageContainer = document.createElement('div');
    const domChatDate = document.createElement('p');
    const domChatMessageContent = document.createElement('div');
    domChatMessageContainer.classList.add('chat-container', 'd-flex', 'align-items-end');
    if (data.is_myself) domChatMessageContainer.classList.add("flex-row-reverse");
    domChatDate.classList.add('chat-date', "mb-0");
    domChatMessageContent.classList.add('chat-message', (data.is_myself ? "me" : "not-me"));
    domChatDate.textContent = createMessageDate(data.date);
    const messageContent = data.message.split('\n').map((row) => `<span>${row.replace(/ /g, "&nbsp")}</span>`).join('<br>');
    domChatMessageContent.innerHTML = messageContent;
    domChatMessageContainer.append(domChatMessageContent, domChatDate);
    domChatSection.append(domChatMessageContainer);

    return domChatSection;
}

// サーバから受信した"メッセージ"を画面上に表示する
socket.on('receiveMessageEvent', function (data) {
    const domChatSection = messageDomCreator(data);
    $('#thread').append(domChatSection);
    scrollChatBottom();
});
