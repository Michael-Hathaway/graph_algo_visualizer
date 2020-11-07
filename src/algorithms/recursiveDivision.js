export const recursiveDivision = (
  grid,
  rowStart,
  colStart,
  rowEnd,
  colEnd,
  wallsInOrder
) => {
  const height = rowEnd - rowStart;
  const width = colEnd - colStart;
  if (width < 3 || height < 3) return;

  const orientation = getWallOrientation(width, height);

  if (orientation === "R") {
    // add new row wall
    createNewHorizontalWall(
      grid,
      rowStart,
      colStart,
      rowEnd,
      colEnd,
      wallsInOrder
    );
  } else {
    // add new column wall
    createNewVerticalWall(
      grid,
      rowStart,
      colStart,
      rowEnd,
      colEnd,
      wallsInOrder
    );
  }
};

const createNewHorizontalWall = (
  grid,
  rowStart,
  colStart,
  rowEnd,
  colEnd,
  wallsInOrder
) => {
  const rowWallIndex = rowStart + Math.round((rowEnd - rowStart + 1) / 2);
  const gapPos = getRandomNumber(colStart, colEnd - 1);

  for (let i = colStart; i < colEnd; i++) {
    const node = grid[rowWallIndex][i];

    node.isGap = i === gapPos;
    if (node.isGap || node.isStart || node.isFinish) continue;

    wallsInOrder.push(node);
  }

  recursiveDivision(
    grid,
    rowStart,
    colStart,
    rowWallIndex - 1,
    colEnd,
    wallsInOrder
  );
  recursiveDivision(grid, rowWallIndex, colStart, rowEnd, colEnd, wallsInOrder);
};

const createNewVerticalWall = (
  grid,
  rowStart,
  colStart,
  rowEnd,
  colEnd,
  wallsInOrder
) => {
  const colWallIndex = colStart + Math.round((colEnd - colStart + 1) / 2);
  const gapPos = getRandomNumber(rowStart, rowEnd - 1);

  for (let i = rowStart; i < rowEnd; i++) {
    const node = grid[i][colWallIndex];

    node.isGap = i === gapPos;
    if (node.isGap || node.isStart || node.isFinish) continue;

    wallsInOrder.push(node);
  }

  recursiveDivision(
    grid,
    rowStart,
    colStart,
    rowEnd,
    colWallIndex - 1,
    wallsInOrder
  );
  recursiveDivision(grid, rowStart, colWallIndex, rowEnd, colEnd, wallsInOrder);
};

const getWallOrientation = (rowWidth, colHeight) => {
  if (rowWidth < colHeight) return "R";
  else if (colHeight < rowWidth) return "C";
  else return Math.round(Math.random()) === 0 ? "R" : "C";
};

const getRandomNumber = (lowerLimit, upperLimit) => {
  return Math.floor(Math.random() * (upperLimit - lowerLimit) + lowerLimit);
};
