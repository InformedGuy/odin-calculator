function operate(x, symbol, y) {

    let numberX = toNumber(x);
    let numberY = toNumber(y);

    switch(symbol) {
        case "+":
            return add(numberX, numberY);
        case "-":
            return subtract(numberX, numberY);
        case "*":
            return multiply(numberX, numberY);
        case "÷":
            if (numberY === 0) {
                alert("Cannot divide a number by 0");
            } else {
                return divide(numberX, numberY)
            }
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

        const symbols = /[+\-*÷]/;
        let secondLast = display.value.slice(-2, -1);

        if (symbols.test(secondLast)) {
            let userInput = display.value;
            display.value = userInput.replace(symbols, event.target.textContent);
            return;
        }

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
        let result = operate(...userInput);
        let decimalIndex = result.toString().indexOf(".");

        if (decimalIndex >= 0) {
            let decimalPlace = result.toString().length - decimalIndex - 1;
            if (decimalPlace > 5) {
                display.value = result.toFixed(5);
                return;
            }
        }

        display.value = result;
    }
}

function clearDisplay() {
    display.value = "";
}

function hasPairOfNumbers() {
    let userInput = display.value.split(" ");
    return userInput.length === 3;
}

function toNumber(number) {
    if (number.includes(".")) {
        return parseFloat(number);
    } else {
        return parseInt(number);
    }
}

const decimalButton = document.getElementById("decimal");
decimalButton.addEventListener("click", () => {
    let userInput = display.value.split(" ");
    if (!userInput[userInput.length - 1].includes(".")) {
        display.value += ".";
    }
});

const deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", () => {
    let userInput = display.value;
    const valid = /[0-9.]/;
    let lastChar = userInput.at(-1);

    if (valid.test(lastChar)) {
        display.value = userInput.slice(0, -1);
    }
});