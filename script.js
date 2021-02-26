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
let choiceArray = [];
let currentPlayer;
const playerOne = Player();
const playerTwo = Player();
playerOne.setSign("x");
playerTwo.setSign("o");
currentPlayer = playerOne;
  //make a function to change turn? 
  const pushToArray = function(currentPlayer, playerOne, playerTwo){
   
    console.log("INSIDE PUSH TO ARRAY ");
    console.log("playerOne: " + playerOne);
    console.log("currentPlayer: " + currentPlayer)
    // console.log("currentPlayer: " + currentPlayer.getSign());
   
    if (currentPlayer === playerOne) {
        console.log("hereeeee")
      choiceArray.push(playerOne.getSign());
      changeTurn()
    //   return currentPlayer
    }else if (currentPlayer === playerTwo) {
      console.log("current player is two")
      choiceArray.push(playerTwo.getSign());
      console.log("choiceArray: " + choiceArray)
      currentPlayer = playerOne
      changeTurn()
    //   return currentPlayer;
    }
  console.log("curreeeeeeeent: " + currentPlayer.getSign())
  }
  const SQUARES = document.querySelectorAll(".square");
  console.log("SQUARES: " + SQUARES);

  const startGame = () => {
  
    console.log("playerOne.getSign(): ", playerOne.getSign())
    console.log("playerTwo.getSign(): ", playerTwo.getSign())
    
    console.log(currentPlayer)
    console.log("-------------------------------")

    console.log("playerOneee: " + playerOne.getSign());

    let squareArray = Array.from(SQUARES);
    squareArray.forEach((square) => {
      square.addEventListener("click", (e) => {
        console.log(e.target.id),
          pushToArray(currentPlayer,playerOne, playerTwo),
          displayController.fillInSquare(e.target.id);
      });
    });
    
  };
  const changeTurn = () => {
    currentPlayer = currentPlayer == playerOne? playerTwo: playerOne;

}
  //   console.log("hello " + Gameboard.choiceArray);
  return { currentPlayer, startGame, pushToArray, choiceArray };
})();

const displayController = (() => {
  const fillInSquare = function (index) {
    let squareIndex = index;
    console.log("squareIndex: " + squareIndex);
    for (let i = 0; i < Gameboard.choiceArray.length; i++) {
      if (squareIndex) {
        let squareToBeFilled = document.getElementById(squareIndex);
        console.log("squareToBeFilled: " + squareToBeFilled);
        squareToBeFilled.textContent = Gameboard.choiceArray.pop();
      }
    }
    console.log("GameboardArray: " + Gameboard.choiceArray);
  };
  return { fillInSquare };
})();

// const gameController = (() => {
//   displayController.fillInSquare();
// })();
Gameboard.startGame();
