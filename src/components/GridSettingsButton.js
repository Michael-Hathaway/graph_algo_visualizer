const GridSettingsButton = (props) => {
  return (
    <div className="item">
      <button className="clear-sim-button" onClick={() => props.onClick()}>
        {props.text}
      </button>
    </div>
  );
};

export default GridSettingsButton;
