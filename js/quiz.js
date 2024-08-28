import { questions, quiz } from "./script.js";

export default class Quiz {
  constructor(category, amount, difficulty) {
    this.category = category;
    this.amount = amount;
    this.difficulty = difficulty;
    this.score = 0;
  }
  async getquestions() {
    let response = await fetch(`https://opentdb.com/api.php?amount=${this.amount}&category=${this.category}&difficulty=${this.difficulty}`);
    response = await response.json();
    return response.results;

  }

  endQuiz(score) {
    return `
      <div class="finalresult">
      <h2>${quiz.score >= questions.length / 2 ? 'Congratulations🎉' : 'Better Luck Next Time 🙃'}</h2>
        <p>Your Score is : ${quiz.score} of ${questions.length} </p>
        <button class="try">Try Again</button>
       </div>
      `
  }

}

