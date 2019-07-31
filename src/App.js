import React from 'react';

import './App.css';

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

function Square(props) {
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function WinningSquare(props) {
  return (
    <button className='winningColor' onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      initialPlayer: 'X',

    };
  }

  handleClick(i) {

    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({ squares: squares, xIsNext: !this.state.xIsNext, });
  }

  renderSquare(i) {
    const winner = calculateWinner(this.state.squares);

    if (winner !== null && winner !== 'draw' && winner[1].includes(i)) {

      return (<WinningSquare
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />);
    }
    return (<Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />);
  }

  renderChoosePlayer() {

    return (
      <form className='choosePlayer'>

        <div className="form-check">
          <label>
            <input
              type="radio"
              value="X"
            // checked = {xIsNext}
            />
            Start with: X
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              value="O"

            />
            Start with: O
          </label>
        </div>
      </form>

    );
  }


  render() {
    const winner = calculateWinner(this.state.squares);

    let status;
    let choosePlayerButton;
    if (winner != null) {
      if (winner === 'draw') {
        status = 'No one won'
      } else {
        // const winningArray = calculateWinner(this.state.squares)[1];
        status = 'Winner: ' + winner[0];
      }
      document.getElementsByClassName('resetButton').item(0).style.backgroundColor = '#007bff';
      document.getElementsByClassName('resetButton').item(0).style.color = '#fff'
    } else {
      // console.log(Array(9).fill(null)===this.state.squares)

      let n;
      let counter = 0;
      for (n = 0; n < (this.state.squares).length; n++) {
        if (Array(9).fill(null)[n] === this.state.squares[n]) {
          counter += 1
        }
      }

      if (counter === 9) {
        status = 'First player: ' + (this.state.xIsNext ? 'X' : 'O')
        choosePlayerButton = this.renderChoosePlayer()
        if (this.state.xIsNext === true) {
          console.log('next player: x')
        } else { console.log('next player: o') }

      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')

      }
    }
    return (
      <div>

        <div id='status' className="status">{status}</div>

        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>

        <button className='resetButton' onClick={() => {
          this.setState({ squares: Array(9).fill(null) }); document.getElementsByClassName('resetButton').item(0).style.backgroundColor = 'white';
          document.getElementsByClassName('resetButton').item(0).style.color = '#007bff'
        }} >Reset here</button>

        <div>{choosePlayerButton}</div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div >{}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if ((squares[a] === squares[b]) && (squares[b] === squares[c]) && (squares[a] !== null)) {
      return [squares[a], lines[i]];
    }

  }

  if (squares.includes(null) !== true) {
    return 'draw';
  }
  return null;
}





export default App;
