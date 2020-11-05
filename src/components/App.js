import React, { useState } from "react";
import Navbar from "./Navbar";
import Grid from "./Grid";
import AlgorithmSelectionBar from "./AlgorithmSelectionBar";
import "../style/App.css";
import "../style/AlgorithmSelectionBar.css";

const algorithms = [
  {
    label: "Dijkstra's Algorithm",
    value: "dijkstra",
  },
  {
    label: "BFS - Breadth First Search",
    value: "bfs",
  },
  {
    label: "DFS - Depth First Search",
    value: "dfs",
  },
];

const App = () => {
  const [algorithm, setAlgorithm] = useState(algorithms[0]);

  return (
    <div className="page-wrapper">
      <Navbar />
      <AlgorithmSelectionBar
        algorithms={algorithms}
        selectedAlgorithm={algorithm}
        setSelectedAlgorithm={setAlgorithm}
      />
      <Grid selectedAlgorithm={algorithm} />
    </div>
  );
};

export default App;
