function operate(x, symbol, y) {
    let intX = parseInt(x);
    let intY = parseInt(y);

    switch(symbol) {
        case "+":
            return add(intX, intY);
        case "-":
            return subtract(intX, intY);
        case "*":
            return multiply(intX, intY);
        default:
            return divide(intX, intY);
    }
}

function add(first, second) {
    return first + second;
}

function subtract(first, second) {
    return first - second;
}

function multiply(first, second) {
    return first * second;
}

function divide(first, second) {
    return first / second;
}

const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const display = document.getElementById("display");

numberButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        display.value += event.target.textContent;
    });
});

operators.forEach(operator => {
    operator.addEventListener("click", (event) => {

        if (hasPairOfNumbers()) {
            getResult();
        }

        display.value += ` ${event.target.textContent} `;
    });
});

const result = document.getElementById("result");
result.addEventListener("click", getResult);

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearDisplay);

function getResult() {
    let userInput = display.value.split(" ");
    if (userInput.length === 3) {
        display.value = operate(...userInput);
    }
}

function clearDisplay() {
    display.value = "";
}

function hasPairOfNumbers() {
    let userInput = display.value.split(" ");
    return userInput.length === 3;
}