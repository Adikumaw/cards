import callBreak from "./CallBreak.js";

const key = "all-father";
let myGame = new callBreak();
let playerCount = 0;
let roundsCount = 0;

// ------------------- HTML components -------------------
// ------------------- Navigation -------------------
const newGame = document.getElementsByClassName("new_game");
const restart = document.getElementsByClassName("restart");
// ------------------- start button -------------------
const startGameContainer = document.getElementsByClassName("start_container");
const startGameBtn = document.getElementsByClassName("start");
// ------------------- player count selector -------------------
const playerCountContainer = document.getElementsByClassName(
  "player_count_container"
);
const playerCountButtons = document.querySelectorAll(".player_count");
// ------------------- player name input -------------------
const inputNameClass = document.getElementsByClassName("input_player_names");
const nameInputBtn = document.getElementsByClassName("name_input_btn");
// ------------------- rounds to play selector -------------------
const roundsContainer = document.getElementsByClassName("rounds_container");
const roundsCountButton = document.querySelectorAll(".rounds_count");
// ------------------- game body -------------------
const gameBody = document.getElementsByClassName("game_body");
// ------------------- card to distribute line -------------------
const cardsToDist = document.getElementsByClassName("cards_to_dist");
// ------------------- player calls -------------------
const callContainer = document.getElementsByClassName("call_container");
// ------------------- player table -------------------
const tableContainer = document.getElementsByClassName("table_container");
// ------------------- player scores -------------------
const scoreContainer = document.getElementsByClassName("score_container");
//------------------- Winner Board -------------------
const winnerContainer = document.getElementsByClassName("winner_container");
const winner = document.getElementsByClassName("winner_div");
const otherRanks = document.getElementsByClassName("other_ranks_div");
var winImg = new Image();
winImg.src = "resource/images/winner.gif";

// ------------------- Restart and New Game button -------------------

// New game button click action
newGame[0].addEventListener("click", () => {
  window.location.reload();
});
// Re-start button click action
restart[0].addEventListener("click", () => {
  if (roundsCount != 0) {
    myGame.resetGame();
    roundsCount = 0;
    roundsContainer[0].style.display = "flex";
    gameBody[0].style.display = "none";
    winnerContainer[0].style.display = "none";
    callContainer[0].style.display = "none";
    scoreContainer[0].style.display = "none";

    // removing all previous score table
    for (let i = scoreContainer[0].children.length - 1; i > 0; i--) {
      scoreContainer[0].children[i].remove();
    }
    // removing all previous call table
    for (let i = callContainer[0].children.length - 1; i > 0; i--) {
      callContainer[0].children[i].remove();
    }
    winner[0].innerHTML = "";
    otherRanks[0].innerHTML = "";
  }
});

// ------------------- Start page -------------------

// On click of start button
// -> removes start button and displays player count Selector
startGameBtn[0].addEventListener("click", () => {
  startGameBtn[0].style.display = "none";
  startGameContainer[0].style.display = "none";
  playerCountContainer[0].style.display = "flex";
});

// ------------------- Player count Page -------------------

// Add event listner to player_count_buttons
// proceed to input player name stage
playerCountButtons.forEach((button) => {
  button.addEventListener("click", function () {
    setPlayerCount(parseInt(button.textContent));
    playerCountContainer[0].style.display = "none";
    inputNameClass[0].style.display = "flex";
    name_input.focus(); // focus on input box
  });
});
// Set players count
function setPlayerCount(num) {
  playerCount = parseInt(num);
}

// ------------------- Name Input Page -------------------

// event listner for name input
nameInputBtn[0].addEventListener("click", () => {
  addPlayerName();
});
name_input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addPlayerName();
  }
});
// takes player names and adds to the players, assures uniqueness of name
function addPlayerName() {
  // alert if name is empty
  if (name_input.value == "") {
    alert("please enter any name first");
    name_input.focus(); // focus on input box
  } else {
    // add player name to myGame
    if (!myGame.addPlayer(name_input.value)) {
      alert("please enter different name");
      name_input.value = ""; // null the name value
      name_input.focus(); // focus on input box
    } else {
      // increment player number
      let playerNumberMessage = inputNameClass[0].children[0].textContent;
      let newNum =
        parseInt(playerNumberMessage[playerNumberMessage.length - 1]) + 1;
      inputNameClass[0].children[0].textContent =
        "Enter name of player no." + newNum;

      name_input.value = ""; // null the name value
      name_input.focus(); // focus on input box
      playerCount--;

      // Proceed to rounds to play after input
      if (playerCount < 1) {
        inputNameClass[0].style.display = "none";
        // console it
        console.log(myGame.getPlayerNames());
        roundsContainer[0].style.display = "flex";
        // Saving data
        store(JSON.stringify(myGame));
      }
    }
  }
}

// ------------------- Rounds to play -------------------

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
  myGame.setRounds(roundsCount);
}

// ------------------- Main game Page -------------------

function setupGameBody() {
  cardsToDist[0].textContent = `Distribute \"${Math.floor(
    52 / myGame.getPlayerCount()
  )}\" cards to each player!`;
  buildTable();
  buildCallSelector();
  callContainer[0].style.display = "flex";
  buildScoreSelector();
}

function buildTable() {
  let table = document.createElement("table");
  table.className = "score_table";
  // build headers row
  let headerRow = table.insertRow();
  let rowType = headerRow.insertCell();
  rowType.textContent = "Names";
  rowType.className = "table_heading";
  for (let player of myGame.getPlayerNames()) {
    let playerName = headerRow.insertCell();
    playerName.textContent = player;
    playerName.className = "table_heading";
  }
  // build scores row
  let playerScores = myGame.getPlayerScores();
  for (let i = 0; i < roundsCount; i++) {
    let row = table.insertRow();
    row.insertCell().textContent = "score";
    for (let player of myGame.getPlayerNames()) {
      let playerScore = row.insertCell();
      if (i < playerScores.get(player).length) {
        playerScore.textContent = playerScores.get(player)[i];
      } else if (i == playerScores.get(player).length) {
        playerScore.textContent = myGame.getPlayerCall(player);
      } else {
        playerScore.textContent = "0";
      }
    }
  }
  // build totals row
  let playerTotals = myGame.getTotals();
  let totalRow = table.insertRow();
  rowType = totalRow.insertCell();
  rowType.textContent = "Totals";
  rowType.className = "table_totals";
  for (let player of myGame.getPlayerNames()) {
    let playerTotal = totalRow.insertCell();
    playerTotal.textContent = playerTotals.get(player);
    playerTotal.className = "table_totals";
  }

  var oldTable = document.querySelector(".score_table");

  // tableContainer[0].appendChild(table);
  tableContainer[0].replaceChild(table, oldTable);
}

function buildCallSelector() {
  // array of player names
  let players = myGame.getPlayerNames();
  // create call selector for each player
  let addPlayerHTML = "";
  for (let player of players) {
    addPlayerHTML += `<div class="player_call">
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
  addPlayerHTML += `<button class="call_confirm_btn">Confirm Calls</button>`;
  callContainer[0].innerHTML += addPlayerHTML;

  // add for event listner call count button
  let callCountButton = new Array();
  let i = 0;
  for (let player of players) {
    // build call count button array
    callCountButton.push(document.querySelectorAll(".call_count." + player));
    // Add event listner to call count button according to their index
    callCountButton[i].forEach((button) => {
      // add event listner
      button.addEventListener("click", function () {
        // extract player name from class name
        let playerName = button.classList[1];
        // make background color to light blue
        callCountButton[players.indexOf(playerName)].forEach((button) => {
          button.style.backgroundColor = "black";
        });
        // add call for player
        myGame.addCall(playerName, parseInt(button.textContent));
        // add background color to red
        button.style.backgroundColor = "#1c44ab";
      });
    });
    i++;
  }
  // call confirm button
  let callConfirm = document.getElementsByClassName("call_confirm_btn");
  callConfirm[0].addEventListener("click", function () {
    if (myGame.isPlayersReady()) {
      // fixing call selector btn to default
      fixCallSelectorUI();
      callContainer[0].style.display = "none";
      scoreContainer[0].style.display = "flex";
      buildTable();
      // Saving data
      store(JSON.stringify(myGame));
    } else {
      alert("please give call for all players");
    }
  });
}

function buildScoreSelector() {
  // array of player names
  let players = myGame.getPlayerNames();
  // create call selector for each player
  let addPlayerHTML = "";
  for (let player of players) {
    addPlayerHTML += `<div class="player_score">
    <h2>${player}:</h2>
    <div class="score_selector">
    <div class="score_selector_0to5">
    <button class="score_count ${player}">0</button>
    <button class="score_count ${player}">1</button>
    <button class="score_count ${player}">2</button>
    <button class="score_count ${player}">3</button>
    <button class="score_count ${player}">4</button>
    <button class="score_count ${player}">5</button>
    </div>
    <div class="score_selector_6to10">
    <button class="score_count ${player}">6</button>
    <button class="score_count ${player}">7</button>
    <button class="score_count ${player}">8</button>
    <button class="score_count ${player}">9</button>
    <button class="score_count ${player}">10</button>
    </div>
    </div>
    </div>`;
  }
  addPlayerHTML += `<button class="score_confirm_btn">Confirm Scores</button>`;
  scoreContainer[0].innerHTML += addPlayerHTML;

  // add for event listner call count button
  let scoreCountButton = new Array();
  let i = 0;
  for (let player of players) {
    // build call count button array
    scoreCountButton.push(document.querySelectorAll(".score_count." + player));
    // Add event listner to call count button according to their index
    scoreCountButton[i].forEach((button) => {
      // add event listner
      button.addEventListener("click", function () {
        // extract player name from class name
        let playerName = button.classList[1];
        // make background color to light blue
        scoreCountButton[players.indexOf(playerName)].forEach((button) => {
          button.style.backgroundColor = "black";
        });
        // add call for player
        myGame.setScore(playerName, parseInt(button.textContent));
        // add background color to red
        button.style.backgroundColor = "#1c44ab";
      });
    });
    i++;
  }
  // score confirm button
  let scoreConfirm = document.getElementsByClassName("score_confirm_btn");
  scoreConfirm[0].addEventListener("click", function () {
    if (myGame.calcScores()) {
      // fixing score selector btn to default
      fixScoreSelectorUI();
      scoreContainer[0].style.display = "none";
      callContainer[0].style.display = "flex";
      // myGame.calcScores();
      buildTable();
      // Saving data
      store(JSON.stringify(myGame));
      if (!myGame.isRoundsLeft()) {
        callContainer[0].style.display = "none";
        cardsToDist[0].style.display = "none";
        winnerContainer[0].style.display = "flex";
        buildWinnerBoard();
      }
    } else {
      alert("please give Score for all players");
    }
  });
}

// brings selector button color to default(lightblue)
function fixCallSelectorUI() {
  let callCount = document.querySelectorAll(".call_count");
  callCount.forEach((button) => {
    button.style.backgroundColor = "black";
  });
}
function fixScoreSelectorUI() {
  let scoreCount = document.querySelectorAll(".score_count");
  scoreCount.forEach((button) => {
    button.style.backgroundColor = "black";
  });
}

// ------------------- Winner Board Page -------------------

function buildWinnerBoard() {
  var ranks = myGame.getRanks();
  ranks = Array.from(ranks);

  winner[0].appendChild(winImg);
  winner[0].innerHTML += `<h2>${ranks[0][1]}. ${ranks[0][0]}</h2>`;

  for (let i = 1; i < ranks.length; i++) {
    otherRanks[0].innerHTML += `<h2>${ranks[i][1]}. ${ranks[i][0]}</h2>`;
  }
}

// ------------------- Session Storage -------------------

function store(data) {
  sessionStorage.setItem(key, data);
}
function fetch() {
  let data = sessionStorage.getItem(key);
  data = JSON.parse(data);
  return data;
}
