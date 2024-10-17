const calculatorScreen = document.getElementById('calculator-screen');
let currentInput = '';
let previousInput = '';
let operation = null;

const updateScreen = (value) => {
  calculatorScreen.value = value;
};

const handleOperator = (op) => {
  if (currentInput === '') return;
  if (previousInput !== '') {
    calculate();
  }
  operation = op;
  previousInput = currentInput;
  currentInput = '';
};

const handleNumber = (number) => {
  if (currentInput.includes('.') && number === '.') 
    return;
  currentInput += number;
  updateScreen(currentInput);
};

const calculate = () => {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }
  currentInput = result;
  operation = undefined;
  previousInput = '';
  updateScreen(currentInput);
};

document.querySelectorAll('.number').forEach(button => {
  button.addEventListener('click', () => handleNumber(button.innerText));
});

document.querySelectorAll('.operator').forEach(button => {
  button.addEventListener('click', () => handleOperator(button.innerText));
});

document.querySelector('.equals').addEventListener('click', calculate);

document.querySelector('.clear').addEventListener('click', () => {
  currentInput = '';
  previousInput = '';
  operation = undefined;
  updateScreen('');
});

