let grid = [
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
];
const board = document.getElementById("board");
const startBtn = document.getElementById("start-btn");
const boardBorder = document.getElementById("border");

function createBoard() {
  if (board.innerHTML != "") {
    board.innerHTML = "";
    grid = [
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
    ];
  }
  else{
    boardBorder.className = "border-div active"
  }
  console.log(board);

  grid.forEach((row, rowIndex) => {
    row.forEach((item, colIndex) => {
      let cell = `<div contenteditable="true" class='cell' id='${rowIndex}${colIndex}'>${item}</div>`;
      board.innerHTML += cell;
      startBtn.innerText = "SUBMIT";
      startBtn.onclick = takeInput;
    });
  });
}

function takeInput() {
  const children = board.childNodes;
  console.log(children);
  children.forEach((child) => {
    const [i, j] = child.id.split("");
    const text = child.textContent;
    if (text != "") {
      grid[i][j] = parseInt(text);
    } else {
      grid[i][j] = 0;
    }
  });
  board.innerHTML = "";
  grid.forEach((row, rowIndex) => {
    row.forEach((item, colIndex) => {
      let cell = `<div class='cell' id='${rowIndex}${colIndex}'>${item}</div>`;
      board.innerHTML += cell;
      startBtn.innerText = "SOLVE";
      startBtn.onclick = renderSolved;
    });
  });
}

function renderSolved() {
  solve();
  board.innerHTML = "";
  grid.forEach((row, rowIndex) => {
    row.forEach((item, colIndex) => {
      let cell = `<div class='cell' id='${rowIndex}${colIndex}'>${item}</div>`;
      board.innerHTML += cell;
      startBtn.innerText = "NEW";
      startBtn.onclick = createBoard;
    });
  });
}

function isValid(r, c, num) {
  if (grid[r].includes(num)) {
    return false;
  }

  for (let i = 0; i < 9; i++) {
    if (grid[i][c] == num) {
      return false;
    }
  }

  for (let i = Math.floor(r / 3) * 3; i < Math.floor(r / 3) * 3 + 3; i++) {
    for (let j = Math.floor(c / 3) * 3; j < Math.floor(c / 3) * 3 + 3; j++) {
      if (grid[i][j] == num) {
        return false;
      }
    }
  }
  return true;
}
let invoke = 0;

async function solve(r = 0, c = 0) {
  if (r == 9) {
    console.log("end");
    return true;
  } else if (c == 9) {
    return await solve(r + 1, 0);
  } else if (grid[r][c] != 0) {
    return await solve(r, c + 1);
  } else {
    for (let i = 1; i < 10; i++) {
      if (isValid(r, c, i)) {
        grid[r][c] = i;
        await updateEle(`${r}${c}`, i);
        if (await solve(r, c + 1)) {
          return true;
        }
        grid[r][c] = 0;
        await updateEle(`${r}${c}`, 0);
      }
    }
    return false;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function updateEle(id, val) {
  await sleep(1);
  console.log("Sleeping");
  console.log("Updating element");
  const ele = document.getElementById(id);
  ele.innerText = val;
}
