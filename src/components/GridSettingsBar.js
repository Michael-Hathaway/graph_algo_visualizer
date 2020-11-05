import React from "react";
import "../style/GridSettingsBar.css";

const GridSettingsBar = (props) => {
  return (
    <div className="settings">
      <div className="item select-start">
        <button
          className="select-start-button"
          onClick={() => props.handleSetStartNodeClick()}
        >
          Set Start Node
        </button>
      </div>
      <div className="item select-finish">
        <button
          className="select-finish-button"
          onClick={() => props.handleSetFinishNodeClick()}
        >
          Set Finish Node
        </button>
      </div>
      <div className="item add-wall">
        <button
          className="add-wall-button"
          onClick={() => props.handleSetWallButtonClick()}
        >
          Add Walls
        </button>
      </div>
      <div className="item start-sim">
        <button
          className="start-sim-button"
          onClick={() => props.handleStartButtonClick()}
        >
          Start
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
    </div>
  );
};

export default GridSettingsBar;
