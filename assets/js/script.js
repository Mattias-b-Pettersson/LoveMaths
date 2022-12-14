//waiting for the DOM to finish loading before running game
// get the button elements and add eventlistener to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    runGame("addition");
})

/**
 * The main game "loop", called when the script is fist loaded and after the users answer has been processed.
 */

function runGame(gameType) {

    // generates two random numbers
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;
    
    
    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);

    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);

    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    
    } else if (gameType === "division") {
        displayDivisionQuestion(num1, num2);

    }else{
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }

}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array.
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Answer is correct!")
        incrementScore();
    } else {
        alert(`WRONG! The correct answer is ${calculatedAnswer[0]}`)
        incrementWrongAnswer()
    }

    runGame(calculatedAnswer[1])

}

/**
 * Gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the DOM, and returns the correct answer.
 */
function calculateCorrectAnswer() {
    
    let operand1 = parseInt(document.getElementById("operand1").innerText)
    let operand2 = parseInt(document.getElementById("operand2").innerText)
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"]
    } else if (operator === "X"){
        return [operand1 * operand2, "multiply"]
    }else if (operator === "-"){
        return [operand1 - operand2, "subtract"]
    }else if (operator === "/"){
        return [Math.round(operand1 / operand2), "division"]
    }else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator: ${gameType}. Aborting!`;
    }
}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {
    let score = parseInt(document.getElementById("score").innerText)
    document.getElementById("score").innerText = ++score;
}

/**
 * Gets the current wrong answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {
    let incorrect = parseInt(document.getElementById("incorrect").innerText)
    document.getElementById("incorrect").innerText = ++score;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "X";
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 * operand2;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "/";
}

