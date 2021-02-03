import React from 'react';
import GridSettingsButton from './GridSettingsButton';
import GridKey from './GridKey';
import '../style/GridSettingsBar.css';

const GridSettingsBar = (props) => {
  return (
    <div className="settings">
      <GridSettingsButton text="start" onClick={props.handleStartButtonClick} />
      <GridSettingsButton
        text="Clear Simulation"
        onClick={props.handleClearSimulationButtonClick}
      />
      <GridSettingsButton
        text="Reset Grid"
        onClick={props.handleResetGridButtonClick}
      />
      <GridKey />
    </div>
  );
};

export default GridSettingsBar;
