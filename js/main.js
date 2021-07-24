$(document).on('ready', function() {
    $(".mainMenu").slick({
      autoplay: true,
      autoplaySpeed: 4000,
      dots: true,
    });
  });

  $(function() {
    $('.hamburgerMenu').click(function() {
        $(this).toggleClass('active');
 
        if ($(this).hasClass('active')) {
            $('.globalMenu').addClass('active');
        } else {
            $('.globalMenu').removeClass('active');
        }
    });
});

  (function(){
    function quizStart(){
      // HTMLに出力する変数
      const output = [];
  
      // 質問毎に
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // 可能な回答リストを格納する変数
          const answers = [];
  
          // 利用可能な答え毎に
          for(letter in currentQuestion.answers){
  
            // ラジオボタンを追加する
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // 質問と回答を出力に追加
          output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
          );
        }
      );
  
      // 最後に出力リストを１つのHTMLに結合してページに表示
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // クイズから回答を集めます
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // 回答を追跡する
      let numCorrect = 0;
  
      // 質問毎に
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // 選択した答えを見つける
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // 答えが正しければ
        if(userAnswer === currentQuestion.correctAnswer){
          // 正解数を増やす
          numCorrect++;
  
          // 答えを緑色に着色する
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // 答えが間違っているか空白の場合
        else{
          // 答えを赤に着色する
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // 合計のうち正解の数を表示する
      resultsContainer.innerHTML = `${myQuestions.length} 問中 ${numCorrect} 問正解`;
    }
  
    const quizContainer = document.getElementById('quizArea');
    const resultsContainer = document.getElementById('quizResults');
    const submitButton = document.getElementById('quizButton');
    const myQuestions = [
      {
        question: "粘り気が強くとろーりと長く伸びることで有名な誕生した国の名前がついたアイスの名前は？",
        answers: {
          a: "エジプトアイス",
          b: "ギニアアイス",
          c: "トルコアイス"
        },
        correctAnswer: "c"
      },
      {
        question: "一気に焼くのではなく、蒸すような形でじっくり焼き上げるタイプのチーズケーキを何チーズケーキという？",
        answers: {
          a: "パリ",
          b: "ニューヨーク",
          c: "トーキョー"
        },
        correctAnswer: "b"
      },
      {
        question: "フランスのケーキ、ブッシュ・ド・ノエルはいつの時期に食べられるもの？",
        answers: {
          a: "イースター",
          b: "クリスマス",
          c: "ハロウィン",
          d: "お正月"
        },
        correctAnswer: "b"
      },
      {
        question: "シュークリームの「シュー」とは、何のこと？",
        answers: {
          a: "じゃが芋",
          b: "トマト",
          c: "キャベツ",
          d: "玉ねぎ"
        },
        correctAnswer: "c"
      },
      {
        question: "「調理した生クリーム」という意味の名前を持つスイーツは何？",
        answers: {
          a: "ティラミス",
          b: "パンナコッタ",
          c: "ババロア",
          d: "シュークリーム"
        },
        correctAnswer: "b"
      }
    ];
  
    // キックオフ
    quizStart();
  
    // イベントリスナー
    submitButton.addEventListener('click', showResults);
  })();