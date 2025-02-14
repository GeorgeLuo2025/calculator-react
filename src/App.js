import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaiting] = useState(false);

  // 处理数字按钮点击
  const handleNumber = (number) => {
    if (waitingForSecondOperand) {
      if (operator) {
        setFirstOperand(display);
      }
      setDisplay(number);
      setWaiting(false);
    } else {
      setDisplay(display === '0' ? number : display + number);
    }
  };

  // 处理小数点
  const handleDecimal = () => {
    if (waitingForSecondOperand) {
      if (operator) {
        setFirstOperand(display);
      }
      setDisplay("0.");
      setWaiting(false);
    } else {
      if (!display.includes('.')) {
        setDisplay(display + '.');
      }
    }
  };

  // 处理运算符
  const handleOperator = (nextOperator) => {
    // const inputValue = parseFloat(display);
    
    if (firstOperand != null) {
    //   set
    //   setFirstOperand(inputValue);
    // } else if (operator) {
      const result = calculate(parseFloat(firstOperand), parseFloat(display), operator);
      setDisplay(String(result));
      setFirstOperand(null);
    }
    
    setOperator(nextOperator);
    setWaiting(true);
  };

  // 执行计算
  const calculate = (a, b, op) => {
    let result;
    switch(op) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '×': result = a * b; break;
      case '÷': result = a / b; break;
      default: return b;
    }
    return formatResult(result);
  };

  // 处理等于按钮
  const handleEqual = () => {
    if (firstOperand !== null) {
      const result = calculate(parseFloat(firstOperand), parseFloat(display), operator);
      // const inputValue = parseFloat(display);
      // const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaiting(true);
    }
  };

  const formatResult = (num) => {
    // 限制最多显示 10 位小数
    return parseFloat(num.toFixed(10)).toString();
  };
  // 清除所有状态
  const handleClear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaiting(false);
  };

  return (
    // 不同component的话 触法不同faunction 相同input 相同component 外部function用if handle
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button className="clear" onClick={handleClear}>C</button>
        <button className="operator" onClick={() => handleOperator('+')}>+</button>
        <button className="operator" onClick={() => handleOperator('-')}>-</button>
        <button className="operator" onClick={() => handleOperator('×')}>×</button>

        <button className="number" onClick={() => handleNumber('7')}>7</button>
        <button className="number" onClick={() => handleNumber('8')}>8</button>
        <button className="number" onClick={() => handleNumber('9')}>9</button>
        <button className="operator" onClick={() => handleOperator('÷')}>÷</button>

        <button className="number" onClick={() => handleNumber('4')}>4</button>
        <button className="number" onClick={() => handleNumber('5')}>5</button>
        <button className="number" onClick={() => handleNumber('6')}>6</button>
        <button className="equal" onClick={handleEqual}>=</button>

        <button className="number" onClick={() => handleNumber('1')}>1</button>
        <button className="number" onClick={() => handleNumber('2')}>2</button>
        <button className="number" onClick={() => handleNumber('3')}>3</button>
        <button className="operator" onClick={() => handleNumber('^')}>^</button>
        
        <button className="number zero" onClick={() => handleNumber('0')}>0</button>
        <button className="decimal" onClick={handleDecimal}>.</button>
        <button className="operator" onClick={() => handleNumber('√')}>√</button>

      </div>
    </div>
  );
};

export default App;