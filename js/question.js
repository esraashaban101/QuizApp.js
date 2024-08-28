import { questions, questionsContainer, quiz } from "./script.js";
export let tryBtn;
export default class Question {
  constructor(index) {
    this.index = index
    this.question = questions[index].question;
    this.correct_answer = questions[index].correct_answer;
    this.incorrect_answers = questions[index].incorrect_answers;
    this.category = questions[index].category;

    this.allAnswers = this.shuffleAnswers()
    this.answered = false
  }

  // get random answers 
  shuffleAnswers() {
    return this.incorrect_answers.concat(this.correct_answer).sort();
  }
  // display answers
  displayquestion() {
    let questionHtml = `
      <div class="question">
       <div class="header">
                <span class="category"> ${this.category} </span>
                <span class="count"> Question ${this.index + 1} of ${questions.length} Questions </span>
            </div>
            <p class="quesText">${this.question}</p>
            <ul>
              ${this.allAnswers.map((choice) => `<li>${choice}</li>`).join("")}
            </ul>
         <span class="score"> <span class="emoji">&#128515;</span>Score: ${quiz.score}</span>
      </div>
        
      `

    questionsContainer.innerHTML = questionHtml;
    questionsContainer.style.display = 'block';
    // sellect choice
    let choices = document.querySelectorAll('ul li');
    choices.forEach((choice) => {
      choice.addEventListener('click', (e) => {
        this.checkAnswer(e)
      })
    })

  }
  checkAnswer(e) {
    if (this.answered == false) {
      if (this.correct_answer === e.target.innerHTML) {
        e.target.classList.add(
          "correct",
          "animate__animated",
          "animate__flipInY"
        )
        quiz.score++;
        document.querySelector('.score').innerHTML = ` <span class="score"> <span class="emoji">&#128515;</span>Score: ${quiz.score}</span>`
      }
      else {
        e.target.classList.add(
          "wrong",
          "animate__animated",
          "animate__shakeX"
        )
      }
      this.answered = true;
      this.animateQuestion(e.target);
    }

  }
  animateQuestion(element) {
    setTimeout(() => {
      element.closest('.question').classList.add(
        "animate__animated",
        "animate__backOutLeft"
      )
      setTimeout(() => {
        this.moveToNext()
      }, 1000)
    }, 1000)

  }
  moveToNext() {

    this.index++;
    if (this.index < questions.length) {
      let nextQuestion = new Question(this.index);
      nextQuestion.displayquestion()
    }

    else {
      questionsContainer.innerHTML = quiz.endQuiz(quiz.score);
      tryBtn = document.querySelector('.try');
      tryBtn.addEventListener('click', () => {
        location.reload(); // Reload the page to start the quiz again
        // Alternatively, you can reset the quiz state without reloading
      });

    }


  }
}