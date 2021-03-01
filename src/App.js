import React from 'react';
import './App.css';

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const operations = ["/", "*", "-", "+"];
const ids = {
  7: "seven",
  8: "eight",
  9: "nine",
  4: "four",
  5: "five",
  6: "six",
  1: "one",
  2: "two",
  3: "three",
  0: "zero",
  "/": "divide",
  "*": "multiply",
  "-": "subtract",
  "+": "add"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastPressed: undefined,
      calc: "0",
      operation: undefined
    };
   this.handleClick = this.handleClick.bind(this); 
  }

  handleClick = (e) => {
    const { calc, lastPressed } = this.state;
    const { innerText } = e.target;

    switch (innerText) {
      case "AC": {
        this.setState({
          calc: "0"
        });
        break;
      }

      case "=": {
        // eslint-disable-next-line no-eval
        const evaluated = eval(calc);
        this.setState({
          calc: evaluated
        });
        break;
      }

      case ".": {
        const splitted = calc.split(/[+\-*/]/);
        const last = splitted.slice(-1)[0];

        if (!last.includes(".")) {
          this.setState({
            calc: calc + "."
          });
        }
        break;
      }

      default: {
        let e = undefined;
        if (operations.includes(innerText)) {
          if (operations.includes(lastPressed) && innerText !== "-") {
            const lastNumberIdx = calc
              .split("")
              .reverse()
              .findIndex((char) => char !== " " && numbers.includes(+char));
            e = calc.slice(0, calc.length - lastNumberIdx) + ` ${innerText} `;
          } else {
            e = `${calc} ${innerText} `;
          }
        } else {
          e = calc === "0" ? innerText : calc + innerText;
        }
        this.setState({
          calc: e
        });
      }
    }
    this.setState({
      lastPressed: innerText
    });
  };

  render() {
    const { calc } = this.state;

    return (
      <div>
        <div className="calculator">
          <div className="display" id="display">
            {calc}
          </div>
          <div className="nums-container">
            <button
              className="largeHorizontal light-grey ac"
              onClick={this.handleClick}
              id="clear"
            >
              AC
            </button>

            {numbers.map((num) => (
              <button
                className={`dark-grey ${num === 0 && "largeHorizontal"}`}
                key={num}
                onClick={this.handleClick}
                id={ids[num]}
              >
                {num}
              </button>
            ))}

            <button
              className="light-grey"
              onClick={this.handleClick}
              id="decimal"
            >
              .
            </button>
          </div>

          <div className="ops-container">
            {operations.map((op) => (
              <button
                className="orange"
                key={op}
                onClick={this.handleClick}
                id={ids[op]}
              >
                {op}
              </button>
            ))}

            <button className="orange" onClick={this.handleClick} id="equals">
              =
            </button>
          </div>
        </div>

        <div className="author">
          {" "}
          Made by{" "}
          <a rel="noreferrer" href="https://github.com/Flautisimo" target="_blank">
            Flautisimo
          </a>
        </div>
      </div>
    );
  }
}

export default App;
