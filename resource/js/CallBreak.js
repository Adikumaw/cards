import player from "./player.js";

export default class callBreak {
  constructor() {
    // A map of player name and player Class
    this.players = new Map();
    this.rounds = 0;
    this.currentRound = 1;
  }
  resetGame() {
    for (let [name, player] of players) {
      player.resetGame();
      this.currentRound = 1;
    }
  }
  newGame() {
    this.players.clear();
    this.currentRound = 1;
  }
  // set rounds to play
  setRounds(rounds) {
    this.rounds = rounds;
  }
  // get current round
  getCurrentRound() {
    return this.currentRound;
  }
  // This function adds player( of unique name only ) and returns if added or not
  addPlayer(name) {
    if (this.players.has(name)) {
      return false;
    }
    this.players.set(name, new player(name));
    return true;
  }
  // Sets call for player and return boolean if added or not
  addCall(name, call) {
    if (this.players.has(name)) {
      let myPlayer = this.players.get(name);
      myPlayer.setCall(call);
      return true;
    }
    return false;
  }
  // sets current score
  setScore(name, score) {
    if (this.players.has(name)) {
      let myPlayer = this.players.get(name);
      myPlayer.setScore(score);
      return true;
    }
    return false;
  }

  // calc score on the basis of current call and points gained
  calcScores() {
    if (this.isPlayersScored() && this.isRoundsLeft()) {
      for (let [name, player] of this.players) {
        player.calcScore();
      }
      this.currentRound++;
      return true;
    }
    return false;
  }
  isRoundsLeft() {
    return this.currentRound <= this.rounds;
  }
  // check all players are ready(given their call)
  isPlayersReady() {
    for (let [name, player] of this.players) {
      if (!player.isReady()) {
        return false;
      }
    }
    return true;
  }
  // check all players are ready(given their scores)
  isPlayersScored() {
    for (let [name, player] of this.players) {
      if (!player.isScored()) {
        return false;
      }
    }
    return true;
  }

  // --------------------- Getters -----------------------

  // returns Map of (names of players) -> (their scores)
  getPlayerScores() {
    let playerScores = new Map();
    for (let [key, value] of this.players) {
      playerScores.set(key, value.getScores());
    }
    return playerScores;
  }

  // returns players Numbers
  getPlayerCount() {
    let playerCount = 0;
    for (let player of this.players) {
      playerCount++;
    }
    return playerCount;
  }
  // returns players Names
  getPlayerNames() {
    let playerNames = new Array();
    for (let [key, value] of this.players) {
      playerNames.push(key);
    }
    return playerNames;
  }

  // returns map of (player names) -> (their Ranks)
  getRanks() {
    // Map of (player names) -> (their total scores)
    let totals = new Map();
    // Map of (player names) -> (Ranks)
    let ranks = new Map();
    // get totals
    for (let [key, value] of this.players) {
      totals.set(key, value.getTotal());
    }
    // Make array out of totals
    let arrayOfTotals = Array.from(totals);
    // sort the array
    arrayOfTotals.sort((a, b) => b[1] - a[1]);
    // Find ranks
    let rank = 1;
    arrayOfTotals.forEach((myMap, index) => {
      if (index > 0 && myMap[1] < arrayOfTotals[index - 1][1]) {
        rank = index + 1;
      }
      ranks.set(myMap[0], rank);
    });

    return ranks;
  }

  // returns map of (player names) -> (their totals)
  getTotals() {
    let totals = new Map();
    for (let [key, value] of this.players) {
      totals.set(key, value.getTotal());
    }
    return totals;
  }
  getPlayerCall(name) {
    if (this.players.has(name)) {
      let playerCall = this.players.get(name).getCall();
      return playerCall;
    }
    return 0;
  }
  getPlayerScore(name) {
    if (this.players.has(name)) {
      let playerScore = this.players.get(name).getScore();
      return playerScore;
    }
    return 0;
  }
}
