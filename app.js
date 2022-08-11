const user1 = document.querySelector(".user-1");
const user2 = document.querySelector(".user-2");
const squares = document.querySelectorAll(".square");
const turn = document.querySelector(".turn");
const popup = document.querySelector(".modal");
const closeButton = document.querySelector(".close");
const information = document.querySelector(".information");

let calculateTextX = "";
let calculateTextY = "";

const startGame = () => {
  squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (user1.classList.value.includes("active")) {
        if (!square.classList.value.includes("modified")) {
          calculateX(square.classList[1]);
          square.innerText = `X`;
          user1.classList.remove("active");
          user2.classList.add("active");
          turn.innerText = `👉`;
          square.classList.add("modified");
        }
      } else if (user2.classList.value.includes("active")) {
        if (!square.classList.value.includes("modified")) {
          calculateY(square.classList[1]);
          square.innerText = `O`;
          user1.classList.add("active");
          user2.classList.remove("active");
          turn.innerText = `👈`;
          square.classList.add("modified");
        }
      }
    });
  });
};

const calculateX = (square) => {
  let informationText = `Congratulations, User1 🤖 won the game 👏👏👏`;

  calculateTextX += square + " ";

  if (
    calculateTextX?.split(" ").length + calculateTextY.split(" ").length == 11
  ) {
    gameOver("It's a draw ✋✋✋")
  }

  const patterns = [
    /s[1]-[123]/gi,
    /s[2]-[123]/gi,
    /s[3]-[123]/gi,
    /s[123]-[1]/gi,
    /s[123]-[2]/gi,
    /s[123]-[3]/gi,
  ];

  if (
    calculateTextX.includes("s1-1") &&
    calculateTextX.includes("s2-2") &&
    calculateTextX.includes("s3-3")
  ) {
    gameOver(informationText);
  }

  if (
    calculateTextX.includes("s1-3") &&
    calculateTextX.includes("s2-2") &&
    calculateTextX.includes("s3-1")
  ) {
    gameOver(informationText);
  }

  for (let pattern of patterns) {
    if (calculateTextX?.match(pattern)?.length == 3) {
      gameOver(informationText);
    }
  }
};

const calculateY = (square) => {
  let informationText = `Congratulations, User2 👾 won the game 👏👏👏`;
  calculateTextY += square + " ";

  if (
    calculateTextX?.split(" ").length + calculateTextY.split(" ").length == 11
  ) {
    gameOver("It's a draw ✋✋✋")
  }
  const patterns = [
    /s[1]-[123]/gi,
    /s[2]-[123]/gi,
    /s[3]-[123]/gi,
    /s[123]-[1]/gi,
    /s[123]-[2]/gi,
    /s[123]-[3]/gi,
  ];

  if (
    calculateTextY.includes("s1-1") &&
    calculateTextY.includes("s2-2") &&
    calculateTextY.includes("s3-3")
  ) {
    gameOver(informationText);
  }

  if (
    calculateTextY.includes("s1-3") &&
    calculateTextY.includes("s2-2") &&
    calculateTextY.includes("s3-1")
  ) {
    gameOver(informationText);
  }

  for (let pattern of patterns) {
    if (calculateTextY?.match(pattern)?.length == 3) {
      gameOver(informationText);
    }
  }
};

const gameOver = (informationText) => {
  popup.style.display = "block";
  information.innerText = informationText;
};

closeButton.onclick = function () {
  popup.style.display = "none";
  user1.classList.add("active");
  user2.classList.remove("active");
  turn.innerText = `👈`;

  squares.forEach((square) => {
    square.innerText = ``;
    square.classList.remove("modified");
  });

  calculateTextX = "";
  calculateTextY = "";
  startGame();
};

startGame();
