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
const SQUARES = document.querySelectorAll("[data-square]");
const winningMessageTextElement = document.querySelector(
    "[data-winnerMessage]"
  );
const squareElements = document.querySelectorAll("[data-square]");
const myResetButton = document.getElementById("resetButton");

const Player = (sign) => {
  let _sign = sign;
  const getSign = () => _sign;
  const setSign = (sign) => {
    _sign = sign;
  };

  return { getSign, setSign };
};
const displayController = (() => {
    
  

  //fillInSquare is passed the index of the square we want to mark
  //this function iterates through the list of user inputs(choiceArray) to find the index of the square that needs to be marked, if the index
  const fillInSquare = function (squareIndex, currentPlayer) {
    const squareToBeFilled = document.getElementById(squareIndex);

    for (let i = 0; i < Gameboard.choiceArray.length; i++) {
      squareToBeFilled.textContent = Gameboard.choiceArray[squareIndex];
      squareToBeFilled.classList = Gameboard.currentPlayer.getSign();
    }
  };
  function on() {
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("overlay").style.flexDirection = "column";
  }

  function off() {
    document.getElementById("overlay").style.display = "none";
  }

  return {  on, off, fillInSquare };
})();
//The gameboard object model handles most of the logic for the game
//It calls the 'Player' factory function to create two players, which are represented by X and O
//

var Gameboard = (() => {
  const playerOne = Player();
  const playerTwo = Player();
  playerOne.setSign("X");
  playerTwo.setSign("O");
  var currentPlayer = playerOne;

  
  choiceArray = ["", "", "", "", "", "", "", "", ""];
  function init(restart){
    console.log("restart: " + restart)
    if(restart == true) { 
      for(let i = 0 ; i < 9 ; i++){
      Gameboard.choiceArray.pop()
    }
      restart = false ;  
    }
    currentPlayer = playerOne;
   
    var squareArray = Array.from(SQUARES);
    squareArray.forEach((square) => {
      square.classList.remove(playerOne.getSign())
      square.classList.remove(playerTwo.getSign())
      square.textContent = "";
      square.removeEventListener('click', handleClick)
      square.addEventListener('click', handleClick, { once: true } )
    })
    
    winningMessageTextElement.textContent = null;
    displayController.off();

      console.log("hello")
     
  }
 

  function handleClick(e) {
   
    const square = e.target;
    
    currentPlayer.getSign() == 'O' ? currentPlayer = playerOne : currentPlayer = playerTwo
    pushToArray(currentPlayer, playerOne, playerTwo,e.target.id);
    displayController.fillInSquare(e.target.id, currentPlayer);
    if (checkWin(playerOne) || checkWin(playerTwo) ) {
          endGame(false, currentPlayer, playerOne, playerTwo);
        } else if (isDraw(playerOne, playerTwo)) {
          endGame(true, currentPlayer,playerOne, playerTwo);
        }
       
  }

  //
 
  const pushToArray = function (currentPlayer, playerOne, playerTwo, e) {
    var index = e;
    console.log(index);
    console.log("myCurrentPlayer::::::" + currentPlayer.getSign());
    if (currentPlayer === playerOne && choiceArray[index] != "X" && choiceArray[index] != "O" ) {
      console.log("pushing here");
      choiceArray[index] = playerOne.getSign();
      changeTurn(currentPlayer, playerOne, playerTwo);
      console.log("circle? : " + currentPlayer.getSign());
    } else if (currentPlayer === playerTwo && choiceArray[index] != "X" && choiceArray[index] != "O" ) {
      console.log("pushing here2");
      choiceArray[index] = playerTwo.getSign();
      changeTurn(currentPlayer, playerOne, playerTwo);
    }
  }; 

  console.log("starting game");
  // choiceArray = setChoiceArray();
  //adds an event listen to each square,
  //the current player's sign is pushed into the array when they click on an EMPTY square

  
  function endGame(draw) {
    if (draw) {
      winningMessageTextElement.textContent = "Draw!";
    } else {
      winningMessageTextElement.textContent = `${
        currentPlayer == playerOne ? playerOne.getSign() : playerTwo.getSign()
      }'s win!`;
    }
    displayController.on();
  }
 

 
  
  function checkWin(currentPlayer) {
    return winCombos.some((combination) => {
      return combination.every((index) => {
        return SQUARES[index].classList.contains(currentPlayer.getSign());
      });
    });
  }
  function changeTurn(currentPlayer, playerOne, playerTwo) {
    console.log("currentPlayer inside changeTurn " + currentPlayer.getSign());
    console.log("Player1 inside changeTurn " + playerOne.getSign());
    Gameboard.currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
    console.log("currentPlayer inside changeTurn " + Gameboard.currentPlayer.getSign());
  }
  function isDraw(playerOne, playerTwo) {
    //This function checks if the game is a draw by iterating through every square on the gameboard and checking to see
    //if the square element contains the class "x" or "o"
    //if every square is marked then it returns True
    //the squareElement does not have an 'every' method, but we can get around this by destructuring the square elements into an array
    return [...squareElements].every((square) => {
      return (
        square.classList.contains(playerOne.getSign()) ||
        square.classList.contains(playerTwo.getSign())
      );
    });
  }
  

  myResetButton.addEventListener("click", () => {
    console.log("click"), init(true);
  });
  
  
  return { choiceArray, init, currentPlayer};
})();


Gameboard.init();