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
        <button className="start-sim-button">Start</button>
      </div>
    </div>
  );
};

export default GridSettingsBar;
