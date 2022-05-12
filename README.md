For the main index, i've kept it simple and only set the navigation bar as the timer and score, while the main body will be where the quiz will transition to.

below is the button for the highscore access:
   <!--<div class="score"> -->
    <!--<button type="button" id="highscores">View Scores</button> -->
below will be the timer and it will be counting down with the help of javascript:
 
     <!--<div id="timer">Time: <span id="time-remaining">60</span></div> -->
![Start Button-Home](https://user-images.githubusercontent.com/52897163/167995122-5e454d8b-fcce-4c26-b30e-f7c124998bd8.JPG)



WHEN I click the start button
THEN a timer starts and I am presented with a question

-When pressing the start Quiz button, it should start with the questions.  this was implemented with functions in javascript:

starting with score = 0 and the timer "timeLeft" = 60 seconds
function init() {
    score = 0;
    timeLeft = 60;
}

Under StartGame function:

remove the start button and the main body text, only to have the timer counting down with the questions.

using an if else statement for the timer to count down, if it reaches 0, then the game is done and should push to entering name for the score.


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




WHEN I answer a question
THEN I am presented with another question

under doQuiz function, we are preseneted with order of the questions, where it stores the questions and the score.  With each question answered, it would be about 1000 of miliseconds before pushing the next question and stores the proper score.

![next question](https://user-images.githubusercontent.com/52897163/167995198-3c3650b9-aa9c-44a5-a9c9-400aa3d4bfc5.JPG)

WHEN I answer a question incorrectly
THEN time is subtracted from the clock

If it is correct, then it will show in green "correct" else "incorrect" in red and 10 seconds is subtracted.

li.addEventListener("click", function (event) {
    <!-- if (questionItem.answer === parseInt(event.target.getAttribute("data-index"))) 
        {
             score += 10;
            indicatorEl.textContent = "CORRECT!";
            indicatorEl.style.color = "green";
    } else {
            timeLeft -= 10;
            indicatorEl.textContent = "INCORRECT";
            indicatorEl.style.color = "red";
        }-->


WHEN all questions are answered or the timer reaches 0
THEN the game is over

as seen below, under the doQuiz function, when everything has been answered, it would prompt the game is over, with the final score. with the textElement.textcontent

<!--if (questionNumber === questions.length) {
    clearInterval(timerCountdown);
    indicatorEl.textContent = "";
    newChoices.remove(); //removes the questions
    messageEl.textContent = "Congratulations"; //shows the finishing of the quiz
    messageEl.appendChild(textElement);
    textElement.textContent = "Your final score is: " + score + " points";
enterInfo(); -->
![timer](https://user-images.githubusercontent.com/52897163/167995096-0c64b343-d1b4-46f0-8044-53d8a038cfec.JPG)

WHEN the game is over
THEN I can save my initials and score

after showing the score, it would prompt to input the name of the player with the score, which will be saved in their local reposiotry.  
![End game and enter initial](https://user-images.githubusercontent.com/52897163/167995070-fff65836-05eb-4fc7-8cad-c275a300217e.JPG)

![displays initial and score](https://user-images.githubusercontent.com/52897163/167995049-cf75c3b6-b188-418e-bd3b-417eaf162a2e.JPG)
![repository](https://user-images.githubusercontent.com/52897163/167995174-47aa0b4e-eeb2-421f-a599-3228093a3fd4.JPG)
