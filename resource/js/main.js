import callBreak from "./CallBreak.js";

let myGame = new callBreak();
let playerCount;
let roundsCount;
const startGameContainer = document.getElementsByClassName("start_container");
const startGameBtn = document.getElementsByClassName("start");
const playerCountContainer = document.getElementsByClassName(
  "player_count_container"
);
const playerCountButtons = document.querySelectorAll(".player_count");
const inputPlayerName = document.getElementsByClassName("input_player_names");
const nameInputBtn = document.getElementsByClassName("name_input_btn");
const gameBody = document.getElementsByClassName("game_body");
const cardsToDist = document.getElementsByClassName("game_body")[0].children[0];
const roundsHeading = document.getElementsByClassName("rounds_container");
const roundsCountButton = document.querySelectorAll(".rounds_count");
const callContainer = document.getElementsByClassName("call_container");
const callSelector = document.getElementsByClassName("call_selector");

startGameBtn[0].addEventListener("click", () => {
  startGameBtn[0].style.display = "none";
  startGameContainer[0].style.display = "none";
  playerCountContainer[0].style.display = "flex";
});

// Add event listner to player_count_buttons
playerCountButtons.forEach((button) => {
  button.addEventListener("click", function () {
    setPlayerCount(parseInt(button.textContent));
  });
});
// Set player count
function setPlayerCount(num) {
  playerCountContainer[0].style.display = "none";
  playerCount = num;
  inputPlayerName[0].style.display = "flex";
}

nameInputBtn[0].addEventListener("click", () => {
  if (player_name.value == "") {
    alert("please enter any name first");
  } else {
    // add player name to myGame
    if (!myGame.addPlayer(player_name.value)) {
      alert("please enter different name");
      player_name.value = ""; // null the name value
    } else {
      // increment player number
      let playerNumberMessage = inputPlayerName[0].children[0].textContent;
      let newNum =
        parseInt(playerNumberMessage[playerNumberMessage.length - 1]) + 1;
      inputPlayerName[0].children[0].textContent =
        "Enter name of player no." + newNum;

      player_name.value = ""; // null the name value
      playerCount--;
      // disable player input on completion
      if (playerCount < 1) {
        inputPlayerName[0].style.display = "none";
        console.log(myGame.getPlayerNames());
        gameBody[0].style.display = "flex";
        setupGameBody();
      }
    }
  }
});

function setupGameBody() {
  cardsToDist.textContent = `Distribute \"${Math.floor(
    52 / myGame.getPlayerCount()
  )}\" cards to each player!`;
  buildCallSelector();
  // buildTable(myGame.getPlayerNames()); //TODO build new table
}

function buildCallSelector() {
  let players = myGame.getPlayerNames();
  for (let player of players) {
    let addPlayer = `<div class="player_call">
    <h2>${player}:</h2>
    <div class="call_selector">
      <button class="call_count">1</button>
      <button class="call_count">2</button>
      <button class="call_count">3</button>
      <button class="call_count">4</button>
      <button class="call_count">5</button>
      <button class="call_count">6</button>
      <button class="call_count">7</button>
      <button class="call_count">8</button>
      <button class="call_count">9</button>
      <button class="call_count">10</button>
    </div>
  </div>`;
    callContainer[0].innerHTML += addPlayer;
  }
}
// Add event listner to rounds_count_buttons
roundsCountButton.forEach((button) => {
  button.addEventListener("click", function () {
    roundsCountButton.forEach((button) => {
      button.style.backgroundColor = "lightblue";
    });
    setRoundsToPlay(parseInt(button.textContent));
    button.style.backgroundColor = "crimson";
  });
});

function setRoundsToPlay(num) {
  roundsCount = num;
}
