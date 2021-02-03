const GridKey = () => {
  return (
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
  );
};

export default GridKey;
