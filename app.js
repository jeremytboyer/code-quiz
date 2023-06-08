var startBtn = document.querySelector("#start-btn");
var currentQuestionIndex = 0;
var wrongQuestions = [];
var div = document.querySelector("div");
var h2 = document.querySelector("h2");


function showCurrentQuestion() {
  // write a function to get the current question index and display that message in the h2

  h2.innerText = questionData[currentQuestionIndex].question;

  //write a loop that displays the questions as buttons
  var choices = questionData[currentQuestionIndex].choices;
  
  div.innerHTML = "";
  choices.forEach((choice) => {
    var btn = document.createElement("button");
    div.appendChild(btn);
    btn.innerText = choice;
  });

  var btns = document.querySelectorAll("button");

  function handleClick(e) {
    if (e.target.innerText !== questionData[currentQuestionIndex].answer) {
      wrongQuestions.push(questionData[currentQuestionIndex].question);
    }
    currentQuestionIndex++;
    console.log(currentQuestionIndex);
    showCurrentQuestion();
  }

  btns.forEach((btn) => {
    btn.addEventListener("click", handleClick);
  });
}

function endGame() {
  if (currentQuestionIndex > questionData.length) {
    div.innerHTML = "congrats";
  }
}

function startGame() {
  startBtn.classList.add("hide");
  showCurrentQuestion();
  endGame();
}

startBtn.addEventListener("click", startGame);
