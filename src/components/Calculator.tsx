import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const deleteLast = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let newValue = currentValue;

      switch (operation) {
        case "+":
          newValue = currentValue + inputValue;
          break;
        case "-":
          newValue = currentValue - inputValue;
          break;
        case "×":
          newValue = currentValue * inputValue;
          break;
        case "÷":
          newValue = currentValue / inputValue;
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      let newValue = previousValue;

      switch (operation) {
        case "+":
          newValue = previousValue + inputValue;
          break;
        case "-":
          newValue = previousValue - inputValue;
          break;
        case "×":
          newValue = previousValue * inputValue;
          break;
        case "÷":
          newValue = previousValue / inputValue;
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        inputDigit(e.key);
      } else if (e.key === ".") {
        inputDecimal();
      } else if (e.key === "+" || e.key === "-") {
        performOperation(e.key);
      } else if (e.key === "*") {
        performOperation("×");
      } else if (e.key === "/") {
        e.preventDefault();
        performOperation("÷");
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleEquals();
      } else if (e.key === "Escape") {
        clear();
      } else if (e.key === "Backspace") {
        deleteLast();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  const buttonClass = "h-16 text-lg font-semibold transition-all hover:scale-105 active:scale-95";
  const numberClass = `${buttonClass} bg-calc-number hover:bg-calc-number/80 text-foreground`;
  const operatorClass = `${buttonClass} bg-calc-operator hover:bg-calc-operator/90 text-primary-foreground font-bold`;
  const actionClass = `${buttonClass} bg-calc-action hover:bg-calc-action/90 text-destructive-foreground`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="bg-card rounded-3xl p-6 shadow-[var(--calc-shadow)]">
          <div className="bg-calc-display rounded-2xl p-6 mb-6 min-h-[100px] flex items-end justify-end">
            <div className="text-5xl font-bold text-foreground font-mono truncate">
              {display}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <Button onClick={clear} className={actionClass}>
              AC
            </Button>
            <Button onClick={deleteLast} className={actionClass}>
              DEL
            </Button>
            <Button onClick={() => performOperation("÷")} className={operatorClass}>
              ÷
            </Button>
            <Button onClick={() => performOperation("×")} className={operatorClass}>
              ×
            </Button>

            <Button onClick={() => inputDigit("7")} className={numberClass}>
              7
            </Button>
            <Button onClick={() => inputDigit("8")} className={numberClass}>
              8
            </Button>
            <Button onClick={() => inputDigit("9")} className={numberClass}>
              9
            </Button>
            <Button onClick={() => performOperation("-")} className={operatorClass}>
              −
            </Button>

            <Button onClick={() => inputDigit("4")} className={numberClass}>
              4
            </Button>
            <Button onClick={() => inputDigit("5")} className={numberClass}>
              5
            </Button>
            <Button onClick={() => inputDigit("6")} className={numberClass}>
              6
            </Button>
            <Button onClick={() => performOperation("+")} className={operatorClass}>
              +
            </Button>

            <Button onClick={() => inputDigit("1")} className={numberClass}>
              1
            </Button>
            <Button onClick={() => inputDigit("2")} className={numberClass}>
              2
            </Button>
            <Button onClick={() => inputDigit("3")} className={numberClass}>
              3
            </Button>
            <Button
              onClick={handleEquals}
              className={`${operatorClass} row-span-2`}
            >
              =
            </Button>

            <Button
              onClick={() => inputDigit("0")}
              className={`${numberClass} col-span-2`}
            >
              0
            </Button>
            <Button onClick={inputDecimal} className={numberClass}>
              .
            </Button>
          </div>
        </div>
        
        <p className="text-center text-muted-foreground text-sm mt-4">
          Keyboard shortcuts supported
        </p>
      </div>
    </div>
  );
};

export default Calculator;
