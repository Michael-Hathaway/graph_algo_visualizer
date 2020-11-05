import React from "react";

import "../style/node.css";

const Node = (props) => {
  const {
    row,
    col,
    handleNodeClick,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    isStart,
    isFinish,
    isWall,
  } = props;

  const calculatedClassName =
    "node" +
    (isStart ? " start" : isFinish ? " finish" : isWall ? " wall" : "");

  return (
    <div
      id={`node-${row}-${col}`}
      className={`${calculatedClassName}`}
      onClick={() => {
        handleNodeClick(row, col);
      }}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseUp={() => handleMouseUp()}
      onMouseEnter={() => handleMouseEnter(row, col)}
    ></div>
  );
};

export default Node;
