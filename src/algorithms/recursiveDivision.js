export const recursiveDivision = (grid, x, y, width, height) => {
  if (width < 2 || height < 2) return;

  const orientation = getWallOrientation(width, height);

  if (orientation === "R") {
    // add new row wall
    createNewHorizontalWall(grid, x, y, width, height);
  } else {
    // add new column wall
    createNewVerticalWall(grid, x, y, width, height);
  }
};

const createNewHorizontalWall = (grid, x, y, width, height) => {
  const rowWallIndex = getRandomNumber(y + 1, y + height - 1);
  const gapPos = getRandomNumber(x + 1, x + width - 1);

  for (let i = x + 1; i < x + width - 1; i++) {
    if (i === gapPos) continue;

    const currentNode = document.getElementById(`node-${rowWallIndex}-${i}`);
    currentNode.classList.add("wall");
  }

  recursiveDivision(grid, x, y, width, rowWallIndex - y);
  recursiveDivision(grid, x, rowWallIndex, width, y + height - rowWallIndex);
};

const createNewVerticalWall = (grid, x, y, width, height) => {
  const colWallIndex = getRandomNumber(x + 1, x + width - 1);
  const gapPos = getRandomNumber(y + 1, y + height - 1);

  for (let i = y + 1; i < y + height - 1; i++) {
    if (i === gapPos) continue;

    const currentNode = document.getElementById(`node-${i}-${colWallIndex}`);
    currentNode.classList.add("wall");
  }

  recursiveDivision(grid, x, y, colWallIndex - x, height);
  recursiveDivision(grid, colWallIndex, y, x + width - colWallIndex, height);
};

const getWallOrientation = (rowWidth, colHeight) => {
  if (rowWidth < colHeight) return "R";
  else if (colHeight < rowWidth) return "C";
  else return Math.round(Math.random()) === 0 ? "R" : "C";
};

const getRandomNumber = (lowerLimit, upperLimit) => {
  return Math.floor(Math.random() * (upperLimit - lowerLimit) + lowerLimit);
};
