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
      <div className="item reset-grid">
        <button
          className="reset-grid-button"
          onClick={() => props.handleResetGridButtonClick()}
        >
          Reset Grid
        </button>
      </div>
      <div className="item">
        <p>Click and Drag on the screen to add walls.</p>
      </div>
    </div>
  );
};

export default GridSettingsBar;
