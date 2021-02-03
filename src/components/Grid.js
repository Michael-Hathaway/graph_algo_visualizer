import React from 'react';
import Node from './Node';
import GridSettingsBar from './GridSettingsBar';
import {
  dijkstra,
  breadthFirstSearch,
  depthFirstSearch,
  getNodesInShortestPathOrder,
} from '../algorithms/searchAlgorithms';
import '../style/grid.css';

const GRID_ROWS = 20;
const GRID_COLS = 40;
const START_NODE_ROW = 9;
const START_NODE_COL = 4;
const FINISH_NODE_ROW = 9;
const FINISH_NODE_COL = 34;

const INITIAL_STATE = {
  isAnimating: false,
  isUserMovingStartNode: false,
  isUserMovingFinishNode: false,
  isMousePressed: false,
  startNodeRow: START_NODE_ROW,
  startNodeCol: START_NODE_COL,
  finishNodeRow: FINISH_NODE_ROW,
  finishNodeCol: FINISH_NODE_COL,
  nodes: [],
};

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    // when component mounts create rows and cols
    const nodes = this.createInitialGrid(this.state);
    this.setState({ nodes });
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
      isGap: false,
      distance: Infinity,
      isVisited: false,
      previousNode: null,
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

  resetStartAndFinishNodes = () => {
    this.setState({
      startNodeRow: START_NODE_ROW,
      startNodeCol: START_NODE_COL,
      finishNodeRow: FINISH_NODE_ROW,
      finishNodeCol: FINISH_NODE_COL,
    });
  };

  // reset isWall state for all nodes
  // reset DOM stylings for wall nodes
  resetWallsInGrid = () => {
    const grid = this.state.nodes.slice();

    for (let i = 0; i < GRID_ROWS; i++) {
      for (let j = 0; j < GRID_COLS; j++) {
        const node = document.getElementById(`node-${i}-${j}`);
        node.classList.remove('node-wall');
        grid[i][j].isWall = false;
        grid[i][j].isGap = false;
      }
    }

    this.setState({ nodes: grid });
  };

  // reset state used by nodes for performing search algorithm
  // reset DOM stylings for searched nodes
  clearSimulationResults = () => {
    if (this.state.isAnimating) return;

    const grid = this.state.nodes.slice();

    for (let i = 0; i < GRID_ROWS; i++) {
      for (let j = 0; j < GRID_COLS; j++) {
        // remove classnames added during animation
        const node = document.getElementById(`node-${i}-${j}`);
        node.classList.remove('node-visited');
        node.classList.remove('node-shortest-path');

        grid[i][j].isVisited = false;
        grid[i][j].previousNode = null;
        grid[i][j].distance = Infinity;
      }
    }

    this.setState({ nodes: grid });
  };

  // completely reset the grid
  resetGrid = () => {
    if (this.state.isAnimating) return;

    this.resetStartAndFinishNodes();
    this.resetWallsInGrid();
    this.clearSimulationResults();
  };

  // generate new grid with the the node at row, col toggled as a wall
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

  // generate new grid with the the node at row, col set as start node
  getNewGridWithStartNodeToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isStart: !node.isStart,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  // generate new grid with the the node at row, col set as End node
  getNewGridWithFinishNodeToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isStart: !node.isStart,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  handleMouseUp = (row, col) => {
    if (this.state.isAnimating) return;

    this.setState({
      isMousePressed: false,
      isUserMovingStartNode: false,
      isUserMovingFinishNode: false,
    });
    this.forceUpdate();
  };

  handleMouseEnter = (row, col) => {
    if (this.state.isAnimating) return;
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
    if (this.state.isAnimating) return;
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
    if (this.state.isAnimating) return;

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
        nodes: newGrid,
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
        nodes: newGrid,
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
    this.setState({ isAnimating: true });

    for (let i = 1; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          this.animatePath(nodesInShortestPathOrder);
        }, 12 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document
          .getElementById(`node-${node.row}-${node.col}`)
          .classList.add('node-visited');
      }, 10 * i);
    }
  }

  // Animate path from from start to finish node
  animatePath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document
          .getElementById(`node-${node.row}-${node.col}`)
          .classList.add('node-shortest-path');
      }, 30 * i);
    }

    this.setState({ isAnimating: false });
  }

  // perform the search algorithm, then animate the search process and final path
  visualizeAlgorithm = async (algorithmFunc) => {
    this.clearSimulationResults();

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
    await this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  // ALGORITHM END

  handleStartButtonClick = () => {
    if (this.state.isAnimating) return;

    const { value } = this.props.selectedAlgorithm;
    if (value === 'dijkstra') {
      this.visualizeAlgorithm(dijkstra);
    } else if (value === 'bfs') {
      this.visualizeAlgorithm(breadthFirstSearch);
    } else if (value === 'dfs') {
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
          handleClearSimulationButtonClick={this.clearSimulationResults}
        />
        <div className="grid-wrapper">
          <div className="grid">{this.renderGrid()}</div>
        </div>
      </div>
    );
  }
}

export default Grid;
