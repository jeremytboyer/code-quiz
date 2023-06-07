var startBtn = document.querySelector("#start-btn");
var currentQuestionIndex = 0;

function showCurrentQuestion(index) {
  // write a function to get the current question index and display that message in the h2
  var h2 = document.querySelector("h2");

  h2.innerText = questionData[currentQuestionIndex].question;

  //write a loop that displays the questions as buttons
  var choices = questionData[currentQuestionIndex].choices
  var div = document.querySelector('div')
  choices.forEach((choice) => {
    var btn = document.createElement("button");
    div.appendChild(btn);
    btn.innerText = choice;
  });

  var btns = document.querySelectorAll('button')

  function handleClick(e) {
    console.log(e.target.innerText)
    ++currentQuestionIndex
    console.log(currentQuestionIndex)
  }

  btns.forEach(btn => {
    btn.addEventListener('click', handleClick)
  })
}

function startGame() {
  startBtn.classList.add("hide");
      showCurrentQuestion();
}

startBtn.addEventListener("click", startGame);
