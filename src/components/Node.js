import React from "react";

import "../style/node.css";

const Node = (props) => {
  const { row, col, handleNodeClick, isStart, isFinish, isWall } = props;

  const calculatedClassName =
    "node" +
    (isStart ? " start" : isFinish ? " finish" : isWall ? " wall" : "");

  return (
    <div
      className={`${calculatedClassName}`}
      onClick={() => {
        handleNodeClick(row, col);
      }}
    ></div>
  );
};

export default Node;
