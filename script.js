const display = document.querySelector(".display");
const opType = document.querySelector(".operator-type");
const currentCalc = document.querySelector(".current-calc");
const btns = document.querySelectorAll("button");
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const decimalBtn = document.querySelector(".decimal");
const clearBtn = document.querySelector(".clear");
const equalBtn = document.querySelector(".equal");
const minusBtn = document.querySelector(".minus");
const sinusBtn = document.querySelector(".sinus");
const cosinusBtn = document.querySelector(".cosinus");
const tangentBtn = document.querySelector(".tangent");
const logarithmBtn = document.querySelector(".logarithm");
const opaSbtn = document.querySelector(".opas");

let prevNum = null;
let firstNum = null;
let currentNum = null;
let operator = null;
let calcType = null;
let calc = null;
let calcOutput = null;
let calcDisplay = "0";

// Button Event Listener
for (let button of numberBtns)
	button.addEventListener("click", () => {
		numberInput(button);
	});
for (let button of operatorBtns)
	button.addEventListener("click", () => {
		operatorInput(button);
	});

// Numbers Input
function numberInput(button) {
	if (calcDisplay.length > 9) {
		return;
	} else if (operator === "=") {
		handleClear();
		handleNewFirstNumber(button);
	} else if (calcDisplay === "0") {
		handleFirstNumber(button);
	} 
	else {
		handleSubsequentNumber(button);
	}
}

// Number Handlers
function handleFirstNumber(button) {
	prevNum = null;
	if (button === decimalBtn) {
		handleFirstDecimal(button);
	} else if (prevNum === null) {
		currentNum = button.innerText;
		calcDisplay = currentNum;
		displayUpdate();
	} else {
		currentNum = prevNum + button.innerText;
		calcDisplay = currentNum;
		displayUpdate();
	}
}
function handleNewFirstNumber(button) {
	currentNum = button.innerText;
	calcDisplay = currentNum;
	displayUpdate();
}

function handleSubsequentNumber(button) {
	if (button === decimalBtn && calcDisplay.includes(".")) {
		return;
	} else {
		prevNum = calcDisplay;
		currentNum = prevNum + button.innerText;
		calcDisplay = currentNum;
	}
	displayUpdate();
}

function handleFirstDecimal(button) {
	if (calcDisplay.includes(".")) {
		return;
	} else {
		calcDisplay = "0" + button.innerText;
	}
	displayUpdate();
}

// Operators Input
function operatorInput(button) {
	if (button === clearBtn) {
		handleClear(button);
	} else if (
		button === minusBtn &&
		(currentNum === null || calcDisplay === "0")
	) {
		handleNegativeInt();
	} else if (currentNum === null) {
		return;
	}
	else if (button === sinusBtn){
		sin();
	}
	else if (button === cosinusBtn){
		cos();
	}
	else if (button === tangentBtn){
		tan();
	}
	else if (button === logarithmBtn){
		log();
	}
	 else {
		handleOperator(button);
	}
}

// Operator Handlers
function handleNegativeInt() {
	calcDisplay = "-";
	prevNum = "-";
	displayUpdate();
}

function handleOperator(button) {
	if (calcType === null && button === equalBtn) {
		return;
	} else if (calcType === null) {
		firstOperator(button);
	} else {
		handleCalc(button);
	}
	displayUpdate();
}

function firstOperator(button) {
	calcType = button.innerText;
	operator = calcType;
	firstNum = currentNum;
	prevNum = null;
	calcOutput = firstNum;
	calcDisplay = "0";
}

function handleCalc(button) {
	firstNum = parseFloat(firstNum);
	currentNum = parseFloat(currentNum);
	operator = button.innerText;
	prevNum = null;
	if (calc === null && operator === "=") {
		handleSingleOperator();
	} else if (calc != null && operator === "=") {
		handleCompoundEquals();
	} else {
		handleMultipleOperators(button);
	}
}

function handleSingleOperator() {
	calculate(firstNum);
	calcDisplay = calc;
	calcOutput = `${firstNum} ${calcType} ${currentNum}`;
	opType.innerText = "";
	displayUpdate();
}

function handleCompoundEquals() {
	calcOutput = `${calc} ${calcType} ${currentNum}`;
	calculate(calc);
	calcDisplay = numberRounder(calc.toString());
	displayUpdate();
}

function handleMultipleOperators(button) {
	if (calc != null && firstNum != calc) {
		firstNum = calc;
		calcOutput = `${calc}`;
		calcType = button.innerText;
		calcDisplay = "0";
	} else {
		calculate(firstNum);
		calcOutput = `${calc}`;
		calcType = button.innerText;
		calcDisplay = "0";
		firstNum = calc;
	}
}

function calculate(num) {
	switch (calcType) {
		case "+":
			calc = num + currentNum;
			break;
		case "-":
			calc = num - currentNum;
			break;
		case "x":
			calc = num * currentNum;
			break;
		case "÷":
			calc = num / currentNum;
			break;
	}
}
function sin() {
	calcDisplay = Math.sin(calcDisplay);
	displayUpdate();
  }
function cos() {
	calcDisplay = Math.cos(calcDisplay);
	displayUpdate();
  }
function tan() {
	calcDisplay = Math.tan(calcDisplay);
	displayUpdate();
  }
function log() {
	calcDisplay = Math.log(calcDisplay);
	displayUpdate();
  }
function handleClear() {
	prevNum = null;
	firstNum = null;
	currentNum = null;
	calcType = null;
	operator = null;
	calc = null;
	calcOutput = null;
	calcDisplay = "0";
	displayUpdate();
}

// Display Update
function numberRounder(number) {
	if (number.length > 10) {
		scientificNumber = parseFloat(number).toExponential(5);
		return scientificNumber;
	} else {
		return parseFloat(number);
	}
}
function displayUpdate() {
	display.innerText = calcDisplay;
	opType.innerText = operator;
	currentCalc.innerText = calcOutput;
}

function calcReset() {
	prevNum = null;
	firstNum = null;
	calcType = null;
}
