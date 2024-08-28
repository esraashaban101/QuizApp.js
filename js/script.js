
import Question, { tryBtn } from "./question.js";
import Quiz from "./quiz.js";

const baseUrl = `https://opentdb.com/api.php`
const categortmenu = document.getElementById('categoryMenu'),
    categoryDifficulty = document.getElementById('categorydifficulty'),

    numQuestions = document.getElementById('quesNum'),
    startBtn = document.getElementById('startBtn'),
    formContainer = document.querySelector('.form-container');

export let questionsContainer = document.querySelector('.questions-container');
export let quiz;
//fuction to pull  inserted values 
export let questions = [];
startBtn.addEventListener('click', async function () {
    let Category = categortmenu.value,
        amount = numQuestions.value,
        Difficulty = categoryDifficulty.value;
    if (Category != '' && amount != null && Difficulty != '') {
        quiz = new Quiz(Category, amount, Difficulty);
        questions = await quiz.getquestions();
        console.log(questions)
        //  hide form
        formContainer.style.display = 'none'
        const firstQuestion = new Question(0);
        firstQuestion.displayquestion();


    }

})

