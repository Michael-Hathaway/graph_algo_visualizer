import React from "react";

import "../style/App.css";

import Navbar from "./Navbar";
import Grid from "./Grid";

const App = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <Grid />
    </div>
  );
};

export default App;
