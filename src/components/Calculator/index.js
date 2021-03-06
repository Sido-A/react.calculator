import React, { useState, useEffect } from "react";
import { buttons } from "./buttons";
import "./Calculator.scss";

const Calculator = () => {
  const [action, setAction] = useState({
    symbol: "",
    firstNumber: 0,
    secondNumber: 0,
  });

  //   useEffect(() => {
  //     console.log("action", action);

  //     setAction(action);
  //   }, [action]);

  const calculate = (firstNumber, secondNumber, symbol) => {
    switch (action.symbol) {
      case "+":
        setAction({
          firstNumber: firstNumber + secondNumber,
          secondNumber: 0,
          //   symbol: "",
        });
        break;
      case "-":
        setAction({
          firstNumber: firstNumber - secondNumber,
          secondNumber: 0,
          //   symbol: "",
        });
        break;

      case "×":
        setAction({
          firstNumber: firstNumber * secondNumber,
          secondNumber: 0,
          //   symbol: "",
        });
        break;

      case "÷":
        setAction({
          firstNumber: firstNumber / secondNumber,
          secondNumber: 0,
          //   symbol: "",
        });
        break;

      case "%":
        setAction({
          firstNumber: firstNumber / 100,
          secondNumber: 0,
          //   symbol: "",
        });
        break;

      case "=":
        setAction({
          firstNumber: `${firstNumber}${action.symbol}${secondNumber}`,
          secondNumber: 0,
          // symbol: "",
        });
        break;
    }
  };

  const clearCalc = () => {
    if (action.secondNumber) {
      setAction({
        ...action,
        secondNumber: 0,
      });
    } else {
      setAction({
        ...action,
        firstNumber: 0,
        symbol: "",
      });
    }
  };

  const plusMinusCalc = () => {
    if (action.secondNumber) {
      setAction({
        ...action,
        secondNumber: action.secondNumber * -1,
      });
    } else {
      setAction({
        ...action,
        firstNumber: action.firstNumber * -1,
      });
    }
  };

  const percentCalc = () => {
    setAction({
      ...action,
      firstNumber: action.firstNumber / 100,
      symbol: "",
    });
  };

  const decimalCalc = () => {
    if (action.secondNumber) {
      if (action.secondNumber.include(".")) {
        const number2 = action.secondNumber.string();
        number2 += ".";
      }
      setAction({
        ...action,
        secondNumber: action.secondNumber,
      });
    } else {
      setAction({
        ...action,
        firstNumber: action.firstNumber,
      });
    }
  };

  const clickHandler = (event) => {
    const value = event.target.dataset.value;
    const type = event.target.dataset.type;

    if (type === "number" && action.symbol && action.firstNumber) {
      const newNumber = action.secondNumber + value;
      setAction({
        ...action,
        secondNumber: parseInt(newNumber),
      });
    } else if (type === "number") {
      const newNumber = action.firstNumber + value;
      setAction({
        ...action,
        firstNumber: parseInt(newNumber),
      });
    } else if (type === "symbol") {
      if (action.secondNumber && action.firstNumber) {
        calculate(action.firstNumber, action.secondNumber, value);
      } else {
        setAction({
          ...action,
          symbol: value,
        });
      }
    } else if (type === "clear") {
      clearCalc();
    } else if (type === "plusMinus") {
      plusMinusCalc();
    } else if (type === "percent") {
      percentCalc();
    } else if (type === "decimal") {
      decimalCalc();
    }
  };

  return (
    <div className={"layout"}>
      <header className={"result"}>
        {action.secondNumber || action.firstNumber}
      </header>
      <section className="pad">
        <ul>
          {buttons.map(({ label, type }) => {
            return (
              <li key={label}>
                <span
                  data-type={type}
                  data-value={label}
                  onClick={clickHandler}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default Calculator;
