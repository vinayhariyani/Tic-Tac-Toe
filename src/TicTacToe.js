import React, { useState } from "react";
import Square from "./Square";
import EndGame from "./EndGame";

const INITIAL = "";
const X_PLAYER = "X";
const O_PLAYER = "O";
const winCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function TicTacToe() {
  const [grid, setGrid] = useState(Array(9).fill(INITIAL));
  const [player, setPlayer] = useState(false);
  const [gameFinished, setGameFinised] = useState(false);
  const [draw, setDraw] = useState(false);
  const [winCount, setWinCount] = useState({ X: 0, O: 0 });

  function isGameOver() {
    if (!gameFinished) {
      //X wins-check
      for (let i = 0; i < 8; i++) {
        if (
          grid[winCombination[i][0]] === X_PLAYER &&
          grid[winCombination[i][1]] === X_PLAYER &&
          grid[winCombination[i][2]] === X_PLAYER
        ) {
          console.log("X wins");
          setGameFinised(true);
          setWinCount({ ...winCount, X: winCount.X + 1 });
          return;
        }
      }

      //O wins-check
      for (let i = 0; i < 8; i++) {
        if (
          grid[winCombination[i][0]] === O_PLAYER &&
          grid[winCombination[i][1]] === O_PLAYER &&
          grid[winCombination[i][2]] === O_PLAYER
        ) {
          setGameFinised(true);
          setWinCount({ ...winCount, O: winCount.O + 1 });
          console.log("O Wins");
          return;
        }
      }

      //If draw-check
      if (!grid.includes(INITIAL)) {
        console.log("Draw");
        setDraw(true);
        setGameFinised(true);
      }
    }
  }

  function restartGame() {
    setGrid(Array(9).fill(INITIAL));
    setGameFinised(false);
    setDraw(false);
  }

  function clearHistory() {
    setWinCount({ X: 0, O: 0 });
    restartGame();
  }

  isGameOver();

  function handleClick(id) {
    setGrid(
      grid.map((item, index) => {
        if (index === id) {
          if (player) {
            return X_PLAYER;
          } else {
            return O_PLAYER;
          }
        }
        return item;
      })
    );
    setPlayer(!player);
  }

  return (
    <div>
      <span className="win-history">
        X's WINS: {winCount.X} <br />
        O's WINS: {winCount.O}
      </span>

      {gameFinished && (
        <EndGame
          winCount={winCount}
          restartGame={restartGame}
          player={player}
          draw={draw}
          clearHistory={clearHistory}
        />
      )}
      <Square grid={grid} handleClick={handleClick} />
    </div>
  );
}

export default TicTacToe;
