import React from "react";
import Node from "./Node";
import GridSettingsBar from "./GridSettingsBar";
import {
  dijkstra,
  breadthFirstSearch,
  depthFirstSearch,
  getNodesInShortestPathOrder,
} from "../algorithms/searchAlgorithms";
import "../style/grid.css";

const GRID_ROWS = 20;
const GRID_COLS = 40;

const INITIAL_STATE = {
  isUserSelectingStartNode: false,
  isUserSelectingFinishNode: false,
  isUserAddingWalls: false,
  isMousePressed: false,
  startNodeRow: 9,
  startNodeCol: 5,
  finishNodeRow: 9,
  finishNodeCol: 34,
  nodes: [],
};

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  isStartNode = (row, col) => {
    return row === this.state.startNodeRow && col === this.state.startNodeCol;
  };

  isFinishNode = (row, col) => {
    return row === this.state.finishNodeRow && col === this.state.finishNodeCol;
  };

  createNodeObject = (row, col) => {
    let isStart = this.isStartNode(row, col);
    let isFinish = this.isFinishNode(row, col);

    return {
      row: row,
      col: col,
      isStart: isStart,
      isFinish: isFinish,
      isWall: false,
      distance: Infinity,
      isVisited: false,
      previousNode: null,
    };
  };

  createInitialGrid = () => {
    // create array of arrays
    const nodes = [];
    for (let i = 0; i < GRID_ROWS; i++) {
      let currentRow = [];
      for (let j = 0; j < GRID_COLS; j++) {
        const newNode = this.createNodeObject(i, j);
        currentRow.push(newNode);
      }
      nodes.push(currentRow);
    }

    return nodes;
  };

  resetGrid = () => {
    for (let i = 0; i < GRID_ROWS; i++) {
      for (let j = 0; j < GRID_COLS; j++) {
        // remove classnames added during animation
        const classname = `node ${this.isStartNode(i, j) ? " start" : ""}${
          this.isFinishNode(i, j) ? " finish" : ""
        }`;
        document.getElementById(`node-${i}-${j}`).className = classname;
      }
    }

    // reset grid component
    const nodes = this.createInitialGrid();
    this.setState({ ...INITIAL_STATE, nodes });
  };

  getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  getNewGridWithStartNodeToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isStart: true,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  componentDidMount() {
    // when component mounts create rows and cols
    const nodes = this.createInitialGrid(this.state);
    this.setState({ nodes });
  }

  handleMouseUp = (row, col) => {
    this.setState({ isMousePressed: false });
  };

  handleMouseEnter = (row, col) => {
    if (!this.state.isMousePressed) return;

    const newGrid = this.getNewGridWithWallToggled(this.state.nodes, row, col);
    this.setState({ nodes: newGrid });
  };

  handleMouseDown = (row, col) => {
    const newGrid = this.getNewGridWithWallToggled(this.state.nodes, row, col);
    this.setState({ nodes: newGrid, isMousePressed: true });
  };

  // ALGORITHM START
  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animatePath(nodesInShortestPathOrder);
        }, 12 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 12 * i);
    }
  }

  animatePath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 40 * i);
    }
  }

  visualizeAlgorithm = (algorithmFunc) => {
    const {
      startNodeRow,
      startNodeCol,
      finishNodeRow,
      finishNodeCol,
      nodes,
    } = this.state;

    const startNode = nodes[startNodeRow][startNodeCol];
    const finishNode = nodes[finishNodeRow][finishNodeCol];
    const visitedNodesInOrder = algorithmFunc(nodes, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  };
  // ALGORITHM END

  handleStartButtonClick = () => {
    const { value } = this.props.selectedAlgorithm;
    if (value === "dijkstra") {
      this.visualizeAlgorithm(dijkstra);
    } else if (value === "bfs") {
      this.visualizeAlgorithm(breadthFirstSearch);
    } else if (value === "dfs") {
      this.visualizeAlgorithm(depthFirstSearch);
    }
  };

  renderGrid() {
    // render the nodes in rows
    return this.state.nodes.map((row, rowIndex) => {
      return (
        <div className="row" key={rowIndex}>
          {row.map((node) => {
            const { row, col, isWall } = node;

            let isStart = this.isStartNode(row, col);
            let isFinish = this.isFinishNode(row, col);

            return (
              <Node
                key={col}
                row={row}
                col={col}
                isStart={isStart}
                isFinish={isFinish}
                isWall={isWall}
                handleMouseDown={this.handleMouseDown}
                handleMouseUp={this.handleMouseUp}
                handleMouseEnter={this.handleMouseEnter}
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
          handleResetGridButtonClick={this.resetGrid}
          handleStartButtonClick={this.handleStartButtonClick}
        />
        <div className="grid-wrapper">
          <div className="grid">{this.renderGrid()}</div>
        </div>
      </div>
    );
  }
}
