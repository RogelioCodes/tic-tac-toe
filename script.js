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

//The player factory function is used to generate new players
const Player = (sign) => {
  let _sign = sign;
  const getSign = () => _sign;
  const setSign = (sign) => {
    _sign = sign;
  };

  return { getSign, setSign };
};
//The display Controller object model is used to control the display of the game
//It handles the marking of spots and controls the overlay that is displayed when the game is over
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
  function on() { //turns on the overlay 
    document.getElementById("overlay").style.display = "flex"; 
    document.getElementById("overlay").style.flexDirection = "column";
  }

  function off() {//turns off the overlay 
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
  
  //This function is called every time the user clicks on a square
  //It will push a mark into the 'choiceArray' and then fill in that square
  //Every time this function is called we check if there is a winner, if there is no winner yet we pass FALSE to endGame(), preventing the game from ending
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
  
  //This pushes into our array of choices and then changes the turn, before doing that it makes sure that the spot being marked is empty
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

  //This function is called every time the user clicks on a square
  //If it is passed true then it write 'Draw!' to the DOM, 
  //if it is passed false then we display a message saying that the current player has won 
  function endGame(draw) {
    if (draw) {
      winningMessageTextElement.textContent = "Draw!";
    } else {
      winningMessageTextElement.textContent = `${ currentPlayer == playerOne ? playerOne.getSign() : playerTwo.getSign() }'s win!`;
    }
    displayController.on();
  }
  //This function iterates through every winning combination to see if the current player has marked one of the winning combinations
  function checkWin(currentPlayer) {
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