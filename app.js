var startBtn = document.querySelector("#start-btn");
var currentQuestionIndex = 0;
var wrongQuestions = [];
var questionDiv = document.querySelector(".questiondiv");
var h2 = document.querySelector("h2");
var timer = document.querySelector(".timerEl");
var time = 90;
var h3 = document.querySelector("h3");
var highScores = document.querySelector(".highscore");
var overlay = document.querySelector("#overlay");
var returnBtn = document.querySelector(".return");
var showSubmitBtn = document.querySelector("#submitHighScore");
var submitBtn = document.querySelector(".submit");
var input = document.querySelector(".input");
var restartBtn = document.querySelector("#restart-btn");
var scores = document.querySelector(".scores");

function showCurrentQuestion() {
  // write a function to get the current question index and display that message in the h2
  endGame();

  h2.innerText = questionData[currentQuestionIndex].question;

  //write a loop that displays the questions as buttons
  var choices = questionData[currentQuestionIndex].choices;

  questionDiv.innerHTML = "";
  choices.forEach((choice) => {
    var btn = document.createElement("button");
    questionDiv.appendChild(btn);
    btn.innerText = choice;
  });

  var btns = document.querySelectorAll("button");

  function handleClick(e) {
    if (e.target.innerText !== questionData[currentQuestionIndex].answer) {
      wrongQuestions.push(questionData[currentQuestionIndex].question);
      time -= 10;
      var warningDiv = document.querySelector(".warning");
      var warning = document.createElement("h3");
      warningDiv.append(warning);
      warning.innerText = "";
      warning.style.color = "red";
      warningInt = 0;
      warning.innerText = "-10 seconds";
      warningTimer = setInterval(function () {
        warningInt++;
        if (warningInt === 1) {
          clearInterval(warningTimer);
          warning.remove();
          warningDiv.innerText = "";
        }
      }, 1000);
    }
    currentQuestionIndex++;
    showCurrentQuestion();
  }

  btns.forEach((btn) => {
    btn.addEventListener("click", handleClick);
  });
}

function endGame() {
  if (currentQuestionIndex == questionData.length) {
    h2.innerHTML = "Congrats";
    questionDiv.innerHTML = `<p>You got ${wrongQuestions.length} out of 10 wrong<br>Here's what you may need to brush up on:</p>`;
    wrongQuestions.forEach((question) => {
      var p = document.createElement("p");
      questionDiv.append(p);
      p.innerText = question;
    });
    showSubmitBtn.classList.toggle("hide");
    restartBtn.classList.toggle("hide");
    function submit(e) {
      var playerData = {
        name: input.value,
        score: `${10 - wrongQuestions.length}0%`,
      };

      var playerArray = getUserData();
      playerArray.push(playerData);

      saveUserData(playerArray);
      clearData();
    }
    submitBtn.addEventListener("click", submit);

    
  }
}

function restartGame() {
  location.reload();
}
restartBtn.addEventListener("click", restartGame);

function startClock() {
  var clock = setInterval(function () {
    --time;
    timer.innerText = time;
    if (time <= 0) {
      clearInterval(clock);
      h2.innerText = "Sorry! Times Up!! Please Try Again";
      questionDiv.innerHTML = "";
      restartBtn.classList.remove("hide");
    }
    if (currentQuestionIndex == questionData.length) {
      clearInterval(clock);
    }
  }, 1000);
}

function startGame() {
  startBtn.classList.add("hide");
  showCurrentQuestion();
  startClock();
}

function getUserData() {
  var rawData = localStorage.getItem("users");
  var parsed = JSON.parse(rawData) || [];

  return parsed;
}

function saveUserData(arr) {
  var jsonVal = JSON.stringify(arr);

  localStorage.setItem("users", jsonVal);
}

function clearData() {
  input.value = "";
}


startBtn.addEventListener("click", startGame);

function viewHighScores() {
  scores.innerHTML = "";
  overlay.classList.toggle("hide");
  var players = getUserData();

  for (player of players) {
    score = document.createElement("p");
    score.innerText = `${player.name} - Score: ${player.score}`;
    scores.prepend(score);
  }
  console.log(players);
}

highScores.addEventListener("click", viewHighScores);

function clickToReturn() {
  overlay.classList.toggle("hide");
}

returnBtn.addEventListener("click", clickToReturn);
