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
const radiusBtn = document.querySelector(".radius");
const logarithmBtn = document.querySelector(".logarithm");
                       

const calcState = {
	prevNum: null,
	firstNum: null,
	currentNum:null,
	operator:null,
	calcType:null,
	calc:null,
	calcOutput:null,
	calcDisplay:"0",
}


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
	if (calcState.calcDisplay.length > 9) {
		return;
	} else if (calcState.operator === "=") {
		handleClear();
		handleNewFirstNumber(button);
	} else if (calcState.calcDisplay === "0") {
		handleFirstNumber(button);
	} 
	else {
		handleSubsequentNumber(button);
	}
}

// Number Handlers
function handleFirstNumber(button) {
	calcState.prevNum = null;
	if (button === decimalBtn) {
		handleFirstDecimal(button);
	} else if (calcState.prevNum === null) {
		calcState.currentNum = button.innerText;
		calcState.calcDisplay = calcState.currentNum;
		displayUpdate();
	} else {
		calcState.currentNum = calcState.prevNum + button.innerText;
		calcState.calcDisplay = calcState.currentNum;
		displayUpdate();
	}
}
function handleNewFirstNumber(button) {
	calcState.currentNum = button.innerText;
	calcState.calcDisplay = currentNum;
	displayUpdate();
}

function handleSubsequentNumber(button) {
	if (button === decimalBtn && calcState.calcDisplay.includes(".")) {
		return;
	} else {
		calcState.prevNum = calcState.calcDisplay;
		calcState.currentNum = calcState.prevNum + button.innerText;
		calcState.calcDisplay = calcState.currentNum;
	}
	displayUpdate();
}

function handleFirstDecimal(button) {
	if (calcState.calcDisplay.includes(".")) {
		return;
	} else {
		calcState.calcDisplay = "0" + button.innerText;
	}
	displayUpdate();
}

// Operators Input
function operatorInput(button) {
	if (button === clearBtn) {
		handleClear(button);
	} else if (
		button === minusBtn &&
		(calcState.currentNum === null || calcState.calcDisplay === "0")
	) {
		handleNegativeInt();
	} else if (calcState.currentNum === null) {
		return;
	}
	else if (button === sinusBtn){
		sin();
	}
	else if (button === cosinusBtn){
		cos();
	}
	else if (button === radiusBtn){
		pi();
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
	calcState.calcDisplay = "-";
	calcState.prevNum = "-";
	displayUpdate();
}

function handleOperator(button) {
	if (calcState.calcType === null && button === equalBtn) {
		return;
	} else if (calcState.calcType === null) {
		firstOperator(button);
	} else {
		handleCalc(button);
	}
	displayUpdate();
}

function firstOperator(button) {
	calcState.calcType = button.innerText;
	calcState.operator = calcState.calcType;
	calcState.firstNum = calcState.currentNum;
	calcState.prevNum = null;
	calcState.calcOutput = calcState.firstNum;
	calcState.calcDisplay = "0";
}

function handleCalc(button) {
	calcState.firstNum = parseFloat(calcState.firstNum);
	calcState.currentNum = parseFloat(calcState.currentNum);
	calcState.operator = button.innerText;
	calcState.prevNum = null;
	if (calcState.calc === null && calcState.operator === "=") {
		handleSingleOperator();
	} else if (calcState.calc != null && calcState.operator === "=") {
		handleCompoundEquals();
	} else {
		handleMultipleOperators(button);
	}
}

function handleSingleOperator() {
	calculate(calcState.firstNum);
	calcState.calcDisplay = calcState.calc;
	calcState.calcOutput = `${calcState.firstNum} ${calcState.calcType} ${calcState.currentNum}`;
	opType.innerText = "";
	displayUpdate();
}

function handleCompoundEquals() {
	calcState.calcOutput = `${calcState.calc} ${calcState.calcType} ${calcState.currentNum}`;
	calculate(calcState.calc);
	calcState.calcDisplay = numberRounder(calcState.calc.toString());
	displayUpdate();
}

function handleMultipleOperators(button) {
	if (calc != null && firstNum != calc) {
		calcState.firstNum = calcState.calc;
		calcState.calcOutput = `${calcState.calc}`;
		calcState.calcType = button.innerText;
		calcState.calcDisplay = "0";
	} else {
		calculate(firstNum);
		calcState.calcOutput = `${calc}`;
		calcState.calcType = button.innerText;
		calcState.calcDisplay = "0";
		calcState.firstNum = calcState.calc;
	}
}

function calculate(num) {
	switch (calcState.calcType) {
		case "+":
			calcState.calc = num + calcState.currentNum;
			break;
		case "-":
			calcState.calc = num - calcState.currentNum;
			break;
		case "x":
			calcState.calc = num * calcState.currentNum;
			break;
		case "÷":
			calcState.calc = num / calcState.currentNum;
			break;
	}
}
function sin() {
	calcState.calcDisplay = Math.sin(calcState.calcDisplay);
	displayUpdate();
  }
function cos() {
	calcState.calcDisplay = Math.cos(calcState.calcDisplay);
	displayUpdate();
  }
function pi() {
	calcState.calcDisplay = Math.PI * calcState.calcDisplay;
	displayUpdate();
  }
function log() {
	calcState.calcDisplay = Math.log(calcState.calcDisplay);
	displayUpdate();
  }
function handleClear() {
	calcState.prevNum = null;
	calcState.firstNum = null;
	calcState.currentNum = null;
	calcState.calcType = null;
	calcState.operator = null;
	calcState.calc = null;
	calcState.calcOutput = null;
	calcState.calcDisplay = "0";
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
	display.innerText = calcState.calcDisplay;
	opType.innerText = calcState.operator;
	currentCalc.innerText = calcState.calcOutput;
}

function calcReset() {
	calcState.prevNum = null;
	calcState.firstNum = null;
	calcState.calcType = null;
}
