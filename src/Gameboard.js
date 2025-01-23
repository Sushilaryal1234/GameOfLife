import React from 'react';
import Cell from './Cell';

const GameBoard = ({ board, toggleCellState }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              isAlive={cell}
              toggleCellState={() => toggleCellState(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
