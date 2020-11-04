import React from "react";
import Node from "./Node";
import GridSettingsBar from "./GridSettingsBar";
import "../style/grid.css";

const GRID_ROWS = 17;
const GRID_COLS = 35;

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserSelectingStartNode: false,
      isUserSelectingFinishNode: false,
      isUserAddingWalls: false,
      isMousePressed: false,
      startNodeRow: 0,
      startNodeCol: 0,
      finishNodeRow: 8,
      finishNodeCol: 25,
      nodes: [],
    };
  }

  createUnrenderedGrid = () => {
    // create array of arrays
    const nodes = [];
    for (let i = 0; i < GRID_ROWS; i++) {
      let currentRow = [];
      for (let j = 0; j < GRID_COLS; j++) {
        currentRow.push({
          row: i,
          col: j,
        });
      }
      nodes.push(currentRow);
    }

    return nodes;
  };

  componentDidMount() {
    // when component mounts create rows and cols
    const nodes = this.createUnrenderedGrid(this.state);
    this.setState({ nodes });
  }

  handleSetStartNodeClick = () => {
    this.setState({
      isUserSelectingStartNode: true,
      isUserSelectingFinishNode: false,
      isUserAddingWalls: false,
    });
  };

  handleSetFinishNodeClick = () => {
    this.setState({
      isUserSelectingStartNode: false,
      isUserSelectingFinishNode: true,
      isUserAddingWalls: false,
    });
  };

  handleMouseUp() {
    this.setState({ isMousePressed: false });
  }

  handleMouseEnter() {
    // when mouse enters a node, toggle its wall status
  }

  handleMouseDown() {
    // toggle wall status of current node
    // set isMousePressed to true
  }

  handleSetWallButtonClick = () => {
    this.setState({
      isUserSelectingStartNode: false,
      isUserSelectingFinishNode: false,
      isUserAddingWalls: true,
    });
  };

  handleNodeClick = (row, col) => {
    if (this.state.isUserAddingWalls) return;

    if (this.state.isUserSelectingStartNode) {
      this.setState({
        startNodeRow: row,
        startNodeCol: col,
      });
    } else if (this.state.isUserSelectingFinishNode) {
      this.setState({
        finishNodeRow: row,
        finishNodeCol: col,
      });
    }
  };

  handleMouseDown = () => {
    if (!this.state.isUserAddingWalls) return;
    // need to set the wall as a node
    console.log("MOUSE DOWN");
  };

  renderGrid() {
    // render the nodes in rows
    return this.state.nodes.map((row, rowIndex) => {
      return (
        <div className="row" key={rowIndex}>
          {row.map((node, nodeIndex) => {
            let isStart =
              rowIndex === this.state.startNodeRow &&
              nodeIndex === this.state.startNodeCol;
            let isFinish =
              rowIndex === this.state.finishNodeRow &&
              nodeIndex === this.state.finishNodeCol;

            return (
              <Node
                key={nodeIndex}
                row={rowIndex}
                col={nodeIndex}
                isStart={isStart}
                isFinish={isFinish}
                isWall={false}
                handleNodeClick={this.handleNodeClick}
              />
            );
          })}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="grid-container">
        <GridSettingsBar
          handleSetStartNodeClick={this.handleSetStartNodeClick}
          handleSetFinishNodeClick={this.handleSetFinishNodeClick}
          handleSetWallButtonClick={this.handleSetWallButtonClick}
        />
        <div className="grid-wrapper">{this.renderGrid()}</div>
      </div>
    );
  }
}

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
