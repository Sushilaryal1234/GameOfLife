import React from 'react';
import './Cell.css';

const Cell = ({ isAlive, toggleCellState }) => {
  return (
    <div
      className={`cell ${isAlive ? 'alive' : 'dead'}`}
      onClick={toggleCellState}
    />
  );
};

export default Cell;
