import player from "./player.js";

class callBreak {
  constructor() {
    this.players = new Map();
  }
  // Add a player to the game
  addPlayer(name) {
    if (this.players.has(name)) {
      return false;
    }
    this.players.set(name, new player(name));
    return true;
  }
  // Set call for player
  addCall(name, call) {
    if (this.players.has(name)) {
      let myPlayer = this.players.get(name);
      myPlayer.setCall(call);
      return true;
    }
    return false;
  }
  // Add score of player
  addScore(name, score) {
    if (this.players.has(name)) {
      let myPlayer = this.players.get(name);
      myPlayer.addScore(score);
      return true;
    }
    return false;
  }

  // --------------------- Getters -----------------------

  // returns names of players with their scores array as map
  getPlayerScores() {
    let playerScores = new Map();
    for (let [key, value] of this.players) {
      playerScores.set(key, value.getScores());
    }
    return playerScores;
  }

  // returns names of players
  getPlayerNames() {
    let playerNames = new Array();
    for (let [key, value] of this.players) {
      playerNames.push(key);
    }
    return playerNames;
  }

  // returns ranks and player name as key
  getRanks() {
    let totals = new Map();
    let ranks = new Map();
    for (let [key, value] of this.players) {
      totals.set(key, value.getTotal());
    }
    // Make array out of map
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

  // returns total points with player name as key
  getTotals() {
    let totals = new Map();
    for (let [key, value] of this.players) {
      totals.set(key, value.getTotal());
    }
    return totals;
  }
}
