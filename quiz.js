$(document).ready(function() {
    const timerEl = document.getElementById("timer");
    const startEl = document.getElementById("start");
    const startQuizEl = document.getElementById("startQuiz");
    const startQuizIntroEl = document.getElementById("startQuizIntro");
    const titleEl = document.getElementById("questionTitle");
    const choicesEl = document.getElementById("questionChoices");
    const mainEl = document.getElementById("main");
    let time = questions.length * 15;
    let questionIndex = 0;
    let timeId;
    const inputField = document.createElement("input");
    function clockTick() {
        --time;
        timerEl.innerHTML = time;
        if (time <= 0) {
            quizOver();
        }
    }

    function startTimer() {
        timeId = setInterval(clockTick, 1000);
    }

    function stopTimer() {
        clearInterval(timeId);
    }

    function startQuiz() {
        startTimer();
        startQuizEl.style.display = "none";
        startQuizIntroEl.style.display = "none";
        startEl.style.display = "none";

        generateQuestion();
    }

    function generateQuestion() {
        console.log(questionIndex, questions.length);
        const currentQuestion = questions[questionIndex];

        titleEl.innerHTML = "";
        titleEl.innerHTML = currentQuestion.title;

        choicesEl.innerHTML = "";
        const choices = currentQuestion.choices;
        for (let i = 0; i < choices.length; i++) {
            const choicesButton = document.createElement("button");
            choicesButton.innerText = choices[i];
            choicesButton.onclick = checkChoice;
            choicesEl.appendChild(choicesButton);
        }
    }

    function checkChoice() {
        const correctAnswer = questions[questionIndex].answer;
        const userAnswer = this.innerText;
        if (correctAnswer === userAnswer) {
            nextQuestion();
        } else {
            time -= 5;
            nextQuestion();
        }

        console.log(correctAnswer, userAnswer);
    }

    function nextQuestion() {
        console.log("nextQuestion", questionIndex === questions.length);
        ++questionIndex;
        if (questionIndex === questions.length) {
            quizOver();
        } else {
            generateQuestion();
        }
    }


    function storeScore() {
        const initials = inputField.value

        const highScore = JSON.parse(window.localStorage.getItem("highScore")) || []

        const score = {
            name: initials, score: timerEl.innerHTML

        }
        highScore.push(score)
        window.localStorage.setItem("highScore",JSON.stringify(highScore));
        window.location.href = "highscore.html"
       
    }
    // function createHighScoreList(){
    //     console.log("grab high score")
    //     const highScore = JSON.parse(window.localStorage.getItem("highScore")) || []
    //      // <li class="list-group-item">Cras justo odio</li>
    //      highScore.map(({score,name})=>{
    //         const listEl = document.createElement("li")
    //         listEl.classList.add("list-group-item")
    //         listEl.innerHTML = `${name} - ${score}`
    //         document.getElementById("highScoreList").appendChild(listEl)


    //      })
        
    // }
    function quizOver() {
        stopTimer();
        mainEl.innerHTML = "";

        const title = document.createElement("h1");
        title.innerHTML = "All Done!";

        const finalScore = document.createElement("p");
        finalScore.innerHTML = "Your final score is " + timerEl.innerHTML;

        const label = document.createElement("label");
        label.innerHTML = "Enter Initials: ";

        const submitButton = document.createElement("button");
        submitButton.innerHTML = "Submit";
        submitButton.onclick = storeScore;

        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("input-group-append");
        buttonDiv.append(submitButton);

        // const inputField = document.createElement("input");
        inputField.setAttribute("type", "text");
        inputField.setAttribute("class", "form-control");
        inputField.setAttribute("placeholder", "");
        inputField.setAttribute("aria-label", "Recipient's Username");
        inputField.setAttribute("aria-describedby", "button-addon2");

        const parentDiv = document.createElement("div");
        parentDiv.append(label, inputField, buttonDiv);
        mainEl.append(title, finalScore, parentDiv);
        console.log("BULLOCKS!!");
    }

    startEl.onclick = startQuiz;
    // createHighScoreList()
});