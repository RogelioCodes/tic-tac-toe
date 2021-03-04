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
const winningMessageTextElement = document.querySelector("[data-winnerMessage]");
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
  const fillInSquare = function (squareIndex) {
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
var Gameboard = (() => {
  const playerOne = Player();
  const playerTwo = Player();
  playerOne.setSign("X");
  playerTwo.setSign("O");
  var currentPlayer = playerOne;
  
  choiceArray = ["", "", "", "", "", "", "", "", ""];
  function init(restart){
    if(restart == true) { 
      for(let i = 0 ; i < 9 ; i++){
      Gameboard.choiceArray.pop()
    }
      restart = false ;  
    }
    currentPlayer = playerOne;
   
    //adds an event listen to each square,
    var squareArray = Array.from(SQUARES);
    squareArray.forEach((square) => {
      square.classList.remove(playerOne.getSign())
      square.classList.remove(playerTwo.getSign())
      square.innerHTML = "";
      square.removeEventListener('click', handleClick)
      square.addEventListener('click', handleClick, { once: true })
    })
    
    winningMessageTextElement.textContent = null;
    displayController.off();
  }

  function handleClick(e) {
    currentPlayer.getSign() == 'O' ? currentPlayer = playerOne : currentPlayer = playerTwo
    pushToArray(currentPlayer, playerOne, playerTwo,e.target.id); //the current player's sign is pushed into the array when they click on an EMPTY square  
    displayController.fillInSquare(e.target.id);
    if (checkWin(playerOne) || checkWin(playerTwo) ) {
          endGame(false, currentPlayer, playerOne, playerTwo);
        } else if (isDraw(playerOne, playerTwo)) {
          endGame(true, currentPlayer,playerOne, playerTwo);
        }
  }

  const pushToArray = function (currentPlayer, playerOne, playerTwo, e) {
    var index = e;
    if (currentPlayer === playerOne && choiceArray[index] != "X" && choiceArray[index] != "O" ) {
      choiceArray[index] = playerOne.getSign();
      changeTurn(currentPlayer, playerOne, playerTwo);
    } else if (currentPlayer === playerTwo && choiceArray[index] != "X" && choiceArray[index] != "O" ) {
      choiceArray[index] = playerTwo.getSign();
      changeTurn(currentPlayer, playerOne, playerTwo);
    }
  }; 

  function endGame(draw) {
    if (draw) {
      winningMessageTextElement.textContent = "Draw!";
    } else {
      winningMessageTextElement.textContent = `${ currentPlayer == playerOne ? playerOne.getSign() : playerTwo.getSign() }'s win!`;
    }
    displayController.on();
  }
 
  function checkWin(currentPlayer) {
    //testing checkWin!
    return winCombos.some((combination) => {
      return combination.every((index) => {
        return SQUARES[index].classList.contains(currentPlayer.getSign());
      });
    });
  }
  function changeTurn(currentPlayer, playerOne, playerTwo) {
    Gameboard.currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
  }
  function isDraw(playerOne, playerTwo) {
    //This function checks if the game is a draw by iterating through every square on the gameboard and checking to see
    //if the square element contains the class "x" or "o"
    //if every square is marked then it returns True
    //the SQUARES elements do not have an 'every' method, but we can get around this by destructuring the square elements into an array
    console.log("testing draw")
    return [...SQUARES].every((square) => {
      return (
        square.classList.contains(playerOne.getSign()) ||
        square.classList.contains(playerTwo.getSign())
      );
    });
  }

  myResetButton.addEventListener("click", () => {
   init(true);
  });
  
  return { choiceArray, init, currentPlayer};
})();

Gameboard.init();