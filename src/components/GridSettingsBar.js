import React from "react";
import "../style/GridSettingsBar.css";

const GridSettingsBar = (props) => {
  return (
    <div className="settings">
      <div className="item start-sim">
        <button
          className="start-sim-button"
          onClick={() => props.handleStartButtonClick()}
        >
          Start
        </button>
      </div>
      <div className="item clear-sim">
        <button
          className="clear-sim-button"
          onClick={() => props.handleClearSimulationButtonClick()}
        >
          Clear Simulation
        </button>
      </div>
      <div className="item reset-grid">
        <button
          className="reset-grid-button"
          onClick={() => props.handleResetGridButtonClick()}
        >
          Reset Grid
        </button>
      </div>
      <div className="item maze">
        <button
          className="generate-maze-button"
          onClick={() => props.handleMazeButtonClick()}
        >
          Generate Maze
        </button>
      </div>
      <div className="item key">
        <div className="key-item">
          <div className="node node-start"></div>
          <p>Start</p>
        </div>
        <div className="key-item">
          <div className="node node-finish"></div>
          <p>Finish</p>
        </div>
        <div className="key-item">
          <p>
            Drag start and finish nodes to change location. Click and drag empty
            squares to create walls
          </p>
        </div>
      </div>
    </div>
  );
};

export default GridSettingsBar;
