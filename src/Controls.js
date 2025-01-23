import React from 'react';

const Controls = ({ isRunning, playGame, stopGame, clearBoard }) => {
  return (
    <div className="controls">
      <button onClick={isRunning ? stopGame : playGame}>
        {isRunning ? 'Stop' : 'Play'}
      </button>
      <button onClick={clearBoard}>Clear Board</button>
    </div>
  );
};

export default Controls;
