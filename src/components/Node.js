import React from "react";

import "../style/node.css";

const Node = (props) => {
  const {
    row,
    col,
    handleMouseDown,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseUp,
    isStart,
    isFinish,
    isWall,
  } = props;

  const calculatedClassName =
    "node" +
    (isStart
      ? " node-start"
      : isFinish
      ? " node-finish"
      : isWall
      ? " wall"
      : "");

  return (
    <div
      id={`node-${row}-${col}`}
      className={`${calculatedClassName}`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseUp={() => handleMouseUp(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
      onMouseLeave={() => handleMouseLeave(row, col)}
    ></div>
  );
};

export default Node;
