import React from "react";
import Node from "./Node";
import GridSettingsBar from "./GridSettingsBar";
import {
  dijkstra,
  breadthFirstSearch,
  depthFirstSearch,
  getNodesInShortestPathOrder
} from "../algorithms/searchAlgorithms";
import "../style/grid.css";

const GRID_ROWS = 20;
const GRID_COLS = 40;
const START_NODE_ROW = 9;
const START_NODE_COL = 4;
const FINISH_NODE_ROW = 9;
const FINISH_NODE_COL = 34;

const INITIAL_STATE = {
  isUserMovingStartNode: false,
  isUserMovingFinishNode: false,
  isMousePressed: false,
  startNodeRow: START_NODE_ROW,
  startNodeCol: START_NODE_COL,
  finishNodeRow: FINISH_NODE_ROW,
  finishNodeCol: FINISH_NODE_COL,
  nodes: []
};

class Grid extends React.Component {
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
    return {
      row: row,
      col: col,
      isStart: false,
      isFinish: false,
      isWall: false,
      distance: Infinity,
      isVisited: false,
      previousNode: null
    };
  };

  // create a nested array of node objects
  createInitialGrid = () => {
    const nodes = [];
    for (let i = 0; i < GRID_ROWS; i++) {
      let currentRow = [];
      for (let j = 0; j < GRID_COLS; j++) {
        const newNode = this.createNodeObject(i, j);
        newNode.isStart = i === START_NODE_ROW && j === START_NODE_COL;
        newNode.isFinish = i === FINISH_NODE_ROW && j === FINISH_NODE_COL;

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
      isWall: !node.isWall
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  getNewGridWithStartNodeToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isStart: !node.isStart
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  getNewGridWithFinishNodeToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isStart: !node.isStart
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
    this.setState({
      isMousePressed: false,
      isUserMovingStartNode: false,
      isUserMovingFinishNode: false
    });
  };

  handleMouseEnter = (row, col) => {
    if (!this.state.isMousePressed) return;

    if (this.state.isUserMovingStartNode) {
      const newGrid = this.getNewGridWithStartNodeToggled(
        this.state.nodes,
        row,
        col
      );
      this.setState({ nodes: newGrid, startNodeRow: row, startNodeCol: col });
    } else if (this.state.isUserMovingFinishNode) {
      const newGrid = this.getNewGridWithFinishNodeToggled(
        this.state.nodes,
        row,
        col
      );
      this.setState({ nodes: newGrid, finishNodeRow: row, finishNodeCol: col });
    } else {
      const newGrid = this.getNewGridWithWallToggled(
        this.state.nodes,
        row,
        col
      );
      this.setState({ nodes: newGrid });
    }
  };

  handleMouseLeave = (row, col) => {
    if (!this.state.isMousePressed) return;

    if (this.state.isUserMovingStartNode) {
      const newGrid = this.getNewGridWithStartNodeToggled(
        this.state.nodes,
        row,
        col
      );
      this.setState({ nodes: newGrid });
    } else if (this.state.isUserMovingFinishNode) {
      const newGrid = this.getNewGridWithFinishNodeToggled(
        this.state.nodes,
        row,
        col
      );
      this.setState({ nodes: newGrid });
    }
  };

  handleMouseDown = (row, col) => {
    if (this.isStartNode(row, col)) {
      const newGrid = this.getNewGridWithStartNodeToggled(
        this.state.nodes,
        row,
        col
      );
      this.setState({
        isUserMovingStartNode: true,
        isUserMovingFinishNode: false,
        isMousePressed: true,
        nodes: newGrid
      });
    } else if (this.isFinishNode(row, col)) {
      const newGrid = this.getNewGridWithFinishNodeToggled(
        this.state.nodes,
        row,
        col
      );
      this.setState({
        isUserMovingStartNode: false,
        isUserMovingFinishNode: true,
        isMousePressed: true,
        nodes: newGrid
      });
    } else {
      const newGrid = this.getNewGridWithWallToggled(
        this.state.nodes,
        row,
        col
      );
      this.setState({ nodes: newGrid, isMousePressed: true });
    }
  };

  // ALGORITHM START

  // animate each node in the order they were visited during the
  // algorithm search
  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 1; i <= visitedNodesInOrder.length - 1; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          this.animatePath(nodesInShortestPathOrder);
        }, 12 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  // Animate path from from start to finish node
  animatePath(nodesInShortestPathOrder) {
    for (let i = 1; i < nodesInShortestPathOrder.length - 1; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 30 * i);
    }
  }

  // perform the algorithm, then animate the search process and final path
  visualizeAlgorithm = algorithmFunc => {
    const {
      startNodeRow,
      startNodeCol,
      finishNodeRow,
      finishNodeCol,
      nodes
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
          {row.map(node => {
            const { row, col, isWall } = node;
            const isStart = this.isStartNode(row, col);
            const isFinish = this.isFinishNode(row, col);

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
                handleMouseLeave={this.handleMouseLeave}
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

export default Grid;
