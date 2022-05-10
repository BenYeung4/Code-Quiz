const timerElement = document.getElementById("time-remaining");
const timerView = document.getElementById("timer");
const highScoreView = document.querySelector("#highscores");
const startButton = document.getElementById("start-quiz");

const mainElement = document.querySelector("#main-content");
const messageElement = document.querySelector("h1");
const textElement = document.querySelector("p");

const choicesListElement = document.getElementById("choices-list");
const indicatorElement = document.getElementById("indicator");

const formElement = document.createElement("div");
const highscoresElement = document.createElement("div");
const textInputElement = document.createElement("input");
const formButton = document.createElement("button");
const backButton = document.createElement("button");

//accumulation of the score
var highscore = {
    initials: "",
    score: 0,
};
var highscores = [];
var secondsLeft;
var timerInterval;

//questions list
var questions =[
    {
        question: "How would you console log the computer's RAM?",
        choices: [
            "console.log(computer[ram]);",
            "console.log(computer.ram);",
            "console.log(computer(ram));",
            "console.log(computer->ram)"
        ],
        answer: 1,
    },
    {
        question:"How would you call the object's startup method?",
        choices: [
            "computer.startUp;",
            "computer.startup();",
            "computer.startUp();",
            "computer[upstart]"
        ],
        answer: "computer.startUp();",
    },
    {
        question:"Box-sizing is a property that changes the calulation of which values of the element?",
        choices: [
            "width",
            "height",
            "margin",
            "Both width and height"
        ],
        answer: 3,
    },
    {
        question:"If you need to position a child element in relation to its parent element, which value should you set the position property to?",
        choices: [
            "display",
            "static",
            "absolute",
            "relative"
        ],
        answer: 2,
    },
    {
        question:"The main purpose of the <body> element is to hold all of the document's actual content that is meant to be seen or interaced with by the page's visitor.",
        choices: [
            "true",
            "false"
        ],
        answer: 0,
    },
];


// FUNCTIONS
init();
//starting with the timer and score
function init() {
    score = 0;
    secondsLeft = 60;
}
//when pressing the startbutton, removes the main body elements and the timer
function startGame() {
    startButton.remove();  //removes the start button
    textElement.remove();  //removes the main body texts
    timerInterval = setInterval(function () {
        secondsLeft--;
        timerElement.textContent = secondsLeft;

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000);

    renderQuiz();
}

function renderQuiz(questionNumber) {
    questionNumber = questionNumber || 0;
    var questionItem = questions[questionNumber];
    messageElement.textContent = questionItem.question;

    var newChoices = document.createElement("div");
    choicesListElement.appendChild(newChoices);

    for (var i = 0; i < questionItem.choices.length; i++) {
        var choice = questionItem.choices[i];

        var li = document.createElement("li");
        li.setAttribute("data-index", i);
        li.textContent = choice;
        newChoices.appendChild(li);

        li.addEventListener("click", function (event) {
            if (
                questionItem.answer ===
                parseInt(event.target.getAttribute("data-index"))
            ) {
                score += 10;
                indicatorElement.innerHTML = "<hr> CORRECT!";
                indicatorElement.setAttribute("style", "color: green");
            } else {
                secondsLeft -= 10;
                indicatorElement.innerHTML = "<hr> WRONG!";
                indicatorElement.setAttribute("style", "color: red");
            }

            questionNumber++;

            if (questionNumber === questions.length) {
                clearInterval(timerInterval);
                indicatorElement.textContent = "";
                newChoices.remove();
                messageElement.textContent = "Game Over!";
                messageElement.appendChild(textElement);
                textElement.textContent = "Your final score is: " + score;

                renderForm();
            } else {
                setTimeout(function () {
                    renderQuiz(questionNumber);
                    newChoices.remove();
                    indicatorElement.textContent = "";
                }, 1000);
            }
        });
    }
}

function renderForm() {
    formElement.textContent = "ENTER NAME: ";
    formElement.setAttribute("style", "color: white");
    formButton.textContent = "SUBMIT";
    mainElement.appendChild(formElement);
    formElement.appendChild(textInputElement);
    formElement.appendChild(formButton)
}

function submitHighscore() {
    var initialInput = document.querySelector("input").value;
    highscore.initials = initialInput;
    highscore.score = score;
    localStorage.setItem("highscore", JSON.stringify(highscore));
    mainElement.innerHTML = "";
    highScoreView.textContent = "";
    timerView.textContent = "";

    renderHighscores();
}

function renderHighscores() {
    var storedHighscore = JSON.parse(localStorage.getItem("highscore"));

    messageElement.innerHTML = "Highscores";
    messageElement.setAttribute("style", "color: white");
    mainElement.appendChild(messageElement);
    highscoresElement.setAttribute("class", "highscore-element");
    highscoresElement.textContent = `${storedHighscore.initials} - ${storedHighscore.score}`;
    messageElement.appendChild(highscoresElement);
    backButton.textContent = "Home";
    mainElement.appendChild(backButton);
}


function home() {
    location.reload();
}

highScoreView.addEventListener("click", function () {
    textElement.remove();  //removes the main body text once start
    startButton.remove();  //removes the start button once clicked
    renderHighscores();  //shows the score bar once we click the start
});

startButton.addEventListener("click", startGame); 
formButton.addEventListener("click", submitHighscore);
backButton.addEventListener("click", home);
