//Accessing Elements;
let instruction = document.querySelector("#instructionText");
let instructionBox = document.querySelector("#instructionBox");

let attemptCount = document.querySelector("#attemptCount");

let computerScoreBox = document.querySelector("#computerScore");
let userScoreBox = document.querySelector("#userScore");

let computerChoiceBox = document.querySelector("#computerChoice");
let userChoiceBox = document.querySelector("#userChoice");

let rock = document.querySelector("#rock");
let paper = document.querySelector("#paper");
let scissor = document.querySelector("#scissor");

let submit = document.querySelector("#submit");
let restart = document.querySelector("#restart");

//Some Variables;
let preInstruction = "<font>PLEASE SELECT ONE & SUBMIT</font>";

//Counters;
let maxAttempt = 5;
let attemptDone = 0;
let computerScore = 0;
let userScore = 0;

let userChoice = 0;
let computerChoice = 0;

//Normal Function Declaration;
//Generate a random number between 1 and 3 (inclusive)
function getRandomNumber() {
    return Math.floor(Math.random() * 3) + 1;
}
//Computer Choice Updating Function
function computerChoiceUpdate(){
    computerChoice = getRandomNumber();
    if(computerChoice === 1){
        computerChoiceBox.setAttribute("id", "rockClick");
        computerChoiceBox.innerHTML = "<h4>ROCK</h4>";
    }else if(computerChoice === 2){
        computerChoiceBox.setAttribute("id", "paperClick");
        computerChoiceBox.innerHTML = "<h4>PAPER</h4>";
    }else if(computerChoice === 3){
        computerChoiceBox.setAttribute("id", "scissorClick");
        computerChoiceBox.innerHTML = "<h4>SCISSOR</h4>";
    }
}
//Score Boxes Update Function
function scoreBoxesUpdate(){
    computerScoreBox.innerText = `${computerScore}`;
    userScoreBox.innerText = `${userScore}`;
}

let resetChoiceBoxes = () => {
    computerChoiceBox.setAttribute("id", "computerChoice");
    computerChoiceBox.innerText = "Show me your's";

    userChoiceBox.setAttribute("id", "userChoice");
    userChoiceBox.innerText = "Not Selected yet..";
}

let chanceWinner = () => {
    instructionBox.style.backgroundColor = "transparent";
    if(computerChoice === 1){
        if(userChoice === 1){
            instruction.innerHTML = `<font>Chance Tie..</font>`;
        }else if(userChoice === 2){
            instruction.innerHTML = `<font>You Won This Chance..</font>`;            
            userScore++;
        }else if(userChoice === 3){
            instruction.innerHTML = `<font>Computer Won This Chance..</font>`;
            computerScore++;
        }
    }else if(computerChoice === 2){
        if(userChoice === 1){
            instruction.innerHTML = `<font>Computer Won This Chance..</font>`;
            computerScore++;
        }else if(userChoice === 2){
            instruction.innerHTML = `<font>Chance Tie..</font>`;            
        }else if(userChoice === 3){
            instruction.innerHTML = `<font>You Won This Chance..</font>`;
            userScore++;
        }
    }else if(computerChoice === 3){
        if(userChoice === 1){
            instruction.innerHTML = `<font>You Won This Chance..</font>`;
            userScore++;
        }else if(userChoice === 2){
            instruction.innerHTML = `<font>Computer Won This Chance..</font>`;
            computerScore++;            
        }else if(userChoice === 3){
            instruction.innerHTML = `<font>Chance Tie..</font>`;
        }
    }
    scoreBoxesUpdate();
}
let gameWinner = () => {
    if(computerScore>userScore){
        instruction.innerHTML = `<font style="color: white; background-color: red;">COMPUTER WON THE SERIES!! (RESTART GAME TO TRY AGAIN)</font>`;
        instructionBox.style.backgroundColor = "red";
    }else if(computerScore<userScore){
        instruction.innerHTML = `<font style="color: white; background-color: green;">YOU WON THE SERIES!! (RESTART GAME TO PLAY AGAIN)</font>`;
        instructionBox.style.backgroundColor = "green";
    }else{
        instruction.innerHTML = `<font style="color: green; background-color: grey;">SERIES TIE!! (RESTART GAME TO TRY AGAIN)</font>`;
        instructionBox.style.backgroundColor = "grey";
    }
}

//Functions for Events;
//Choice Selection Functions
let rockSelect = () => {
    userChoiceBox.setAttribute("id", "rockClick");
    userChoiceBox.innerHTML = "<h4>ROCK</h4>";
    userChoice = 1;
}
let paperSelect = () => {
    userChoiceBox.setAttribute("id", "paperClick");
    userChoiceBox.innerHTML = "<h4>PAPER</h4>";
    userChoice = 2;
}
let scissorSelect = () => {
    userChoiceBox.setAttribute("id", "scissorClick");
    userChoiceBox.innerHTML = "<h4>SCISSOR</h4>";
    userChoice = 3;
}
//Submit Listener's Function(Main Funciton)
let SubmitClick = () => {
    if(userChoice === 1 || userChoice === 2 || userChoice === 3){
        if(attemptDone<maxAttempt){
            attemptDone++;
            attemptCount.innerText = `${attemptDone}/${maxAttempt}`;
            computerChoiceUpdate();
            chanceWinner();
            if(attemptDone === maxAttempt){
                gameWinner();
            }
        }else{
            instruction.innerHTML = '<font style="color: white; background-color: red;">ERROR:- PLEASE RESTART TO PLAY AGAIN!!</font>';            
            instructionBox.style.backgroundColor = "red";
        }
    }else{
        instruction.innerHTML = '<font style="color: white; background-color: red;">ERROR:- YOU HAVE NOT SELECTED YOUR CHOICE, PLEASE CHOOSE ONE THEN SUBMIT</font>';
        instructionBox.style.backgroundColor = "red";
    }
}
//Reset Listener's Function
let resetAll = () => {
    attemptDone = 0;
    computerScore = 0;
    userScore = 0;

    userChoice = 0;
    computerChoice = 0;
    instruction.innerHTML = "<font>PLEASE SELECT ONE & SUBMIT</font>";
    attemptCount.innerHTML = `${attemptDone}/${maxAttempt}`;
    instructionBox.style.backgroundColor = "transparent";

    scoreBoxesUpdate();
    resetChoiceBoxes();
}

//Event Listeners;
//Choice Selection Listeners
rock.addEventListener("click", rockSelect);
paper.addEventListener("click", paperSelect);
scissor.addEventListener("click", scissorSelect);

//Main Button Listeners
submit.addEventListener("click", SubmitClick);
restart.addEventListener("click", resetAll);