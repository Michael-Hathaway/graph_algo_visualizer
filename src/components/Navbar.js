import React from "react";

import "../style/nav.css";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="title">
        <h2>Dijktra's Algorithm Visualizer</h2>
      </div>
      <div className="source-code">
        <a href="https://github.com/Michael-Hathaway/graph_algo_visualizer">
          View Source Code
        </a>
      </div>
    </div>
  );
};

export default Navbar;
