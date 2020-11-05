import React from "react";

const AlgorithmSelectionBar = ({
  algorithms,
  selectedAlgorithm,
  setSelectedAlgorithm,
}) => {
  const renderedSelectionButtons = algorithms.map((algo) => {
    let classname =
      selectedAlgorithm.value === algo.value ? "menu-item active" : "menu-item";

    return (
      <div
        key={algo.value}
        className={classname}
        onClick={() => setSelectedAlgorithm(algo)}
      >
        {algo.label}
      </div>
    );
  });

  return <div className="algorithm-menu">{renderedSelectionButtons}</div>;
};

export default AlgorithmSelectionBar;
