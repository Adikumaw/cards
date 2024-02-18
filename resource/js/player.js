export default class player {
  constructor(name) {
    // Name of the player
    this.name = name;
    // Scores the player gained
    this.scores = new Array();
    // current call of player
    this.call = 0;
    // total scores of the player
    this.total = 0;
  }
  // ---------------------- Getters & Setters ------------------
  setCall(call) {
    this.call = call;
  }
  getCall() {
    return this.call;
  }
  getTotal() {
    return this.total;
  }
  getScores() {
    return this.scores;
  }
  // ------------------------ Methods -----------------------
  isReady() {
    return this.call == 0 ? false : true;
  }
  // This function evaluates score by comparing the call and gained points and adds the result to the scores & total
  addScore(score) {
    if (score < this.call) {
      // Negative the call
      this.scores.push(this.call * -1);
    } else {
      // calc the score and push
      this.scores.push(this.call + (score - this.call) / 10);
    }

    // add latest value of scores to the total
    this.total += this.scores[this.scores.length - 1];

    // fix the number with one fraction value
    this.total = this.total.toFixed(1);

    // Fix total to float
    this.total = parseFloat(this.total);

    // reset call
    this.call = 0;
  }
}
