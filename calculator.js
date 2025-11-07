const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => {
    button.addEventListener("click", addNumber);
});

const operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
    operator.addEventListener("click", addOperator);
});

const display = document.getElementById("display");
display.addEventListener("keydown", keyboardInput);

const result = document.getElementById("result");
result.addEventListener("click", getResult);

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearDisplay);

const decimalButton = document.getElementById("decimal");
decimalButton.addEventListener("click",addDecimal);

const backspaceButton = document.getElementById("backspace");
backspaceButton.addEventListener("click", backSpace);

const percent = document.getElementById("percentage");
percent.addEventListener("click", addPercent);

const power = document.getElementById("power");
power.addEventListener("click", addPower);

let isResult = false;

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

function addNumber(numberEvent) {
    let number = 0;

    if (numberEvent.type === "click") {
        number = numberEvent.target.textContent;
    } else {
        number = numberEvent.key;
    }

    let lastChar = display.value.at(-1);

    if (lastChar === "%") {
        return;
    }

    if (isResult) {
        display.value = "";
        isResult = false;
    } 

    display.value += number;
}

function addOperator(operatorEvent) {
    let operation = "";

    if (operatorEvent.type === "click") {
        operation = operatorEvent.target.textContent;
    } else {
        operation = (operatorEvent.key === "/") ? "÷" : operatorEvent.key;
    }

    const symbols = /[+\-*÷]/;
    let secondLast = display.value.slice(-2, -1);

    if (symbols.test(secondLast)) {
        let userInput = display.value;
        display.value = userInput.replace(symbols, operation);
        return;
    }

    if (hasPairOfNumbers()) {
        getResult();
    }

    if (isResult) {
        isResult = false;
    }

    display.value += ` ${operation} `;

}

function getResult() {
    let userInput = display.value.split(" ");
    let result = 0;

    if (userInput.length === 3) {
        result = operate(...userInput);
    } else if (userInput.length === 1) {

        if (!userInput[0].includes("^")) {
            return;
        }
    
        result = Number(getPower(userInput[0]));
    } else {
        return;
    }

    let decimalIndex = result.toString().indexOf(".");

    if (decimalIndex >= 0) {
        let decimalPlace = result.toString().length - decimalIndex - 1;
        if (decimalPlace > 5) {
            display.value = result.toFixed(5);
            return;
        }
    }

    display.value = result;

    isResult = true;
}

function clearDisplay() {
    display.value = "";
}

function hasPairOfNumbers() {
    let userInput = display.value.split(" ");
    return userInput.length === 3;
}

function toNumber(number) {

    if (number.includes("^")) {
        number = getPower(number);
    } else if (number.includes("%")) {
        number = getPercent(number);
    }

    return Number(number);
}

function getPercent(number) {
    let result = Number(number.replace("%", "")) / 100;
    return result.toString();
}

function getPower(numbers) {
    let array = numbers.split("^");

    if (array[1].includes("%")) {
        let temp = getPercent(array[1]);
        array[1] = temp;
    }

    let base = Number(array[0]);
    let exponent = Number(array[1]);
    let result = Math.pow(base, exponent);
    return result.toString();
}

function addDecimal() {
    let userInput = display.value.split(" ");
    if (!userInput[userInput.length - 1].includes(".")) {
        display.value += ".";
    } else if (userInput[userInput.length - 1].includes("^")) {
        let temp = userInput[userInput.length - 1];
        let decimalIndex = temp.lastIndexOf(".");
        let powerIndex = temp.indexOf("^");

        if (powerIndex > decimalIndex) {
            display.value += ".";
        }
    }

}

function backSpace() {
    let userInput = display.value;
    const valid = /[0-9.]/;
    let lastChar = userInput.at(-1);

    if (valid.test(lastChar)) {
        display.value = userInput.slice(0, -1);
    }
}

function keyboardInput(keyEvent) {
    keyEvent.preventDefault();

    let key = keyEvent.key;

    const numbers = /\d/;
    const symbols = /[+\-*/]/;

    if (numbers.test(key)) {
        addNumber(keyEvent);
    } else if (symbols.test(key)) {
        addOperator(keyEvent);
    } else if (key === "Delete") {
        clearDisplay();
    } else if (key === "Backspace") {
        backSpace();
    } else if (key === "Enter" || key === "=") {
        getResult();
    } else if (key === ".") {
        addDecimal();
    } else if (key === "%") {
        addPercent();
    } else if (key === "^") {
        addPower();
    }
}

function isLastDigitANumber() {
    let userInput = display.value;
    let lastChar = userInput.at(-1);
    return /\d/.test(lastChar);
}

function addPercent() {
    if (isLastDigitANumber() && !isResult) {
        display.value += "%";
    }
}

function addPower() {
    if (isLastDigitANumber()) {
        display.value += "^";

        if (isResult) {
            isResult = false;
        }
    }
}