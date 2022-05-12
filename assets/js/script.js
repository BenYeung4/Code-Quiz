var timerEl = document.getElementById("time-remaining");
var highScoreView = document.querySelector("#highscores"); //stores the numerical score
var startButton = document.getElementById("start-quiz");

var mainContent = document.querySelector("#main-content"); //where everything is going to be entered and stored but shown
var messageEl = document.querySelector("h1"); //places the questions
var textElement = document.querySelector("p");

var choicesListEl = document.getElementById("choices-list");
var indicatorEl = document.getElementById("indicator"); //shows answer is right or wrong

//building score sheet on javascript
var infoEl = document.createElement("div");
var highscoreEl = document.createElement("div");
var nameInput = document.createElement("input");
var submitBtn = document.createElement("button");
var homeBtn = document.createElement("button");

//accumulation of the score
var highscore = {
    initials: "",
    score: 0,
};
var highscores = [];
var timeLeft;
var timerCountdown;

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
    timeLeft = 60;
}
//when pressing the startbutton, removes the main body elements and the timer
function startGame() {
    startButton.remove();  //removes the start button
    textElement.remove();  //removes the main body texts
    timerCountdown = setInterval(function () {  //setting the timer

        if(timeLeft >1){
            timerEl.textContent = timeLeft + ' seconds remaining';
            timeLeft--;
        } else if (timeLeft === 1){
            timerEl.textContent = timeLeft + 'second remaining';
            timeLeft--;
        }else{
            timerEl.textContent = 'Game Over';
            clearInterval(timerCountdown);
            clearInterval(doQuiz);
        }
    }, 1000); //the milisecond for the timer to countdown
    doQuiz(); //goes into the doQuiz function
}

function doQuiz(questionNumber) {
    highScoreView.remove(); //removes the high score button while playing
    questionNumber = questionNumber || 0; //sets the question order
    var questionItem = questions[questionNumber];  //retrieve question
    messageEl.textContent = questionItem.question; //shows the questions

    var newChoices = document.createElement("div");
    choicesListEl.appendChild(newChoices);

    for (var i = 0; i < questionItem.choices.length; i++) {
        var choice = questionItem.choices[i];

        var li = document.createElement("li");
        li.setAttribute("data-index", i);
        li.textContent = choice;
        newChoices.appendChild(li);

        li.addEventListener("click", function (event) {
            if (questionItem.answer === parseInt(event.target.getAttribute("data-index"))) 
            {
                score += 10;
                indicatorEl.textContent = "CORRECT!";
                indicatorEl.style.color = "green";
            } else {
                timeLeft -= 10;
                indicatorEl.textContent = "INCORRECT";
                indicatorEl.style.color = "red";
            }

            questionNumber++;  //next question

            //End of the quiz
            if (questionNumber === questions.length) {
                clearInterval(timerCountdown);
                indicatorEl.textContent = "";
                newChoices.remove(); //removes the questions
                messageEl.textContent = "Congratulations"; //shows the finishing of the quiz
                messageEl.appendChild(textElement);
                textElement.textContent = "Your final score is: " + score + " points";

                enterInfo();

            } else {
                setTimeout(function () {
                    doQuiz(questionNumber);
                    newChoices.remove();  //removes the questions
                    indicatorEl.textContent = "";
                }, 1000);
            }

            
        });
    }
}

//enter name
function enterInfo() {
    infoEl.textContent = "ENTER NAME: ";
    mainContent.appendChild(infoEl);
    infoEl.appendChild(nameInput); //enter the name
    submitBtn.textContent = "SUBMIT";
    infoEl.appendChild(submitBtn) //button for the submit
}

//submit the score
function submitHighscore() {
    var initialInput = document.querySelector("input").value;
    highscore.initials = initialInput;
    highscore.score = score;
    localStorage.setItem("highscore", JSON.stringify(highscore));
    mainContent.textContent = "";
    showHighscores();
}

//showing the score in javascript
function showHighscores() {
    var storedHighscore = JSON.parse(localStorage.getItem("highscore"));
    messageEl.textContent = "Highscore";
    mainContent.appendChild(messageEl);
    highscoreEl.setAttribute("class", "highscore-element");
    highscoreEl.textContent = `${storedHighscore.initials} : ${storedHighscore.score}`;
    messageEl.appendChild(highscoreEl);
    homeBtn.textContent = "Home";
    mainContent.appendChild(homeBtn);
}

//goes back home
function home() {
    location.reload(); 
}

//what is removed when clicking to view high score
highScoreView.addEventListener("click", function () {
    textElement.remove();  //removes the main body text once start
    startButton.remove();  //removes the start button once clicked
    showHighscores();  //shows the score bar once we click the start
});

//add buttons
startButton.addEventListener("click", startGame); 
submitBtn.addEventListener("click", submitHighscore);
homeBtn.addEventListener("click", home);
