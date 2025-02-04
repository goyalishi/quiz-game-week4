let currentQuestionIndex = 0;
let score = 0;
let questions = [];

async function fetchQuestions() {
  try {
    const response = await fetch("/questions");
    questions = await response.json();
    displayQuestion();
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

function displayQuestion() {
  const questionContainer = document.getElementById("question-container");
  const optionsContainer = document.getElementById("options-container");

  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    questionContainer.querySelector("#question-text").textContent =
      question.question;

    optionsContainer.innerHTML = "";


    question.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.addEventListener("click", () => checkAnswer(option, button));
      optionsContainer.appendChild(button);
    });

   
  } else {
    questionContainer.innerHTML = "<p>Quiz completed!</p>";
    optionsContainer.innerHTML = "";
    document.getElementById("next-button").style.display = "none";
  }
}


function checkAnswer(selectedOption, optionElement) {
  const question = questions[currentQuestionIndex];
  if (selectedOption === question.answer) {
    score++;
    optionElement.style.backgroundColor = "green";
  } else {
    optionElement.style.backgroundColor = "red";
  }
  const options = document.querySelectorAll("#options-container button");
  options.forEach((option) => (option.disabled = true));
  document.getElementById("next-button").style.display = "block";

  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Score: ${score}`;
}


document.getElementById("next-button").addEventListener("click", () => {
  currentQuestionIndex++;
  displayQuestion();
});


fetchQuestions();
