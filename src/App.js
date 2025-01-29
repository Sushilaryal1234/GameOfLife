import React, { useState, useEffect } from 'react';
import GameBoard from './Gameboard';
import Controls from './Controls';
import './GameOfLife.css';

const numRows = 20;
const numCols = 20;

const generateEmptyBoard = () => {
  return Array.from({ length: numRows }, () => Array(numCols).fill(0));
};

const GameOfLife = () => {
  const [sushil, setSushil] = useState("Sushil");
  const [board, setBoard] = useState(generateEmptyBoard());
  const [isRunning, setIsRunning] = useState(false);

  const toggleCellState = (row, col) => {
    const newBoard = board.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? (c ? 0 : 1) : c))
    );
    setBoard(newBoard);
  };

  const countNeighbors = (board, x, y) => {
    const directions = [
      [0, 1], [1, 0], [0, -1], [-1, 0],
      [-1, -1], [-1, 1], [1, -1], [1, 1],
    ];
    return directions.reduce((acc, [dx, dy]) => {
      const newRow = x + dx;
      const newCol = y + dy;
      if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
        return acc + board[newRow][newCol];
      }
      return acc;
    }, 0);
  };

  const updateBoard = () => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row, x) =>
        row.map((cell, y) => {
          const neighbors = countNeighbors(prevBoard, x, y);
          if (cell === 1 && (neighbors < 5 || neighbors > 6)) {
            return 0; 
          }
          if (cell === 0 && neighbors === 5) {
            return 1; 
          }
          return cell; 
        })
      );
      return newBoard;
    });
  };

  
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      updateBoard();
    }, 1000); 

    return () => clearInterval(interval); 
  }, [isRunning]);

  
  const playGame = () => setIsRunning(true);
  const stopGame = () => setIsRunning(false);
  const clearBoard = () => setBoard(generateEmptyBoard());

  return (
    <div>
      <h1>Conway's Game of Life</h1>
      <GameBoard board={board} toggleCellState={toggleCellState} />
      <Controls
        isRunning={isRunning}
        playGame={playGame}
        stopGame={stopGame}
        clearBoard={clearBoard}
      />
    </div>
  );
};

export default GameOfLife;
