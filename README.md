<a href="https://github.com/othneildrew/Best-README-Template">
  <img width="312" alt="image" src="https://user-images.githubusercontent.com/104077941/201036761-9b7522bb-97b0-45ef-9cf8-398f72d03664.png">
</a>

<details>
  <summary>目次</summary>
  <ol>
    <li><a href="#問題意識と開発理由">問題意識と開発理由</a></li>
    <li><a href="#遊び方">遊び方</a></li>
    <li><a href="#開発環境">開発環境</a></li>
    <li><a href="#機能">機能</a></li>
  </ol>
</details>

## 問題意識と開発理由

大学院への進学、就職活動の開始に伴い、多くの出会いがあった年でした。そんな中、多くの出会いはオンライン上でのものでした。そのほとんどが、5人程度の複数人でのグループ活動でした。
音声での会話は、同時に複数人が行うことができず、単位時間あたりのコミュニケーション量が減少してしまいます。しかし、チャットを利用することで、人数が増えれば触れるほど相対的に効率の良いコミュニケーションが実現できます。さらに、初心者同志でもよりお互いのことを知れるような仕組みが必要であると考えました。

そこで、私は**チャット形式のクイズアプリ**である**みんなのクイズ**を開発しました。

## 遊び方

それでは遊び方を説明します。ここでは、2人のユーザーが参加する場合を想定し、２つのブラウザを使って双方の画面遷移を説明します。
  
<img width="900" alt="入室画面1" src="https://user-images.githubusercontent.com/104077941/201461894-c73cf6f6-d81c-4e2f-b109-9ff83a6ba693.png">
1. 「みんなのクイズ」のURLにアクセスすると、ログイン画面が表示されます。
<br><br><br>
  
<img width="900" alt="入室画面2" src="https://user-images.githubusercontent.com/104077941/201461928-82e34cd4-f1ed-439c-b2fc-4c00f6370c1e.png">
2. お好きな名前でログインしてください。ただし、他のユーザーと重複する名前を使用した場合は警告がでるので、再度異なる名前でログインしてください。
<br><br><br>
  
<img width="900" alt="入室ユーザー確認画面" src="https://user-images.githubusercontent.com/104077941/201461916-7ab6cceb-acac-42f2-b861-5fd2c4dfe02c.png">
3. 右上のボタンから、入室しているユーザーの一覧を表示できます。
<br><br><br>
  
  
<img width="900" alt="メッセージ送信画面" src="https://user-images.githubusercontent.com/104077941/201462052-4011f900-de77-4a94-8948-62dd96145c6d.png">
4. ルームの中では、入室しているユーザーと自由にメッセージのやりとりができます。
<br><br><br>
  
<img width="900" alt="出題画面1" src="https://user-images.githubusercontent.com/104077941/201462142-1d875e82-5283-4382-ab16-429c66ddc637.png">
5. このアプリのメイン機能であるクイズの出題、回答はコマンドを通して行うことができます。このルーム内で使用できるコマンドの一覧を、右上の「コマンド一覧」ボタンから確認できます。
<br>

* /answer : クイズに回答します
* /question : クイズを出題します
* /question-end : クイズの出題を締め切ります
<br>
この例では、左側のユーザーでクイズを出題し、右側のユーザーで回答することにします。
左側のユーザーで /question コマンドを使い、クイズを出題します。
<br><br><br>

<img width="900" alt="出題画面2" src="https://user-images.githubusercontent.com/104077941/201462171-cc140dd9-917f-4de3-a754-b39f20299515.png">
6. コマンドが正常に認識されると、クイズの解答を求められるので入力します。
<br><br><br>


<img width="900" alt="出題画面3" src="https://user-images.githubusercontent.com/104077941/201462189-4c4f1fb0-10f0-46e1-8cf7-9a71a6892a2f.png">
7. クイズが出題されると、すべてのユーザーでクイズと出題者が画面上に表示されます。
<br><br><br>
  
<img width="900" alt="回答画面1" src="https://user-images.githubusercontent.com/104077941/201462309-a636fe4b-cc2a-415b-8884-4a3ee0c0c64f.png">
8. 右側のユーザーで、/answer コマンドを使ってクイズに回答します。
<br><br><br>
  
  
<img width="900" alt="回答画面2" src="https://user-images.githubusercontent.com/104077941/201462361-b3157e93-1977-4dac-a90b-f494ce80e7cb.png">
9. 受け付けた回答は、赤文字で表示されます。
<br><br><br>


<img width="900" alt="締め切り画面1" src="https://user-images.githubusercontent.com/104077941/201462453-2c047a08-dc01-4162-8f1b-1900430ce87e.png">
10. 左側のユーザーで、クイズの回答を締め切ります。
<br><br><br>
  
<img width="900" alt="締め切り画面2" src="https://user-images.githubusercontent.com/104077941/201462459-57b2f698-ea2f-48cc-b847-a42995d1f83d.png">
<br>
11. クイズの回答が締め切られた旨が全ユーザーに伝わります。このとき、回答者には自分の回答と問題の解答が表示されます。
<br><br><br>






## 開発環境

* Node.js
* socket.io
* express
* Handlebars
* HTML / CSS
* Bootstrap
* JQuery
* AWS EC2


## その他の機能
* 整合性のない
## その他の機能

