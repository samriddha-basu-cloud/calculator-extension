document.addEventListener('DOMContentLoaded', function() {
  let display = document.getElementById('display');
  let currentInput = '0';
  let previousInput = '';
  let operation = null;
  let shouldResetDisplay = false;

  function updateDisplay() {
    display.textContent = currentInput;
  }

  function handleNumberInput(number) {
    if (shouldResetDisplay) {
      currentInput = number;
      shouldResetDisplay = false;
    } else {
      currentInput = currentInput === '0' ? number : currentInput + number;
    }
    updateDisplay();
  }

  function handleDecimalInput() {
    if (!currentInput.includes('.')) {
      currentInput += '.';
      updateDisplay();
    }
  }

  function handleOperatorInput(op) {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    shouldResetDisplay = true;
  }

  function calculate() {
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
      case '%':
        result = prev % current;
        break;
      default:
        return;
    }
    currentInput = result.toString();
    operation = null;
    updateDisplay();
  }

  function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
  }

  function handleBackspace() {
    currentInput = currentInput.slice(0, -1) || '0';
    updateDisplay();
  }

  function handleNegate() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
  }

  document.querySelectorAll('.calculator button').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      switch (action) {
        case 'number':
          handleNumberInput(button.dataset.number);
          break;
        case 'decimal':
          handleDecimalInput();
          break;
        case 'operator':
          handleOperatorInput(button.dataset.operator);
          break;
        case 'calculate':
          calculate();
          break;
        case 'clear':
          clearCalculator();
          break;
        case 'backspace':
          handleBackspace();
          break;
        case 'negate':
          handleNegate();
          break;
      }
    });
  });
});