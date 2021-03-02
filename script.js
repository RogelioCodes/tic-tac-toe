const winCombos = [
  [0, 1, 2],
  [0, 3, 6],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [0, 4, 8],
];
let message = document.querySelector('[data-winnerMessage]');
const Player = (sign) => {
  let _sign = sign;
  const getSign = () => _sign;
  const setSign = (sign) => {
    _sign = sign;
  };

  return { getSign, setSign };
};

//NEED TO UNDERSTAND WHAT IS GETTING INITIALIZED!
const Gameboard = (() => {
  let choiceArray = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer;
  const playerOne = Player();
  const playerTwo = Player();
  playerOne.setSign("x");
  playerTwo.setSign("o");
  currentPlayer = playerOne;
  //make a function to change turn?
  const pushToArray = function (currentPlayer, playerOne, playerTwo, e) {
    let index = e;
    if (currentPlayer === playerOne && choiceArray[index] == "") {
      choiceArray[index] = playerOne.getSign();
      changeTurn();
    } else if (currentPlayer === playerTwo && choiceArray[index] == "") {
      choiceArray[index] = playerTwo.getSign();
      changeTurn();
    }
  };
  const SQUARES = document.querySelectorAll(".square");
  function checkWin(currentPlayer) {
    return winCombos.some((combination) => {
      return combination.every((index) => {
        return SQUARES[index].classList.contains(currentPlayer.getSign());
      });
    });
  }
  const startGame = () => {
    //adds an event listen to each square,
    //the current player's sign is pushed into the array when they click on an EMPTY square
    let squareArray = Array.from(SQUARES);
    squareArray.forEach((square) => {
      square.addEventListener("click", (e) => {
        pushToArray(currentPlayer, playerOne, playerTwo, e.target.id),
        displayController.fillInSquare(e.target.id);
        if (checkWin(playerOne) || checkWin(playerTwo)) {
            if(currentPlayer == playerOne){
                message.textContent = playerTwo.getSign() + " is a Winner! Thats on god ! ";
            } 
            if(currentPlayer == playerTwo){
                message.textContent = playerOne.getSign() + " is a Winner! Thats on god! ";
            }
         displayController.on();
        } 
      });
    });
  };
  function endGame(){

  }
  const changeTurn = () => {
    currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
  };
  return { currentPlayer, startGame, changeTurn, pushToArray, choiceArray };
})();

const displayController = (() => {
//fillInSquare is passed the index of the square we want to mark
  const fillInSquare = function (index) {
    let squareIndex = index;
    for (let i = 0; i < Gameboard.choiceArray.length; i++) {
      if (squareIndex) {
        let squareToBeFilled = document.getElementById(squareIndex);
        squareToBeFilled.textContent = Gameboard.choiceArray[index];
        squareToBeFilled.classList = Gameboard.choiceArray[index];
      }
    }
  };
  function on() {
    document.getElementById("overlay").style.display = "block";
  }
  
  function off() {
    document.getElementById("overlay").style.display = "none";
  }
 
  return { on, off,fillInSquare };
})();

Gameboard.startGame();
