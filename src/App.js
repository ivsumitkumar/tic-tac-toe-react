import { useState } from 'react';

function CalculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square({ value, onSquareClick }) {
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  // const [xIsNext, setxIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));

  
  
  function handleClick(i) {
    
    if (squares[i] || CalculateWinner(squares)) {
      return;
    }
    
    const nextSquare = squares.slice();
    if (xIsNext) {
      nextSquare[i] = "X";
    }
    else {
      nextSquare[i] = "O";
    }
    // setSquares(nextSquare);
    // setxIsNext(!xIsNext);
    onPlay(nextSquare);
  }
  
  const winner = CalculateWinner(squares);
  let status;
  if (winner) {
    status = "Hooray! Winner is: " + winner;
  }
  else {
    status = "Next Player is: " + (xIsNext ? "X" : "O");
  }
  
  // making board-row using two loops #Failed
  // const boardRows =[];
  // let index = 0;
  // for (let i=0; i<3; i++){
  //   const squareRow=[];
  //   for (let j=0; j<3; j++){
  //     squareRow.push(
  //       <Square value = {squares[index]} onSquareClick={() => handleClick(index)} />
  //     );
  //     index++;
  //   }
  //   boardRows.push(
  //     <div className='board-row'>
  //       {squareRow}
  //     </div>
  //   );
  // }


  return (
    <>
      <div className='status'>{status}</div>
      {/* {boardRows} */}
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  // const [xIsNext,setxIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove%2===0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    // setxIsNext(!xIsNext);

  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // setxIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let discription;
    if (move > 0) {
      discription = "Go to move #" + move;
    }
    else {
      discription = "Go to Start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{discription}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='current-status'>You are at move #: {currentMove}</div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}