export default class player {
  constructor(name) {
    this.name = name;
    this.scores = new Array();
    this.call;
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
  addScore(score) {
    if (score < this.call) {
      this.scores.push(score * -1);
    } else {
      this.scores.push(call + (score - call) / 10);
    }
    total += this.scores[this.scores.length - 1];
  }
}
