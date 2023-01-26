const output = document.querySelector(".output");
const numbers = document.querySelectorAll(".btn-number");
const operators = document.querySelectorAll(".btn-operand");
const clear = document.querySelector(".btn-clear");
const equals = document.querySelector(".btn-equals");
const calc = document.querySelector("#calculator");

let calculator = {
  displayValue: "",
  storedValue: "",
  operation: "",
  computed: "",
  maxLength: 15,
};

function divideByZero() {
  if (calculator.operation === "÷" && calculator.displayValue === "0") {
    calculator.displayValue = "just ask Siri";
  }
}

function checkLength() {
  const check = calculator.computed.toString();
  if (check.length > calculator.maxLength) {
    const trim = check.substring(0, calculator.maxLength);
    calculator.displayValue = parseFloat(trim);
  } else {
    calculator.displayValue = calculator.computed;
  }
  calculator.operation = "";
  calculator.storedValue = "";
}

function clearDisplay() {
  calculator.displayValue = "";
  calculator.storedValue = "";
  calculator.operation = "";
  calculator.computed = "";
  updateDisplay();
}

function updateDisplay() {
  if (calculator.displayValue.length > calculator.maxLength) return;
  divideByZero();
  output.value = calculator.displayValue;
}

numbers.forEach((num) => {
  num.addEventListener("click", function () {
    //disables....123
    if (num.textContent === "." && calculator.displayValue.includes("."))
      return;
    //disables -0000000
    if (num.textContent === "0" && calculator.displayValue.split("")[0] === "-")
      return;
    //disables 000000
    if (calculator.displayValue === "" && num.textContent === "0") return;
    calculator.displayValue += num.textContent;
    updateDisplay();
  });
});

operators.forEach((operation) => {
  operation.addEventListener("click", function () {
    //initializes a negative number
    if (calculator.displayValue === "" && operation.textContent === "-") {
      calculator.displayValue += operation.textContent;
      updateDisplay();
      return;
    }
    //disables --5
    if (operation.textContent === "-" && calculator.displayValue === "-")
      return;

    if (calculator.displayValue === "") return;
    calculator.operation = operation.textContent;
    calculator.storedValue = calculator.displayValue;
    calculator.displayValue = "";
    updateDisplay();
  });
});

function compute() {
  const previous = parseFloat(calculator.storedValue);
  const current = parseFloat(calculator.displayValue);
  if (Number.isNaN(previous) || Number.isNaN(current)) return;
  switch (calculator.operation) {
    case "+":
      calculator.computed = previous + current;
      break;
    case "-":
      calculator.computed = previous - current;
      break;
    case "×":
      calculator.computed = previous * current;
      break;
    case "÷":
      calculator.computed = previous / current;
      break;
    default:
      return;
  }
  checkLength();
  updateDisplay();
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("🤖");
});

clear.addEventListener("click", clearDisplay);
equals.addEventListener("click", compute);
