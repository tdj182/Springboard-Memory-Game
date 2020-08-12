function startGame(){
  const gameContainer = document.getElementById("game");
  let card1, card2, score, highScore, matchCount
  card1 = {color: "", id: ""};
  card2 = {color: "", id: ""};
  score = 0;
  highScore = localStorage.getItem('highScore') || 0;
  matchCount = 0;

 

  const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
  ];

  // here is a helper function to shuffle an array
  // it returns the same array with values shuffled
  // it is based on an algorithm called Fisher Yates if you want ot research more
  function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  let shuffledColors = shuffle(COLORS);

  // this function loops over the array of colors
  // it creates a new div and gives it a class with the value of the color
  // it also adds an event listener for a click for each card
  function createDivsForColors(colorArray) {
    let i = 0;
    for (let color of colorArray) {
      i++
      // create a new div
      const newDiv = document.createElement("div");

      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color);
      newDiv.setAttribute('id', `color-${i}`)

      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);

      // append the div to the element with an id of game
      gameContainer.append(newDiv);
    }
  }

  let x;
  let y;
  // TODO: Implement this function!
  function handleCardClick(event) {
    // you can use event.target to see which element was clicked
  
    //Assign card
    // If the first card is not clicked twice 
    // and the second card is not being used
    if (card1.id !== event.target.id && card2.id == "") {
      score++;
      updateScore('currentScore');
      if (card1.color === ""){
        card1 = event.target;
        card1.style.backgroundColor= card1.className
      } else {
        card2 = event.target;
        card2.style.backgroundColor= card2.className
    
        compareCards();
      }
    }
    
  }

  //check if cards match
  function compareCards() {
    if(card1.className === card2.className) {
      console.log('color Match!');
      matchCount++;
      //disable click function on matched cards
      card1.removeEventListener('click', handleCardClick, false);
      card2.removeEventListener('click', handleCardClick, false);
      //reset the cards
      resetCards();

      //check to update the highscore at the end of the game
      if (matchCount === COLORS.length/2)  {
        updateScore('highScore');
      }
    } else {
      console.log('No match!')
      //show the cards then return to white and reset the 2 cards
      setTimeout(function(){
        card1.style.backgroundColor = "white";
        card2.style.backgroundColor = "white";
        resetCards();
      }, 1000);
    }
  }

  //reset cards
  function resetCards() {
    card1 = {color: "", id: ""};
    card2 = {color: "", id: ""};
  }

  function updateScore(whichScore){
    if(whichScore === 'currentScore') {
      document.querySelector(`#${whichScore}`).innerHTML = `Current Score: ${score}`;
    } else {
      //update highscore if new score is better
      if (score < highScore || highScore === 0) {
        localStorage.setItem('highScore', score);
        document.querySelector(`#${whichScore}`).innerHTML = `High Score: ${score}`;
      }
    }
  }

  // when the DOM loads
  createDivsForColors(shuffledColors);
  document.querySelector(`#highScore`).innerHTML = `High Score: ${highScore}`;
}

//click to start game
document.querySelector('#startBtn').addEventListener('click', function(){
  //Change the Start button to a reset button
  document.querySelector('#startBtn').innerText = "reset";
  //clear the board
  const gameContainer = document.getElementById("game");
  gameContainer.innerHTML = '';

  
  startGame();
});