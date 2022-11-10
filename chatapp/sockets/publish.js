'use strict';

var ongoingQuestion = {
    'user': "", // 進行中の問題の出題者
    'content': "", // 進行中の問題の内容
    solution: "", // 問題の解答
};

module.exports = function (socket, io) {

    function reloadOngoinProblem() {
        ongoingQuestion.userName = "";
        ongoingQuestion.content = "";
        ongoingQuestion.solution = "";
    }

    //誰かがログインした際に、出題されている問題を送る
    socket.on('sendRequestForQuestion', function () {
        if (ongoingQuestion.content) {
            var data = {
                'userName': ongoingQuestion.userName,
                'message': ongoingQuestion.content
            };
            socket.emit("receiveQuestionEvent", data);
        }
    });

    // 出題を送信する
    socket.on('sendQuestionEvent', function (data) {
        if (ongoingQuestion.content) {
            console.log("既に問題が出題されています");
            data.if_error = true;
            data.message = "既に問題が出題されています";
            socket.emit("receiveQuestionEvent", data);
        } else {
            ongoingQuestion.userName = data.userName;
            ongoingQuestion.content = data.message;
            ongoingQuestion.solution = data.solution;

            // 投稿したクライアントへの送信
            data.is_myself = true;
            socket.emit("receiveQuestionEvent", data);

            // 投稿したクライアント以外への一斉送信
            data.is_myself = false;
            socket.broadcast.emit("receiveQuestionEvent", data)
        }
    });

    // 締切を送信する
    socket.on('sendQuestionEndEvent', function (data) {
        // 出題されている問題がなければ、
        if (!ongoingQuestion.content) {
            console.log("問題は出題されていません");
            data.if_error = true;
            data.message = "問題は出題されていません";
            socket.emit("receiveQuestionEndEvent", data);
            //出題者以外からのコマンドであれば
        } else if (ongoingQuestion.userName !== data.userName) {
            console.log("出題者はあなたではありません");
            data.if_error = true;
            data.message = "出題者はあなたではありません";
            socket.emit("receiveQuestionEndEvent", data);
        } else {
            data.solution = ongoingQuestion.solution;
            reloadOngoinProblem();

            // 投稿したクライアントへの送信
            data.is_myself = true;
            socket.emit("receiveQuestionEndEvent", data);

            // 投稿したクライアント以外への一斉送信
            data.is_myself = false;
            socket.broadcast.emit("receiveQuestionEndEvent", data);
        }
    });

    // 解答を送信する
    socket.on('sendAnswerEvent', function (data) {
        // 問題が出題されてなければ
        if (!ongoingQuestion.content) {
            console.log("問題は出題されていません");
            data.if_error = true;
            data.message = "問題は出題されていません";
            socket.emit("receiveQuestionEndEvent", data);
        } else if (ongoingQuestion.userName == data.userName) {
            console.log("あなたは出題者です");
            data.if_error = true;
            data.message = "あなたは出題者です";
            socket.emit("receiveQuestionEndEvent", data);
        } else {
            // 投稿したクライアントへの送信
            data.is_myself = true;
            socket.emit("receiveAnswerEvent", data);

            // 投稿したクライアント以外への一斉送信
            data.is_myself = false;
            socket.broadcast.emit("receiveAnswerEvent", data);
        }
    });

    // 投稿メッセージを送信する
    socket.on('sendMessageEvent', function (data) {
        // 投稿したクライアントへの送信
        data.is_myself = true;
        socket.emit("receiveMessageEvent", data);

        // 投稿したクライアント以外への一斉送信
        data.is_myself = false;
        socket.broadcast.emit("receiveMessageEvent", data);
    });
};
