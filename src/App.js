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
    <button className='square' style={props.winningColor} onClick={props.onClick} >
      {props.value}
    </button >
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      status: 'First player: X',
      selectedOptionIsX: 'true',
      xIsNext: true,
      winningColor: {
        color: 'pink',
      },
      resetButtonColors: {
        color: '#007bff',
        backgroundColor: '#fff',
      },
      choosePlayerButton: {
        display: '',
      }

    }
  }

  handleClick(i) {

    const squares = this.state.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'

    this.setState({ squares: squares, xIsNext: !this.state.xIsNext, }, () => {
      this.handleStatus()
    })

  }

  handleStatus() {
    this.setState({ choosePlayerButton: { display: 'none' } })
    const winner = calculateWinner(this.state.squares)
    if (winner != null) {
      if (winner === 'draw') {
        this.setState({ status: 'No one won' })
      } else {
        this.setState({ status: 'Winner: ' + winner[0] })
      }
      this.setState({ resetButtonColors: { backgroundColor: '#007bff', color: '#fff' } })

    } else {

      let counter = 0;
      for (let n = 0; n < (this.state.squares).length; n++) {
        if (Array(9).fill(null)[n] === this.state.squares[n]) {
          counter += 1
        }
      }
      if (counter === 9) {
        this.setState({ status: 'Hello player: ' + (this.state.xIsNext ? 'X' : 'O') })
      } else {
        this.setState({ status: 'Next player: ' + (this.state.xIsNext ? 'X' : 'O') })
      }
    }

  }

  // ^sort out????

















  handleOptionChange = changeEvent => {

    this.setState({
      selectedOptionIsX: changeEvent.target.value, xIsNext: (this.state.selectedOptionIsX === 'true' ? false : true),

    }, () => { this.setState({ status: 'First player: ' + (this.state.selectedOptionIsX === 'true' ? 'X' : 'O') }, console.log(this.state.selectedOptionIsX)) })

  }

  handleReset() {

    this.setState({
      squares: Array(9).fill(null),

      resetButtonColors: { backgroundColor: '#fff', color: '#007bff' },
      selectedOptionIsX: (this.state.selectedOptionIsX === 'true' ? 'false' : 'true'),
      choosePlayerButton: { display: '' }
    }, () => { this.setState({ status: 'First player: ' + (this.state.selectedOptionIsX === 'true' ? 'X' : 'O'), xIsNext: (this.state.selectedOptionIsX === 'true' ? true : false) }) }

    )
  }

  renderSquare(i) {
    const winner = calculateWinner(this.state.squares)

    if (winner !== null && winner !== 'draw' && winner[1].includes(i)) {

      return (<WinningSquare
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        winningColor={this.state.winningColor}
      />)
    }

    return (<Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />)
  }


  renderChoosePlayer() {
    console.log('renderchooseplayer function')
    return (
      <form className='choosePlayer'>

        <div className="form-check">
          <label>
            <input
              type="radio"
              value={true}
              onChange={this.handleOptionChange}
              checked={this.state.selectedOptionIsX === 'true'}

              className="form-check-input"
            />
            Option X
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              value={false}
              onChange={this.handleOptionChange}
              checked={this.state.selectedOptionIsX === 'false'}
              className="form-check-input"
            />
            Option O
          </label>
        </div>


      </form>

    )
  }


  render() {

    return (
      <div>
        <div id='status' className="status">{this.state.status}</div>
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

        <button className='resetButton' style={this.state.resetButtonColors} onClick={() => this.handleReset()} >Reset here</button>

        <div style={this.state.choosePlayerButton}>{this.renderChoosePlayer()}</div>

      </div>
    )
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
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if ((squares[a] === squares[b]) && (squares[b] === squares[c]) && (squares[a] !== null)) {
      return [squares[a], lines[i]]
    }

  }

  if (squares.includes(null) !== true) {

    return 'draw'
  }
  return null
}



class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div ></div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }
}





// function calculateWinner(squares) {

//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ]

//   // console.log('Square is : ', squares)
//   // if (!lines.includes(squares))
//   //   return null

//   // else
//   //   return 'heyyyyy'



//   return lines.includes(squares)
//   squares = [x, b, y]

//   const result = lines.map(line => {
//     const [a, b, c] = line
//     if ((squares[a] === squares[b]) && (squares[b] === squares[c]) && (squares[a] !== null)) {
//       return [squares[a], line]
//     } else return null
//   })

//   if (result === null)
//     return squares.includes(null) !== true ? 'draw' : null

// }






export default App
