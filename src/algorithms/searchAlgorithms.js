export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    if (closestNode === finishNode) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    updateUnvisitedNeighbors(closestNode, grid);
  }
}

export function breadthFirstSearch(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  let queue = [];

  startNode.distance = 0;
  queue.push(startNode);

  while (queue.length > 0) {
    let currentNode = queue.shift();

    if (currentNode.isWall) continue;
    if (currentNode.isVisited) continue;

    if (currentNode === finishNode) {
      visitedNodesInOrder.push(currentNode);
      return visitedNodesInOrder;
    }
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);

    for (let i = 0; i < unvisitedNeighbors.length; i++) {
      unvisitedNeighbors[i].previousNode = currentNode;
      unvisitedNeighbors[i].distance = currentNode.distance + 1;
      queue.push(unvisitedNeighbors[i]);
    }
  }

  return visitedNodesInOrder;
}

export function depthFirstSearch(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  let queue = [];

  startNode.distance = 0;
  queue.push(startNode);

  while (queue.length > 0) {
    let currentNode = queue.pop();

    if (currentNode.isWall) continue;
    if (currentNode.isVisited) continue;

    if (currentNode === finishNode) {
      visitedNodesInOrder.push(currentNode);
      return visitedNodesInOrder;
    }
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);

    for (let i = 0; i < unvisitedNeighbors.length; i++) {
      unvisitedNeighbors[i].previousNode = currentNode;
      unvisitedNeighbors[i].distance = currentNode.distance + 1;
      queue.push(unvisitedNeighbors[i]);
    }
  }

  return visitedNodesInOrder;
}

function sortNodesByDistance(unvisitedNodes) {
  //TODO: use a heap instead
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
