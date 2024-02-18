import callBreak from "./CallBreak.js";

let myGame = new callBreak();
let playerCount;
let roundsCount;
// start button
const startGameContainer = document.getElementsByClassName("start_container");
const startGameBtn = document.getElementsByClassName("start");
// player count selector
const playerCountContainer = document.getElementsByClassName(
  "player_count_container"
);
const playerCountButtons = document.querySelectorAll(".player_count");
// player name input
const inputPlayerName = document.getElementsByClassName("input_player_names");
const nameInputBtn = document.getElementsByClassName("name_input_btn");
// rounds to play selector
const roundsContainer = document.getElementsByClassName("rounds_container");
const roundsCountButton = document.querySelectorAll(".rounds_count");
// game body
const gameBody = document.getElementsByClassName("game_body");
// card to distribute line
const cardsToDist = document.getElementsByClassName("game_body")[0].children[0];
// player calls
const callContainer = document.getElementsByClassName("call_container");

// on click of start button -> removes start button and displays player count Selector
startGameBtn[0].addEventListener("click", () => {
  startGameBtn[0].style.display = "none";
  startGameContainer[0].style.display = "none";
  playerCountContainer[0].style.display = "flex";
});

// Add event listner to player_count_buttons
// proceed to input player name stage
playerCountButtons.forEach((button) => {
  button.addEventListener("click", function () {
    setPlayerCount(parseInt(button.textContent));
    playerCountContainer[0].style.display = "none";
    inputPlayerName[0].style.display = "flex";
  });
});
// Set players count
function setPlayerCount(num) {
  playerCount = parseInt(num);
}

// takes player names and adds to the players, assures uniqueness of name
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
      // Proceed to rounds to play after input
      if (playerCount < 1) {
        inputPlayerName[0].style.display = "none";

        console.log(myGame.getPlayerNames());

        roundsContainer[0].style.display = "flex";
      }
    }
  }
});

// Add event listner to rounds_count_buttons
// Proceed to setup game
roundsCountButton.forEach((button) => {
  button.addEventListener("click", function () {
    setRoundsToPlay(parseInt(button.textContent));
    roundsContainer[0].style.display = "none";
    gameBody[0].style.display = "flex";
    setupGameBody();
  });
});
// set roundsCount
function setRoundsToPlay(num) {
  roundsCount = parseInt(num);
}

function setupGameBody() {
  cardsToDist.textContent = `Distribute \"${Math.floor(
    52 / myGame.getPlayerCount()
  )}\" cards to each player!`;
  buildCallSelector();
  // buildTable(myGame.getPlayerNames()); //TODO build new table
}

function buildCallSelector() {
  let players = myGame.getPlayerNames();
  // create call selector for each player
  let addPlayer = "";
  for (let player of players) {
    addPlayer += `<div class="player_call">
    <h2>${player}:</h2>
    <div class="call_selector">
      <div class="call_selector_1to5">
        <button class="call_count ${player}">1</button>
        <button class="call_count ${player}">2</button>
        <button class="call_count ${player}">3</button>
        <button class="call_count ${player}">4</button>
        <button class="call_count ${player}">5</button>
      </div>
      <div class="call_selector_6to10">
        <button class="call_count ${player}">6</button>
        <button class="call_count ${player}">7</button>
        <button class="call_count ${player}">8</button>
        <button class="call_count ${player}">9</button>
        <button class="call_count ${player}">10</button>
      </div>
    </div>
  </div>`;
  }
  addPlayer += `<button class="call_confirm_btn">Confirm Calls</button>`;
  callContainer[0].innerHTML += addPlayer;

  // add for event listner call count button
  let callCountButton = new Array();
  // map of (player name) -> (thair index)
  let playerNameIndex = new Map();
  let i = 0;
  for (let player of players) {
    // build player name with index i
    playerNameIndex.set(player, i);
    // build call count button array
    callCountButton.push(document.querySelectorAll(".call_count." + player));
    // Add event listner to call count button according to their index
    callCountButton[i].forEach((button) => {
      // add event listner
      button.addEventListener("click", function () {
        // extract player name from class name
        let playerName = button.classList[1];
        // make background color to light blue
        callCountButton[playerNameIndex.get(playerName)].forEach((button) => {
          button.style.backgroundColor = "lightblue";
        });
        // add call for player
        myGame.addCall(playerName, parseInt(button.textContent));
        // add background color to red
        button.style.backgroundColor = "crimson";
        // myGame.addScore(playerName, 5);
        // console.log(myGame.getTotals());
      });
    });
    i++;
  }
  // call confirm button
  let callConfirm = document.getElementsByClassName("call_confirm_btn");
  callConfirm[0].addEventListener("click", function () {
    if (myGame.isPlayerReady()) {
      callContainer[0].style.display = "none";
    } else {
      alert("please give call for all players");
    }
  });
}

function buildTable() {}
